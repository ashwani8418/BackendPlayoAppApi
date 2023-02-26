const asyncHandler = require("express-async-handler");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { use } = require("../routes/contactRoutes");
//@desc Register a user
//@route GET/api/users/register
//@access public

const registerUser = asyncHandler (async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || ! email || ! password){
        res.status(400);
        throw new Error("All fields are madatory !");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered !");
    }
    // Create HashPassword
    const hashedPassword = await bycrpt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    });
    console.log(`User created Successfully ${user}`);
    if(user){
        res.status(201).json({_id : user.id, email : user.email })
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message : " Register the user"});
});


//@desc Login a user
//@route POST/api/users/login
//@access public

const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandotry !");
    }

    const user = await User.findOne({email});
    // Compare password with HashPassword
    if(user && (await bycrpt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                username: user.username,
                email : user.email,
                id : user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "10m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("credentials are invalid. Please enter correct userId/password")
    }
});


//@desc Current Info of the User
//@route GET/api/users/current
//@access Private

const currentUserInfo = asyncHandler (async (req, res) => {
    res.json(req.user);
    res.json({message : " Cuurent user information"});
});

module.exports = { registerUser, loginUser, currentUserInfo };