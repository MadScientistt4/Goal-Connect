const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Club = require('../models/Club');

router.get('/clubs', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.indiansuperleague.com/clubs');
        const $ = cheerio.load(data);
        const baseURL = "https://www.indiansuperleague.com/";

        $('.club-item').each(async (index, element) => {
            const shortName = $(element).find('.short-name').text().trim();
            const fullName = $(element).find('.full-name').text().trim();
            const venue = $(element).find('.club-venue').text().trim();
            const logoImg = baseURL + ($(element).find('.club-logo img').attr('data-src') || $(element).find('.club-logo img').attr('src'));
            const bannerImg = baseURL + ($(element).find('.club-head img').attr('data-src') || $(element).find('.club-head img').attr('src'));
            const link = baseURL + $(element).find('a.btn').attr('href');
            
            const existingClub = await Club.findOne({ fullName });

            if (!existingClub) {

                await Club.create({ shortName, fullName, venue, logoImg, bannerImg, link });
            } else {
                if (existingClub.shortName !== shortName || existingClub.venue !== venue || 
                    existingClub.logoImg !== logoImg || existingClub.bannerImg !== bannerImg|| 
                    existingClub.link !== link) {
                    await Club.updateOne(
                        { fullName },
                        { shortName, venue, logoImg, bannerImg, link }
                    );
                }
            }
        });

        const updatedClubs = await Club.find();
        res.json(updatedClubs);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the data.');
    }
});

// Route to fetch player data
router.get('/players', async (req, res) => {
    try {
        // Fetch all clubs with their links
        const clubs = await Club.find();  // Retrieving the clubs from MongoDB with the `link` field

        const playerData = [];

        // Iterate over each club to scrape player data from their profile pages
        for (const club of clubs) {
            const { link, fullName: clubFullName } = club;
            const fullProfileURL = `${link}/stats`;  // Use `link` from the Club model

            // Fetch the HTML content of the club's profile page
            const { data } = await axios.get(fullProfileURL);
            const $ = cheerio.load(data);
            const playerPosition = $(squadSection).find('h3.sub-title').text().trim();
            // Traverse and extract player data
            $('.squad-item').each(async (index, element) => {
                const playerFirstName = $(element).find('.name first-name').text().trim();
                const playerLastName = $(element).find('.name last-name').text().trim();
                const playerName = `${playerFirstName} ${playerLastName}`;


                // Extract the player's image URL from the <img> tag within the player-thumbnail class
                const playerImage = $(element).find('.player-thumbnail img').attr('data-src') || $(element).find('.player-thumbnail img').attr('src');

                // Collect player stats
                const stats = {};
                $(element).find('.player-stats-item').each((idx, statElement) => {
                    const statTitle = $(statElement).find('.player-stats-title').text().trim();
                    const statCount = $(statElement).find('.player-stats-count').text().trim();
                    stats[statTitle] = statCount;
                });

                // Add the player data to the array or save to database
                const playerObject = {
                    firstName: playerFirstName,
                    lastName: playerLastName,
                    fullName: playerName,
                    playerNumber: $(element).find('.player-number').text().trim(),
                    position: playerPosition,
                    club: club._id,  // Reference to the club's ObjectId
                    stats: {
                        matchesPlayed: stats['MATCHES PLAYED'] || 0,
                        tackles: stats['TACKLES'] || 0,
                        assists: stats['ASSISTS'] || 0,
                        goals: stats['GOALS'] || 0
                    },
                    profileLink: fullProfileURL,
                    imageUrl: `https://www.indiansuperleague.com${playerImage}`
                };

                // Save the player to the database (check if they already exist by full name)
                const existingPlayer = await Player.findOne({ fullName: playerName });
                if (!existingPlayer) {
                    await Player.create(playerObject);
                } else {
                    // Update if the player exists and their stats have changed
                    await Player.updateOne(
                        { fullName: playerName },
                        { $set: playerObject }
                    );
                }

                // Also collect the player data to respond with
                playerData.push(playerObject);
                res.json(playerObject);
            });
        }

        // Respond with the player data
        res.json(playerData);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the player data.');
    }
});

module.exports = router;

