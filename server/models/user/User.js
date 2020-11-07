const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'You have to enter an email'],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please provide a valid email address.'
        ]
    },
    password: {
        type: String,
        required: [true, 'You have to enter a password'],
        minlength: [6, 'Your password cannot be less than 6 char.'],
        select: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: 'default.jpg'
    },
    blocked: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateJwtFromUser = function() {

    const {JWT_SECRET_KEY, JWT_EXPIRES} = process.env;
    const payload = {
        id: this._id,
        name: this.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES
    });

    return token;
};

userSchema.pre('save', function(next) {
    // Parola degismezse devam et
    if(!this.isModified('password')) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) { next(err); }
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Users', userSchema);