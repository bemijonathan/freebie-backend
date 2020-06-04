import { Order } from "./orders.model";
import { crudControllers } from "../../utils/crud";
import chalk from "chalk";
import axios from "axios";
import { orderMail } from "../../utils/mailer";

export default {
    ...crudControllers(Order),
    createOne: async (req, res) => {
        let response;
        try {
            response = new Order({ ...req.body });
            let final = await response.save();
            console.log(final);
        } catch (error) {
            console.log(chalk.redBright.bold(error));
            if (error) return res.status(400).json(error);
        }
        res.status(201).send({ data: response });
    },
    async verify(req, res) {
        try {
            let options = {
                headers: {
                    Authorization: "Bearer " + process.env.PAYSTACK_SECRET,
                },
            };
            const response = await axios.get(
                "https://api.paystack.co/transaction/verify/" + req.params.id,
                options
            );
            const orderDetails = await Order.findById(req.params.id)
                .populate()
                .exec();

            console.log(orderDetails, response);
            if (
                response.data.data.status === "success" &&
                response.data.data.amount === orderDetails.totalBill * 100
            ) {
                // sendmail
                orderMail(orderDetails);
                await Order.findByIdAndUpdate(req.params.id, { paid: true });
                res.status(200).send({ data: "success" });
            } else {
                if (
                    response.data.data.amount !==
                    orderDetails.totalBill * 100
                ) {
                    res.status(400).send({ data: "different amount" });
                } else if (response.data.data.status !== "success") {
                    res.status(400).send({
                        data: "transaction has not been made",
                    });
                }
            }
        } catch (error) {
            console.log(error.response);
            res.status(400).end();
        }
    },
};
