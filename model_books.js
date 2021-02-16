const mongo = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/BooksAPI_DB',{useNewUrlParser:true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',console.error.bind(console,'MongoDb Connect Error'))


const booksSchema = mongoose.Schema({
     name:{
          type:String
     },
     author:{
          type:String
     }
},{timestamps:true})

module.exports = mongoose.model('books',booksSchema)