import {Order} from './orders.model'
import {crudControllers} from '../../utils/crud'
import chalk from 'chalk'

export default {
    ...crudControllers(Order),
    createOne:async (req, res) => {
            let response;
            try {
                response = new Order({...req.body})
                let final = await response.save()
                console.log(final)
            } catch (error) {
                console.log(chalk.redBright.bold(error))
                if (error) return res.status(400).json(error)
            }
            res.status(201).send({data:response})   
    }

}