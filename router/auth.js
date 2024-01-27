const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world!`);
});

router.post('/register', async (req, res) => {
    const { name, phone, email, work, password, cpassword } = req.body;

    if (!name || !phone || !email || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the details!" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const user = new User({ name, phone, email, work, password, cpassword });
        // hashing done here
        await user.save();

        res.status(201).json({ message: "User Registered Successfully" });

    } catch (err) {
        console.log(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Fill all data" });
        }

        const userLogin = await User.findOne({ email: email });


        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            res.cookie("jwtToken", token, {
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Wrong mail or password" });
            }
            else {
                res.json({ msg: "User signed in successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Wrong mail or password" });
        }

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;