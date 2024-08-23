const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const userController = async (req, res) => {
    try {

        const { email, password, name } = req.body;
        if (!name) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Username required!"
                })
        } else if (!email) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Email required!"
                })
        } else if (!password) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Password required!"
                })
        }

        const findAlreadyUser = await userModel.findOne({ email })
        if (findAlreadyUser) {
            return res.status(500)
                .json({
                    success: false,
                    message: "User already registered!"
                })
        }
        const hashpasswordsss = await hashPassword(password)
        const regiterUser = await new userModel({ name, email, password: hashpasswordsss }).save()
        return res.status(201).
            json({
                success: true,
                message: "Register successfully!",
                regiterUser
            })
    } catch (error) {
        return res.status(500).
            json({
                success: false,
                message: error.message,
                regiterUser
            })
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)

        if (!email || !password) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Required email and password!"
                })
        }

        const findAlreadyUser = await userModel.findOne({ email })
        if (!findAlreadyUser) {
            return res.status(500)
                .json({
                    success: false,
                    message: "User not find!"
                })
        }

        console.log(findAlreadyUser.password)
        const compPass = await comparePassword(password, findAlreadyUser.password)
        console.log(compPass)
        if (!compPass) {
            return res.status(500)
                .json({
                    success: false,
                    message: "User not found!"
                })
        }


        findAlreadyUser.password = undefined
        const token = jwt.sign({ _id: findAlreadyUser._id }, process.env.JWT_SECREDT, {
            expiresIn: "7d"
        })
        res.status(200)
            .json({
                success: true,
                message: "Login successfully",
                user: findAlreadyUser,
                token
            })

    } catch (error) {
        console.log(error.message)
        return res.status(500)
            .json({
                success: false,
                message: error.message
            })
    }
}

const updateUserController = async (req,res)=>{
     try{

     }catch(error){
        return res.status(500).
        json({
            success: false,
            message: error.message,
            regiterUser
        })
     }
}

module.exports = {
    userController,
    loginController,
    updateUserController
}