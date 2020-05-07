import { crudControllers } from "../../utils/crud";
import { User } from "./users.model";

export default {
    ...crudControllers(User)
}




