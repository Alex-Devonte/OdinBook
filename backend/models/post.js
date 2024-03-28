const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //ID of user that made the post
    content: { type: String, maxLength: 240, required: true },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] }, //Array of user IDs that liked the post
    comments: { type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], default: [] }, //Array of user IDs that commented on the post
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
