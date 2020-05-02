import { Router } from 'express'
import Controller from './product.controller'
import { authenticated } from '../../utils/auth'

const router = Router()

router.route('/')
    .get(authenticated, Controller.getMany)
    .post(Controller.createOne)

router.route('/:id')
    .get(Controller.getOne)
    .put(Controller.updateOne)
    .delete(Controller.removeOne)

export default router