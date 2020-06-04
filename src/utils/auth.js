import { User } from "../resources/users/users.model";
import jwt from "jsonwebtoken";
import config_key from "../config/jwt.config";
import chalk from "chalk";

// console.log(config.secret_key);

const generateToken = (user) => {
    console.log(config_key, "config key");
    return jwt.sign({ id: user._id }, "config_key", { expiresIn: "24h" });
};

const verifyToken = async (token) => {
    let id;
    try {
        const decoded = await jwt.verify(token, "config_key")
        console.log(decoded);
        id = decoded.id;
        return id
    } catch (err) {
        if (err) throw new Error(err)
    }
    return id.toString();
};

export const signup = async (req, res) => {
    // this adds a neww user and returns a token
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status.send(400).json({ message: "incorrect fields" });
    }
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        });

        const token = generateToken(user);

        return res.status(201).send({ data: token });
    } catch (error) {
        console.log(error);
        // if(error.cod)
        res.status(400).send({ error: "email already exists" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    let error = { data: "incorrect username or password" };

    const user = await User.findOne({ email: email });
    console.log(user);
    // this checks the password and returns a token
    try {
        if (user) {
            let compared = await user.comparePassword(password, user);
            if (compared) {
                let token = generateToken(user);
                res.status(200).send({ data: token });
            } else return res.status(400).send(error);
        } else {
            res.status(400).send(error);
        }
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
};

export const authenticated = async (req, res, next) => {
    // this middleware will run every time
    let userid;
    try {
        let token = req.headers.token;
        token = token.split("Bearer ")[1].toString();
        // console.log(verifyToken(token))
        userid = await verifyToken(token);
        req.user = await User.findById(userid).select("email _id");
    } catch (error) {
        console.log(chalk.yellow.bold(error));
        if (error) {
            return res.status(401).end();
        }
    }
    // res.send({ message: "ok" })

    next();
};
