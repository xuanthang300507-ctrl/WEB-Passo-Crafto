const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isActive: true })
            .populate('teamId', 'name avatar')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('teamId', 'name avatar members');
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, data: savedUser });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// UPDATE user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ success: false, error: 'User not found' });
        res.json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE user (soft delete)
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        res.json({ success: true, message: 'User deactivated', data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET users by specialization
router.get('/specialization/:specialization', async (req, res) => {
    try {
        const users = await User.find({
            specialization: req.params.specialization,
            isActive: true
        }).populate('teamId', 'name avatar');
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET users by team
router.get('/team/:teamId', async (req, res) => {
    try {
        const users = await User.find({
            teamId: req.params.teamId,
            isActive: true
        });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
