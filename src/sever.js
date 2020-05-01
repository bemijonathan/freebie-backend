import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyparser, { urlencoded } from 'body-parser'
import multer from 'multer'
import ProductRoutes from './resources/products/product.routes'
import OrderRoutes from './resources/orders/orders.route'
import {signup, signin} from './utils/auth'

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: false }))
app.use(bodyparser.json())

// const upload = multer({ dest: './data/uploads/' })


// app.post('/api/products', upload.single('photo'), function (req, res, next) {
//     console.log(req.body)
//     console.log(req.file)
//     res.send({recieved:"files"})
// })

app.post('/signup', signup)
app.post('login', signin)
// app.delete('logout',logout)
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

export default app