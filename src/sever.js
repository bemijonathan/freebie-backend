import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyparser, { urlencoded } from 'body-parser'
import ProductRoutes from './resources/products/product.routes'
import OrderRoutes from './resources/orders/orders.route'
import { signup, signin, authenticated } from './utils/auth'
import ProductUpload from './upload'
import { multerUploads } from './config/multer.config'
import { cloudinaryConfig } from './config/clodinary.config'
import { User } from './resources/users/users.model'
import chalk from 'chalk'
import { Product } from './resources/products/product.model'
import usersRoutes from './resources/users/users.routes'
import { environment } from './config/environment'
import dotenv from 'dotenv'

dotenv.config()

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

export const db = async () => {
  if (process.env.ENVIRONMENT === "DEVELOPEMENT") {
       await  mongoose.connect('mongodb://localhost/test', options);
  } else {
      try {
          await mongoose.connect('mongodb+srv://jona:jona@freebie-pckhz.mongodb.net/test', options)
      } catch (error) {
          console.log(chalk.bgGreenBright.bold(error))
      }
  }
}

db()

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cloudinaryConfig)

// const upload = multer({ dest: './data/uploads/' })

app.get('/hello', (req, res) => {
    User.remove({}, () => {
        console.log("done")
        res.send({ messafe: "done" })
    })
})

app.post('/api/products', [authenticated, multerUploads, ProductUpload], async (req, res) => {
    console.log(chalk.bgMagentaBright(req.images))
    try {
        let response = await Product.create({
            ...req.body, images: req.images, createdBy: req.user.id
        })

        console.log(response)
        const user = await User.findByIdAndUpdate(req.user.id, { $push: { products: response.id } }, { new: true })
        res.status(201).send({ data: response })
    } catch (error) {
        console.log(chalk.redBright.bold(error))
        if (error) return res.status(400).json(error)
    }
})

app.post('/signup', signup)
app.post('/login', signin)
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)
app.use('/api/users', usersRoutes.UserRouter)




export default app


















// import { uploader, cloudinaryConfig } from './config/cloudinaryConfig'
// import { multerUploads, dataUri } from './middlewares/multerUpload';
