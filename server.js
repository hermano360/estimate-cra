var express = require('express')
var bodyParser = require('body-parser')
var sendMail = require('./api/sendMail')
var wordDoc = require('./api/wordDoc')
const path = require('path')
const MongoClient = require('mongodb').MongoClient

// Create out app

var app = express()
const PORT = process.env.PORT || 8000

// making sure traffic is through http, if not converting to http because
// openWeatherMap doesn't work with https

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url)
  } else {
    next()
  }
})

app.use(express.static(path.join(__dirname, '/build')))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.post('/generateDocument', function (req, res) {
  wordDoc.generateWord(req.body.total, req.body.quoteInformation, (response) => {
    res.send(response)
  })
})

app.get('/downloadWordDocument', function (req, res) {
  res.download(path.join(__dirname, '/api/ProBuildersEstimate.docx'), 'ProBuildersEstimate.docx')
})

app.post('/pdfEmail', (req, res, next) => {
  sendMail.sendEmail(req.body.dirPath, req.body.name, req.body.email, (message) => res.json(message))
})

app.get('/categories', (req, res) => {
  MongoClient.connect('mongodb://hermano360:f00tball@ds137090.mlab.com:37090/meadowlark', function (err, db) {
    db.collection('proCategories').find({}, { category: 1, products: 1, _id: 0 }).sort({category: 1}).toArray((err, categories) => {
      res.send(categories)

      db.close()
    })
  })
})

app.post('/categoryGroups', (req, res) => {
  MongoClient.connect('mongodb://hermano360:f00tball@ds137090.mlab.com:37090/meadowlark', function (err, db) {
    db.collection('proCategories').find({category: req.body.category}, { products: 1, _id: 0 }).toArray((err, categories) => {
      res.send(categories.map((category) => {
        return category.products
      }).sort())

      db.close()
    })
  })
})

app.get('/products', (req, res) => {
  MongoClient.connect('mongodb://hermano360:f00tball@ds137090.mlab.com:37090/meadowlark', (err, db) => {
    db.collection('proProducts').find({}, { _id: 0, updated: 0, misc: 0, materialCost: 0 }).sort({ keycode: 1 }).toArray((err, products) => {
      res.send(products)
      db.close()
    })
  })
})

app.post('/products', (req, res) => {
  MongoClient.connect('mongodb://hermano360:f00tball@ds137090.mlab.com:37090/meadowlark', (err, db) => {
    db.collection('proProducts').find({'keycode': {$in: req.body.products}}, { _id: 0 }).toArray((err, products) => {
      res.send(products)
      db.close()
    })
  })
})

app.get('/availableQuoteNumbers', (req, res) => {
  MongoClient.connect('mongodb://hermano360:f00tball@ds137090.mlab.com:37090/meadowlark', (err, db) => {
    db.collection('proQuotes').find({}, { _id: 0, quoteNumber: 1 }).sort({ quoteNumber: 1 }).toArray((err, availableQuoteNumbers) => {
      res.send(availableQuoteNumbers)
      db.close()
    })
  })
})

app.listen(PORT, () => console.log('Express server is listening on ' + PORT))
