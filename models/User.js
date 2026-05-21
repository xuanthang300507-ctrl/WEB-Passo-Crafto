const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Thông tin cơ bản
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        trim: true
    },
    
    // Thông tin chuyên môn
    specialization: {
        type: String,
        enum: ['Software Engineering', 'AI', 'Data Science', 'Finance', 'Other'],
        required: true
    },
    bio: {
        type: String,
        maxlength: 500
    },
    skills: [{
        type: String,
        trim: true
    }],
    
    // Ảnh đại diện
    avatar: {
        type: String, // URL to avatar image
        default: null
    },
    
    // Liên kết social
    socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        portfolio: String
    },
    
    // Thông tin team
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
    role: {
        type: String,
        enum: ['Leader', 'Member', 'Contributor'],
        default: 'Member'
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
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);
