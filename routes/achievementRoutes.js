const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const Team = require('../models/Team');

// GET all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find()
            .populate('userId', 'firstName lastName avatar')
            .populate('teamId', 'name avatar')
            .populate('contributors.userId', 'firstName lastName')
            .sort({ achievementDate: -1 });
        res.json({ success: true, data: achievements });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single achievement by ID
router.get('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id)
            .populate('userId', 'firstName lastName email avatar')
            .populate('teamId', 'name avatar members')
            .populate('contributors.userId', 'firstName lastName');
        if (!achievement) return res.status(404).json({ success: false, error: 'Achievement not found' });
        res.json({ success: true, data: achievement });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CREATE new achievement
router.post('/', async (req, res) => {
    try {
        const newAchievement = new Achievement(req.body);
        const savedAchievement = await newAchievement.save();
        
        // Update team's totalAchievements if it's a team achievement
        if (savedAchievement.teamId) {
            await Team.findByIdAndUpdate(
                savedAchievement.teamId,
                { $inc: { totalAchievements: 1 } }
            );
        }
        
        res.status(201).json({ success: true, data: savedAchievement });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// UPDATE achievement
router.put('/:id', async (req, res) => {
    try {
        const updatedAchievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAchievement) return res.status(404).json({ success: false, error: 'Achievement not found' });
        res.json({ success: true, data: updatedAchievement });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE achievement
router.delete('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) return res.status(404).json({ success: false, error: 'Achievement not found' });
        
        // Decrease team's totalAchievements
        if (achievement.teamId) {
            await Team.findByIdAndUpdate(
                achievement.teamId,
                { $inc: { totalAchievements: -1 } }
            );
        }
        
        res.json({ success: true, message: 'Achievement deleted', data: achievement });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET achievements by user
router.get('/user/:userId', async (req, res) => {
    try {
        const achievements = await Achievement.find({ userId: req.params.userId })
            .sort({ achievementDate: -1 });
        res.json({ success: true, data: achievements });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET achievements by team
router.get('/team/:teamId', async (req, res) => {
    try {
        const achievements = await Achievement.find({ teamId: req.params.teamId })
            .populate('contributors.userId', 'firstName lastName')
            .sort({ achievementDate: -1 });
        res.json({ success: true, data: achievements });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET achievements by category
router.get('/category/:category', async (req, res) => {
    try {
        const achievements = await Achievement.find({ category: req.params.category })
            .populate('userId', 'firstName lastName')
            .populate('teamId', 'name')
            .sort({ achievementDate: -1 });
        res.json({ success: true, data: achievements });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// LIKE achievement
router.post('/:id/like', async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.json({ success: true, data: achievement });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
