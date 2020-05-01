import { User } from '../resources/users/users.model';
import jwt from 'jsonwebtoken';
import config from './../config/jwt.config'

const generateToken = (user) => {
    console.log(user)
    return jwt.sign({ data: user._id }, config.secret_key, { expiresIn: '24h' });
}

const verifyToken = (token) => {
    try {
        jwt.verify(token, config.secret_key, function (err, decoded) {
            console.log(decoded)
            return decoded.id
        });
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signup = async (req, res) => {
    // this adds a neww user and returns a token
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status.send(400).json({ message: "incorrect fields" })
    }
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        console.log(user)

        const token = generateToken(user)

        return res.status(201).send({ token, user })

    } catch (error) {
        console.log(error)
        // if(error.cod)
        res.status(400).send({ error })
    }

}

export const signin = (req, res) => {
    // this checks the password and returns a token
}

export const authenticated = (req, res, next) => {
    // this middleware will run every time
    let token = req.header.token
    token = token.split('Bearer ')[1]
    let userid = verifyToken(token)
    req.user = User.findById({_id:userid}).select('email _id')
    next()
}
