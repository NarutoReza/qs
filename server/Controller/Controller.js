const User = require('../Model/User')
const Product = require('../Model/Product')

//login code
exports.loginData = async(req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    try{
        const loginData = await User.findOne(data)
        res.json('loginData')
    }
    catch(err){
        message: err
    }
}

//signup code
exports.signupData = async(req, res) => {
    const data = new User({
        username: req.body.username,
        password: req.body.password
    })
    try{
        const signupData = await data.save()
        res.json('signupData')
    }
    catch(err)
    {
        message: err
    }
}

//check for user
exports.checkUser = async(req, res) => {
    try{
        const checkUser = await User.find({username: req.body.username})
        res.json(checkUser)
    }
    catch(err)
    {
        message: err
    }
}


///add product
exports.addData = async(req, res) => {
    const data = new Product({
        title: req.body.title,
        category: req.body.category,
        sub_category: req.body.sub_category,
        price: req.body.price,
        tags: req.body.tags,
        username: req.body.username
    })
    try{
        const addData = await data.save()
        res.json(addData)
    }
    catch(err)
    {
        message: err
    }
}


//view product
exports.viewData = async(req, res) => {
    try{
        const viewData = await Product.find({username: req.body.username})
        res.json(viewData)
    }
    catch(err)
    {
        message: err
    }
}

exports.viewByIdData = async(req, res) => {
    try{
        const viewByIdData = await Product.find({_id: req.params.postId})
        res.json(viewByIdData)
    }
    catch(err)
    {
        message: err
    }
}


//update product
exports.updateData = async(req, res) => {
    try{
        const data = await Product.updateOne(
            {_id: req.params.postId},
            {
                $set: {
                    title: req.body.title,
                    category: req.body.category,
                    sub_category: req.body.sub_category,
                    price: req.body.price,
                    tags: req.body.tags,
                    username: req.body.username
                }
            }
        )
        res.json(data)
    }
    catch(err)
    {
        message: err
    }
}


//delete product
exports.deleteData= async(req, res) => {
    try{
        const data = await Product.deleteOne({_id: req.params.postId})
        res.json(data)
    }
    catch(err)
    {
        message: err
    }
}


//search product
exports.searchData = async(req, res) => {
    const data = {
        field : req.body.field,
        value : req.body.value,
        username : req.body.username
    }

    const find = {
        [data.field]: data.value,
        username: data.username
    }

    try{
        const searchData = await Product.find(find)
        res.json(searchData)
    }
    catch(err)
    {
        message: err
    }
}