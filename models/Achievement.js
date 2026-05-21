const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    // Thông tin thành tích
    title: {
        type: String,
        required: [true, 'Achievement title is required'],
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    
    // Loại thành tích
    category: {
        type: String,
        enum: ['Award', 'Competition', 'Project', 'Publication', 'Certification', 'Other'],
        default: 'Project'
    },
    
    // Liên kết user/team
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
    
    // Thành viên tham gia (nếu là team achievement)
    contributors: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: String
    }],
    
    // Hình ảnh/chứng chỉ
    badge: {
        type: String, // URL to badge/certificate image
        default: null
    },
    
    // Ngày
    achievementDate: {
        type: Date,
        required: true
    },
    
    // Thêm thông tin
    location: String,
    organization: String,
    link: String, // URL to external proof/certificate
    
    // Mức độ quan trọng
    priority: {
        type: String,
        enum: ['Gold', 'Silver', 'Bronze', 'Standard'],
        default: 'Standard'
    },
    
    // Lượt xem/like
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
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
achievementSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Achievement', achievementSchema);
