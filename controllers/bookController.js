const books = require("../models/BooksSchema");
const path = require("path")
const fs = require("fs")
const nodemailer = require('nodemailer')

class BookController {
  createBooks = async (req, res) => {
    const booksArray = req.body.booksArray;

    try {
      const insertBook = await books.insertMany(booksArray);
      res.send({
        status: 200,
        message: "successfully created.....",
      });
    } catch (err) {
      res.send({
        status: 400,
        message: err,
      });
    }
  };
  createBook = async (req, res) => {
    const bName = req.body.bName;
    const author = req.body.author;
    // console.log(req.file)
    const file = req.file;
    const bImage = `${req.protocol}://${req.get("host")}/uploads/${file.originalname}`
    console.log(typeof bImage)
    const dirpath = path.resolve(__dirname,"..")
    const uploadDir = path.join(dirpath, 'uploads/');
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    try {
       await books.create({
        bName:bName,
        author:author,
        bImage:bImage
      });
      res.send({
        status: 200,
        message: "successfully created.....",
      });
    } catch (err) {
      console.log(err)
      res.send({
        status: 400,
        message: err,
      });
    }
  };
  getBooks = async (req, res) => {
    try {
      const response = await books.find({});
      res.json({
        status: 200,
        data: response,
      });
    } catch (err) {
      res.json({
        status: 401,
        message: err,
      });
    }
  };
  updateDetails = async (req, res) => {
    const bookId = req.body.bookId;
    const bName = req.body.bName;
    const author = req.body.author;
    try {
      const updateAuth = await books.updateOne(
        { _id: bookId },
        { $set: { bName: bName, author: author } }
      );
      res.send({
        status: 200,
        message: "Updated Successfully",
      });
    } catch (err) {
      res.send({
        status: 401,
        message: err.message,
      });
    }
  };
  deleteBook = async (req, res) => {
    const bookId = req.body.bookId;
    try {
      const deleteData = await books.deleteOne({ _id: bookId });
      res.send({
        status: 200,
        message: deleteData,
      });
    } catch (err) {
      res.send({
        status: 401,
        message: `${err.message}`,
      });
    }
  };
  sendEmail = async(req, res) => {
  
    // Create a transporter using SMTP
 const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'kakarapathikrishna@gmail.com',
    pass: 'fosxohltztjrzohx'
  }
 });

 const mailOptions = {
  from: 'kakarapathikrishna@gmail.com',
  to: '',
  subject: 'Sending an image using Nodemailer',
  text: 'Please see the attached image.',
  attachments: [
    {
      filename: 'image.jpg', // Change the filename as per your image file
      path: '/path/to/your/image.jpg' // Replace with the actual path to your image file
    }
  ]
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred while sending email:', error);
  } else {
    console.log('Email sent successfully!', info.response);
  }
});
  }
  
}
const bookController = new BookController();
module.exports = bookController;
