const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originalUrl: {
    type: String, // 資料型別是字串
  },
  shortenedUrl: {
    type: String,
  },
})
module.exports = mongoose.model('Url', urlSchema)
