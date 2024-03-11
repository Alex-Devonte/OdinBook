const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, minLength: 2, maxLength: 30, required: true},
    lastName: {type: String, minLength: 2, maxLength: 30, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profilePicture: {type: String, default: '../placeholderAvatar.jpg'},
    bio: {type: String, default: ''},
    dateCreated: {type: Date, default: Date.now()}
});

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('url').get(function() {
    return `/users/${this._id}/profile`;
})

module.exports = mongoose.model('User', UserSchema);