const { Schema, model } = require('mongoose')

const schema = new Schema({
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    header: { type: String, required: true},
    body: { type: Object, required: true },
    images: [{ type: String, required: false }]
})

module.exports = model('Post', schema)
