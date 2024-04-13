const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, minLength: 2, maxLength: 30, required: true},
    lastName: {type: String, minLength: 2, maxLength: 30, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profilePicture: {type: String, default: process.env.DEFAULT_PICTURE_URL},
    bio: {type: String, default: ''},
    followers: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        status: {type: String, enum: ['pending', 'accepted'], default: 'pending'}
    }],
    following: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
    }],
    dateCreated: {type: Date, default: Date.now()}
});

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', UserSchema);