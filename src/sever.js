import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyparser from 'body-parser'

import ProductRoutes from './resources/products/product.routes'
import OrderRoutes from './resources/orders/orders.route'

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser())

app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

export default app