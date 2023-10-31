const express = require('express')
const router = express.Router()

const { loginData, signupData, addData, viewData, updateData, deleteData, searchData, checkUser, viewByIdData } = require('../Controller/Controller')

//login & signup
router.post('/login', loginData)
router.post('/signup', signupData)

//check user
router.post('/check', checkUser)

//product
router.get('/view', viewData)
router.post('/add', addData)
router.patch('/update/:postId', updateData)
router.delete('/delete/:postId', deleteData)
router.post('/search', searchData)
router.get('/view/:postId', viewByIdData)

module.exports = router