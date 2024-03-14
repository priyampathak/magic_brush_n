const User = require('../models/users');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');


const userController = {
    getUsers: async (req, res)=>{
        try{
            const users = await User.find();
            res.json(users);
        } catch (error){
            console.error(error);
            res.status(500).json({ message: 'Internal server error'})
        }
    }, 
    getUserById: async (req, res)=>{
        try{
            let userId = req.params.id;
            jwt.verify(userId, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
                }
    
                userId = decoded.userId;
            })
            const user = await User.findById(userId)
            if(!user){
                return res.status(404).json({ message: "User not found" })
            }
            res.json(user)
        } catch(error){
            console.error(error);
            res.status(500).json({message:'Internal server error'})
        }
    },

    createNewClientUser: async(req, res)=>{
        try{
            const{ first_name, last_name, email, password } = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const currentDate = new Date();

            const newUser = new User({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                mobile_no: "",
                mobile_verify_code: "",
                mobile_verify_status: 0,
                mobile_verify_time: "",
                email_verify_status: 0,
                email_verify_status: 0,
                active_status: 1,
                delete_status: 0, 
                remark: "No remark yet",
                user_role_id: 3,
                create_at: currentDate ,
                update_at: currentDate
            });

            const savedUser = await newUser.save();

            const token = Generatetoken( savedUser._id );
            const cookieOptions = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
                // Other options can be set here, such as 'httpOnly', 'secure', etc.
              };
            res.cookie('token', token, cookieOptions)

            res.status(201).json({ user: savedUser, token: token })
            }catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" })
        }
    },



    createNewProviderUser: async(req, res)=>{
        try{
            const{ first_name, last_name, email, service, password } = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const currentDate = new Date();

            const newUser = new User({
                first_name,
                last_name,
                email,
                service,
                password: hashedPassword,
                mobile_no: "",
                mobile_verify_code: "",
                mobile_verify_status: 0,
                mobile_verify_time: "",
                email_verify_status: 0,
                email_verify_status: 0,
                active_status: 1,
                delete_status: 0, 
                remark: "No remark yet",
                user_role_id: 2,
                create_at: currentDate ,
                update_at: currentDate
            });

            const savedUser = await newUser.save();

            const token = Generatetoken( savedUser._id );
            const cookieOptions = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
                // Other options can be set here, such as 'httpOnly', 'secure', etc.
              };
            res.cookie('token', token, cookieOptions)

            res.status(201).json({ user: savedUser, token: token })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" })
        }
    },

    loginUser: async(req, res)=>{
        try{
            const { email, password } = req.body
            const user = await User.findOne({ email });

            if(!user) {
                return res.status(404).json({ message: 'User not found'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid){
                return res.status(401).json({ message: 'Invald password'})
            }
            const cookieOptions = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
                // Other options can be set here, such as 'httpOnly', 'secure', etc.
                secure: false, // Change this to true if serving over HTTPS
                domain: 'priyam.tech', // Set the domain to '.priyam.tech' to make the cookie accessible across subdomains
                path: '/api/magic_brush', // Set the path to match the frontend's path
              };
            const token = Generatetoken(user._id);
            res.cookie('token', token, cookieOptions);
            res.status(200).json({ user, token });
        } catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" })
        }
    },


    //middleware
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }

            req.userId = decoded.userId;
            next();
        });
    }

};



function Generatetoken(userId){
    try {
        const token = jwt.sign({userId}, process.env.SECRET_KEY );
        return token;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate token");
    }
}


module.exports = userController;