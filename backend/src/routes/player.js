const express = require('express');
const Player = require('../models/Player'); // Assuming you have a Player model
const router = express.Router();

router.get('/players', async (req, res) => {
    const { clubId } = req.query; // Extract clubId from query parameters

    try {
        // Check if clubId is provided
        if (!clubId) {
            return res.status(400).json({ message: 'clubId is required' });
        }

        // Fetch players associated with the given clubId
        const players = await Player.find({ club: clubId });

        // Return the players data
        res.status(200).json({ players });
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Error fetching players' });
    }
});

module.exports = router;
