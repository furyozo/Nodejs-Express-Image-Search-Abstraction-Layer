const url = require('url')
const GoogleImages = require('google-images')
const client = new GoogleImages('015467458587091733755:qdm-f6l2ou8', 'AIzaSyA6gb9X9HV8jqh5T0wgVCGALGM6IBwrhfs')
const express = require('express')
const app = express()

const Search = require('./models/Search.js')

// google search for images specified by the :serach variable
app.get('/api/imagesearch/:search', (req, res) => {

  // get url parameters
  var url_parts = url.parse(req.url, true)
  var searchString = req.params.search
  var query = url_parts.query

  // get additional search entry variables
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ip = ip.split(",")[0]
  var date = new Date().toLocaleString()

  var searchObj = new Search({ ip: ip, term: searchString, when: date}).create()

  // google search images whith the user specified term
  client.search(searchString, {page: query.offset}).then(images => {
    res.send(images)
  })

})

// return all user serach history
app.get('/api/latest/imagesearch', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ip = ip.split(",")[0]
  Search.find({ 'ip': ip }).exec(function(err, item) {
    if (err) console.error(err)
    res.send( item )
  })
})

// every other route returns null
app.get('*', (req, res) => {
  res.send(null)
})

app.listen(3000, () => console.log("App listening at 3000"))
