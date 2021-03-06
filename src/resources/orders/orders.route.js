import { Router } from "express";
import Controller from "./orders.controllers";

const route = Router();

route.route("/").get(Controller.getMany).post(Controller.createOne);

route
	.route("/:id")
	.get(Controller.getOne)
	.put(Controller.updateOne)
	.delete(Controller.removeOne);

route.route("/verify/:id").get(Controller.verify);

export default route;
