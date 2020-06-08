import {connect, closeConnection, dropDatabase, user, product, orders} from "dbsetup";
import mongoose from "mongoose"
import {Order} from "../orders.model"
import {Product} from "../../products/product.model"
import {User} from "../../users/users.model"


describe("test Order Model", () => {
  let connection;
  let productIds = [];
  let singleOrder;

  beforeAll(async() => {
    connection = await connect()
    const userdetails = await User.create({...user, email:"jonathan11@gmail", name:"john doe"});
    for(let i = 0; i <= 2; i ++){
      const productOne = await Product.create({...product, createdBy: userdetails.id})
      productIds.push({ product: productOne.id, qty: Math.floor(Math.random() * 10) })
    }
    singleOrder = await Order.create({ ...orders,products:[...productIds] })
  })

  test("multiple products orders and qty is created",() => {
    expect(singleOrder).toHaveProperty("totalBill")
  })

  test("paid to be false", () => {
    expect(singleOrder).toHaveProperty("paid", false)
  })


  afterAll(async () => {
    dropDatabase(connection)
    closeConnection()
  })
})
