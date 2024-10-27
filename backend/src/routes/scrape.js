const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const Club = require('../models/Club');
const Player = require("../models/Player")
const Fixture = require('../models/Fixture')
const moment = require('moment');

router.get('/fetch/clubs', async (req, res) => {
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
                    existingClub.logoImg !== logoImg || existingClub.bannerImg !== bannerImg ||
                    existingClub.link !== link) {
                    await Club.updateOne(
                        { fullName },
                        { shortName, venue, logoImg, bannerImg, link }
                    );
                }
            }
        });

        res.status(200).json({ message: 'Club data scraped and saved successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the data.');
    }
});

// Route to fetch all club data
router.get('/clubs', async (req, res) => {
    try {
        const updatedClubs = await Club.find();
        res.json(updatedClubs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to fetch clubs' });
    }
});

router.get('/fixtures', async (req, res) => {
    let brower
    try {
        // First, scrape the latest fixtures from the website
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        // Navigate to the page
        await page.goto('https://www.the-aiff.com/', { waitUntil: 'networkidle0' });

        // Wait for the elements to load
        await page.waitForSelector('#fixture_scroll .item');

        // Month abbreviations mapping to numbers
        const monthMapping = {
            'Jan': '01',
            'Feb': '02',
            'Mar': '03',
            'Apr': '04',
            'May': '05',
            'Jun': '06',
            'Jul': '07',
            'Aug': '08',
            'Sep': '09',
            'Oct': '10',
            'Nov': '11',
            'Dec': '12'
        };

        // Extract the data from the page
        const fixtures = await page.evaluate(() => {
            const fixtureElements = document.querySelectorAll('#fixture_scroll .item');
            const fixtureData = [];

            fixtureElements.forEach((element) => {
                const date = element.querySelector('.match_date')?.textContent?.trim();
                const day = element.querySelector('.day')?.textContent?.trim();
                const monthText = element.querySelector('.day-month')?.textContent.trim();

                const tournamentName = element.querySelector('.tournament-name a, .tournament-name span')?.textContent?.trim();
                const venue = element.querySelector('.venue')?.textContent?.trim();

                const team1Name = element.querySelectorAll('.team-name.text-center')[0]?.textContent?.trim();
                const team2Name = element.querySelectorAll('.team-name.text-center')[1]?.textContent?.trim();

                const scoreText = element.querySelector('.score-info span')?.textContent?.trim();

                const time = scoreText?.includes(':') ? scoreText : null;
                const team1Score = scoreText?.includes('-') ? scoreText.split('-')[0]?.trim() : null;
                const team2Score = scoreText?.includes('-') ? scoreText.split('-')[1]?.trim() : null;

                const team1Logo = element.querySelector('.team-info .image img')?.src || null;
                const team2Logo = element.querySelectorAll('.team-info .image img')[1]?.src || null;

                fixtureData.push({
                    date,
                    day,
                    month: monthText,  // Storing the original month text
                    tournamentName,
                    venue,
                    time,
                    team1Name,
                    team2Name,
                    team1Score,
                    team2Score,
                    team1Logo,
                    team2Logo,
                    status: null // This will be calculated in the next step
                });
            });

            return fixtureData;
        });

        const today = moment().startOf('day'); // Get the current date without time component
        fixtures.forEach(fixture => {
            const monthYearText = fixture.month.split("\n").pop().trim();
            const cleanedMonthText = monthYearText.replace("'", "").trim();
            const [monthAbbreviation, year] = cleanedMonthText.split(" ");
            const month = monthMapping[monthAbbreviation];
            const day = fixture.date.padStart(2, '0');

            // Ensure matchDateString is in 'YYYY-MM-DD' format
            const matchDateString = `${year}-${month}-${day}`;
            const matchDate = moment(matchDateString, 'YYYY-MM-DD').startOf('day'); // Remove time for consistency

            // Date comparison logic
            if (matchDate.isAfter(today)) {
                fixture.status = 'upcoming';
                fixture.team1Score = null;
                fixture.team2Score = null;
            } else if (matchDate.isSame(today)) {
                fixture.status = 'live';
                if (!fixture.team1Score && !fixture.team2Score) {
                    fixture.status = 'upcoming';
                }
            } else {
                fixture.status = 'past';
            }
        });


        const existingFixtures = await Fixture.find({});

        for (let fixture of fixtures) {
            const existingFixture = existingFixtures.find(f =>
                f.tournamentName === fixture.tournamentName &&
                f.date === fixture.date &&
                f.team1Name === fixture.team1Name &&
                f.team2Name === fixture.team2Name
            );

            if (existingFixture) {
                const hasChanged = (
                    existingFixture.venue !== fixture.venue ||
                    existingFixture.time !== fixture.time ||
                    existingFixture.team1Score !== fixture.team1Score ||
                    existingFixture.team2Score !== fixture.team2Score ||
                    existingFixture.status !== fixture.status
                );

                if (hasChanged) {
                    await Fixture.updateOne({ _id: existingFixture._id }, fixture);
                    console.log(`Fixture updated: ${fixture.tournamentName} on ${fixture.date}`);
                }
            } else {
                await Fixture.create(fixture);
                console.log(`New fixture added: ${fixture.tournamentName} on ${fixture.date}`);
            }
        }



        const updatedFixtures = await Fixture.find();
        res.json(updatedFixtures); // Respond with the updated data
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to fetch fixtures' });
    } finally {
        // Close Puppeteer
        if (browser) await browser.close();
    }
});

// Route to scrape player data and update the database
router.get('/fetch/players', async (req, res) => {
    try {
        const clubs = await Club.find(); // Fetch all club links from the Club model
        const playerData = []; // Array to store player data from all clubs

        // Loop through all clubs
        for (const club of clubs) {
            const { link, _id: clubId } = club; // Get the club's link and ID
            const fullProfileURL = `${link}/squad`; // Create the squad URL
            console.log(`Fetching data from: ${fullProfileURL}`);

            // Wrap the scraping process in a try-catch to handle errors
            try {
                // Fetch squad data from the club's URL
                const { data } = await axios.get(fullProfileURL);
                const $ = cheerio.load(data); // Load HTML into Cheerio

                // Loop through each player in the squad
                const promises = $('.squad-item').map(async (index, element) => {
                    const playerFirstName = $(element).find('.name.first-name').text().trim();
                    const playerLastName = $(element).find('.name.last-name').text().trim();
                    const playerName = `${playerFirstName} ${playerLastName}`;
                    const playerNumber = $(element).find('.player-number').text().trim();
                    const playerImage = $(element).find('.player-thumbnail img').attr('data-src') || $(element).find('.player-thumbnail img').attr('src');
                    const profileLink = $(element).find('.card-action a').attr('href');
                    const playerPosition = $(element).closest('.squad-listing').find('h3.sub-title').text().trim();

                    // Extract player stats
                    const stats = {};
                    $(element).find('.player-stats-item').each((i, statElement) => {
                        const statTitle = $(statElement).find('.player-stats-title').text().trim();
                        const statCount = $(statElement).find('.player-stats-count').text().trim();
                        stats[statTitle] = statCount;
                    });

                    // Create a player object
                    const playerObject = {
                        firstName: playerFirstName,
                        lastName: playerLastName,
                        fullName: playerName,
                        playerNumber,
                        position: playerPosition,
                        club: clubId, // Add the club reference here
                        stats: {
                            matchesPlayed: stats['MATCHES PLAYED'] || 0,
                            saves: stats['SAVES'] || 0,
                            cleanSheets: stats['CLEAN SHEETS'] || 0,
                            tackles: stats['TACKLES'] || 0,
                            assists: stats['ASSISTS'] || 0,
                        },
                        profileLink: `https://www.indiansuperleague.com${profileLink}`,
                        imageUrl: `https://www.indiansuperleague.com${playerImage}`,
                    };

                    playerData.push(playerObject);

                    // Check if the player already exists in the database
                    const existingPlayer = await Player.findOne({ fullName: playerName, club: clubId });
                    if (!existingPlayer) {
                        await Player.create(playerObject); // Create a new player in the DB
                    } else {
                        await Player.updateOne({ fullName: playerName, club: clubId }, { $set: playerObject }); // Update existing player data
                    }
                }).get();

                // Wait for all promises (players) to resolve before continuing to the next club
                await Promise.all(promises);
            } catch (error) {
                console.error(`Failed to fetch data for club: ${fullProfileURL}, Error:`, error.message);
                continue; // Skip to the next club if there's an error with this one
            }
        }

        // Send the scraped player data as a response
        res.status(200).json({
            message: 'Players data scraped and saved successfully',
            players: playerData,
        });

    } catch (error) {
        console.error('Error occurred while scraping player data:', error);
        res.status(500).json({ message: 'Error occurred while scraping player data.' });
    }
});

// Route to get players based on the club ID
router.get('/players/:clubId', async (req, res) => {
    const { clubId } = req.params;

    try {
        const players = await Player.find({ club: clubId }); // Fetch players by club ID
        if (!players.length) {
            return res.status(404).json({ message: 'No players found for this club.' });
        }

        res.status(200).json({
            message: `Players found for club ID: ${clubId}`,
            players,
        });

    } catch (error) {
        console.error(`Error occurred while fetching players for club ID ${clubId}:`, error);
        res.status(500).json({ message: 'Error occurred while fetching players data.' });
    }
});

module.exports = router;
