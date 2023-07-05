const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
    bName:{
        type:String,
        unique:true,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    bImage:{
        type:String,
       
    }
})

const books = mongoose.model("booksModel", booksSchema)
module.exports = books;