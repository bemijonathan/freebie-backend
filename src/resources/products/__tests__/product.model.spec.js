import {connect, closeConnection, dropDatabase, user, product} from "dbsetup";
import {Product} from "../product.model.js";
import {User} from "../../users/users.model.js";


describe("Prouduct Model", () => {
  let connection;
  let productdetails;

  beforeAll(async () => {
    connection = await connect()
  })

  test("product properties will be present when created", async () => {
    try {
      const userdetails = await User.create({...user, email:"jonathan@gmail", name:"john"});
      product.createdBy = userdetails._id
      productdetails =  await Product.create(product)
      expect(productdetails).toHaveProperty("name","brown bed");
      expect(productdetails).toHaveProperty("_id")
      expect(productdetails).toHaveProperty("createdBy")
      expect(productdetails).toHaveProperty(["images", 0, "img"])
      expect(productdetails).toHaveProperty("cost", 500)
      expect(productdetails).toHaveProperty("shortDescription")
    } catch (e) {
      console.log(e);
    }

  })

  afterAll(async() => {
    try {
      dropDatabase(connection)
      closeConnection();
    } catch (e) {
      console.log(e)
    }

  })
})
