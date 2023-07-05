const loginMiddlware = require('../middleware/auth')
const router = require('express').Router()
const usercontroller = require('../controllers/createAccount')
const bookController = require('../controllers/bookController')
const { upload } = require('../middleware/image')

router.post('/createUser', usercontroller.createUserAccount)
router.post('/login', usercontroller.loginUserAccount)
router.get('/data', loginMiddlware, usercontroller.getBooksData)
router.post('/createBooks', bookController.createBooks)
router.post('/createBook',upload.single("image"), bookController.createBook)

router.put('/updateDetails', bookController.updateDetails)
router.delete('/deleteBook', bookController.deleteBook)
router.post('/sendMail', bookController.sendEmail)

module.exports = router;

