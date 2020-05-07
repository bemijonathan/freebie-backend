import { Router } from "express";
import { authenticated } from "../../utils/auth";
import controller from './users.controllers'
const router = Router()

router.route('/')
    .get(controller.getMany)

router.route('/:id')
    .get(controller.getOne)
    .put(authenticated, controller.updateOne)
// .delete(authenticated, controller.removeOne)


export default { UserRouter: router }