const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    // Thông tin team
    name: {
        type: String,
        required: [true, 'Team name is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 1000
    },
    
    // Thành viên
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['Leader', 'Member', 'Contributor'],
            default: 'Member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Logo/Avatar
    avatar: {
        type: String, // URL to team logo
        default: null
    },
    
    // Ngành vực chuyên môn
    specialization: {
        type: String,
        enum: ['Software Engineering', 'AI', 'Data Science', 'Finance', 'Mixed'],
        default: 'Mixed'
    },
    
    // Liên kết
    socialLinks: {
        website: String,
        linkedin: String,
        github: String,
        twitter: String
    },
    
    // Thống kê
    totalMembers: {
        type: Number,
        default: 0
    },
    totalAchievements: {
        type: Number,
        default: 0
    },
    
    // Trạng thái
    isActive: {
        type: Boolean,
        default: true
    },
    
    // Timestamp
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt before saving
teamSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Team', teamSchema);
