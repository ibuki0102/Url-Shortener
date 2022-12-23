const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const port = 3000
const Url = require('./models/url')
const generateCode = require('./shortenURL')

app.use(express.json())

require('./config/mongoose')
require('dotenv').config()

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
// http://localhost:3000/
// https://www.udemy.com/course/react-the-complete-guide-incl-redux/
// https://www.google.com.tw/
app.post('/urlShortener', (req, res) => {
  const urls = req.body.url
  if (urls.split(' ').join('') === '') {
    return res.render('index', { invalidInput: true })
  }
  const code = generateCode()
  Url.find({ originalUrl: urls })
    .lean()
    .then((url) => {
      if (url != false) {
        return res.render('index', { shortenedUrl: url[0].shortenedUrl })
      }
      Url.create({
        originalUrl: urls,
        shortenedUrl: `http://localhost:3000/` + code,
      })
      const shortenedUrl = `http://localhost:3000/` + code
      return res.render('index', { shortenedUrl })
    })
})

app.get('/:code', (req, res) => {
  const code = req.params.code
  const shortenedUrl = `http://localhost:3000/` + code
  Url.find({ shortenedUrl: shortenedUrl })
    .lean()
    .then((url) => res.redirect(url[0].originalUrl))
})

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}.`)
})
// res.render('index', { shortenedUrl: url[0].shortenedUrl }
