const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //ID of user that made the post
    content: { type: String, maxLength: 240, required: true },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] }, //Array of user IDs that liked the post
    comments: { 
        type: [{
            author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //ID of user that made the comment
            text: { type: String, maxLength: 120, required: true }, //Text content of the comment
            createdDate: { type: Date, default: Date.now }
        }],
        default: [] 
    },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
