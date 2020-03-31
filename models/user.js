const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true, minlength: 3 },
    login: { type: String, required: true, minlength: 4, unique: true },
    password: { type: String, required: true, minlength: 6 },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    token: {
        type: String, default: () => {
            return Math.random().toString(36).substring(2, 15)
        }
    }
})

module.exports = model('User', schema);