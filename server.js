'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require("mongoose");

const app = express();
app.use(cors());

const PORT = process.env.PORT;

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

mongoose.connect('mongodb://localhost:27017/bookDB', { useNewUrlParser: true });

const bookSchema = new mongoose.Schema({
  email: String,
  listBooks: [{
    title: String,
    descriotion: String,
    status: String
  }]
});

const Book = mongoose.model('book', bookSchema);


const seedBook = () => {
  const newBook = new Book({
    email: "mnnnnn305@gmail.com",
    listBooks: [{
      title: 'aaaa',
      descriotion: 'aaaaaaaaaaaaaaaaaaaa',
      status: 'aaaaaaaaaaaaaaaaa'
    }, {
      title: 'bbbb',
      descriotion: 'bbbbbbbbbbbbbbbbbbbb',
      status: 'bbbbbbbbbbbbbbbbbbb'
    }, {
      title: 'ccccccccc',
      descriotion: 'ccccccccccccccccccccccccccccccc',
      status: 'ccccccccccccccccccccccccccc'
    }]
  })

  newBook.save();
  console.log(newBook);
}
seedBook();
app.get('/', (req, res) => {
  res.send('working well....')
});

app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    res.send(user)
  })
})

app.get('/book', (req, res) => {
Book.find({email:req.query.email},(err,book)=>{
  if(err){
    res.send(err)
  }else{
    res.send(book)
  }
})
})
app.listen(PORT, () => console.log(`listening on ${PORT}`));
