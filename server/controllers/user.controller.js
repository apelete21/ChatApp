const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        let user = await userModel.findOne({ email })

        if (user) return res.status(400).json("User with the given email already exit!");

        if (!name || !email || !password) return res.status(400).json("All fields are required...");

        if (!validator.isEmail(email)) return res.status(400).json('Email must valid email ...');

        if (!validator.isStrongPassword(password, {
            minSymbols: 0,
            minLength: 5,
            minUppercase: 0,
            minNumbers: 1})) return res.status(400).json('Password must be strong password...');

        user = new userModel({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.save();

        let token = createToken(user._id)

        res.status(200).json({
            _id: user._id,
            name,
            email,
            token
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}


const loginUser = async (req, res) => {

    const {email, password} = req.body

    try {
        
        let user = await userModel.findOne({email})

        if(!user) res.status(400).json('Invalid email or password')

        const isValidPassword = await bcrypt.compare
    }
}


module.exports = { registerUser }