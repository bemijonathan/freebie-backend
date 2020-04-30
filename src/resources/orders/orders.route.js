import {Router} from 'express'
import Controller from './orders.controllers'

const route = Router()

route.route('/')
    .get(Controller.getMany)
    .post(Controller.createOne)

route.route('/:id')
    .get(Controller.getOne)
    .put(Controller.updateOne)
    .delete(Controller.removeOne)

export default route