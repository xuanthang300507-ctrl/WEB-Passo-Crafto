const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');

// GET all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find({ isActive: true })
            .populate('members.userId', 'firstName lastName avatar specialization')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: teams });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
            .populate('members.userId', 'firstName lastName email avatar specialization bio');
        if (!team) return res.status(404).json({ success: false, error: 'Team not found' });
        res.json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CREATE new team
router.post('/', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        const savedTeam = await newTeam.save();
        res.status(201).json({ success: true, data: savedTeam });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// UPDATE team
router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTeam) return res.status(404).json({ success: false, error: 'Team not found' });
        res.json({ success: true, data: updatedTeam });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE team (soft delete)
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        if (!team) return res.status(404).json({ success: false, error: 'Team not found' });
        res.json({ success: true, message: 'Team deactivated', data: team });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ADD member to team
router.post('/:id/members', async (req, res) => {
    try {
        const { userId, role } = req.body;
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ success: false, error: 'Team not found' });
        
        team.members.push({ userId, role: role || 'Member' });
        team.totalMembers = team.members.length;
        const savedTeam = await team.save();
        
        // Update user's teamId
        await User.findByIdAndUpdate(userId, { teamId: req.params.id });
        
        res.json({ success: true, data: savedTeam });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// REMOVE member from team
router.delete('/:id/members/:userId', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ success: false, error: 'Team not found' });
        
        team.members = team.members.filter(m => m.userId.toString() !== req.params.userId);
        team.totalMembers = team.members.length;
        const savedTeam = await team.save();
        
        // Update user's teamId
        await User.findByIdAndUpdate(req.params.userId, { teamId: null });
        
        res.json({ success: true, data: savedTeam });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
