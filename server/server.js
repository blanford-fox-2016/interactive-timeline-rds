var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()


var PHONEBOOK_FILES = path.join(__dirname, 'phonebooks.json')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/phonebooks', function(req, res) {
  fs.readFile(PHONEBOOK_FILES, function(err, data) {
    if(err) {
      console.error(err)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/phonebooks', function(req, res) {
  fs.readFile(PHONEBOOK_FILES, function(err, data) {
    if(err) {
      console.error(err)
    }
    var phonebooks = JSON.parse(data)
    var phonebook = {
      id: req.body.id,
      name: req.body.name,
      phone: req.body.phone
    }
    phonebooks.push(phonebook)
    fs.writeFile(PHONEBOOK_FILES, JSON.stringify(phonebooks, null, 3), function(err) {
      if(err){
        console.error(err)
      }
      res.json(phonebook)
    })
  })
})

app.listen(8000, function() {
  console.log('server is running on port 8000')
})
