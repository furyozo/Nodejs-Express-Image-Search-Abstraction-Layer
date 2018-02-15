const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/')
const db = mongoose.connection
const Schema = mongoose.Schema

/**
 * establish and check db connection
 */
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => { console.log('db connection established') })

/**
 * create Search mongoose schema
 */
const SearchSchema = mongoose.Schema({
  ip: { type: String, default: 0, required: true },
  term: {type: String, default: '', required: true},
  when: { type: String, default: '', required: true }
})

/**
 * save a new search database entry
 * @return {exception} throws an exception if there was en error inserting the serach into the database
 */
SearchSchema.methods.create = function() {
  this.save(function(err, search) {
    if (err) return console.error(err)
  })
}

module.exports = mongoose.model('Search', SearchSchema)
