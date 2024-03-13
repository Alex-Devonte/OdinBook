const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register_user = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .bail()
        .isLength({min: 2, max: 30})
        .withMessage('First name must be between 2 & 30 characters')
        .escape(),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .bail()
        .isLength({min: 2, max: 30}).withMessage('Last name must be between 2 & 30 characters')
        .escape(),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email addresses must be in the following format: `name@domain.com`')
        .custom(async (email) => {
            const userExists = await User.findOne({email})
                .collation({locale: 'en', strength: 2})
                .exec();

            if (userExists) {
                throw new Error('A user with that email already exists');
            }

        }).escape(),
    
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .bail()
        .isStrongPassword({
            minLength: 5,
            minLowercase: 0,
            minUppercase: 1,
            minNumbers: 0,
            minSymbols: 0,
            returnScore: false
        })
        .withMessage('Passwords must be a minimum of 5 character and contain at least 1 uppercase letter')
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        //If there are errors send them as response
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        //Create new user and save to db
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        });

        const token = generateToken(user._id);
        res.cookie('jwt', token , {
            httpOnly: true,
            // other cookie options like domain, path, secure, etc.
        });

        //Send user and token
        res.json({user});
    })
];

exports.login_user = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    //Check for user email
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2});

    //Check if submitted password matches hashed password
    if (user && (await bcrypt.compare(password, user.password))) {

        const token = generateToken(user._id);
        res.cookie('jwt', token , {
            httpOnly: true,
            // other cookie options like domain, path, secure, etc.
        });

        //Send user and token
        res.json({user});
    } else {
        return res.status(401).json('Incorrect email or password');
    }
});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}
