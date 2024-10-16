const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Club = require('../models/Club');

router.get('/clubs', async (req, res) => {
    try {
        // Fetch the HTML content from the website
        const { data } = await axios.get('https://www.indiansuperleague.com/clubs');
        const $ = cheerio.load(data);
        const baseURL = "https://www.indiansuperleague.com/";

        // Traverse and extract the club data
        $('.club-item').each(async (index, element) => {
            const shortName = $(element).find('.short-name').text().trim();
            const fullName = $(element).find('.full-name').text().trim();
            const venue = $(element).find('.club-venue').text().trim();
            const logoImg = baseURL + ($(element).find('.club-logo img').attr('data-src') || $(element).find('.club-logo img').attr('src'));
            const bannerImg = baseURL + ($(element).find('.club-head img').attr('data-src') || $(element).find('.club-head img').attr('src'));

            // Check if the club already exists in the database
            const existingClub = await Club.findOne({ fullName });

            if (!existingClub) {
                // Insert new club if it doesn't exist
                await Club.create({ shortName, fullName, venue, logoImg, bannerImg });
            } else {
                // Update existing club if any data has changed
                if (existingClub.shortName !== shortName || existingClub.venue !== venue || 
                    existingClub.logoImg !== logoImg || existingClub.bannerImg !== bannerImg) {
                    await Club.updateOne(
                        { fullName },
                        { shortName, venue, logoImg, bannerImg }
                    );
                }
            }
        });

        // Fetch updated list of clubs
        const updatedClubs = await Club.find();
        res.json(updatedClubs);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the data.');
    }
});

module.exports = router;
