
const generateToken = () => {

    jwt.sign({
        data: 'foobar'
    }, 'secret', { expiresIn: '1h' });

}

const verifyToken = () => {
    try {
        jwt.verify(token, 'shhhhh', function (err, decoded) {
            console.log(decoded.foo) // bar
        });
    } catch (error) {
        console.log(error)
        throw new Error(error)        
    }
}

export const signup = (req, res) => {
    // this adds a neww user and returns a token
    if(!req.body.email){
        res.status.send(401).json({message: "incorrect fields"})
    }
}

export const signin = (req, res) => {
    // this checks the password and returns a token
}

export const authorizationn = (req, res) => {
    // this middleware will run every time
}
