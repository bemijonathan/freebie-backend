import mongoose from "mongoose";


export const connect = async() => await mongoose.connect("mongodb://localhost/tesnv", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


export const dropDatabase = async (connection) =>  {
  await connection.connection.db.dropDatabase();
}


export const closeConnection  = () => mongoose.connection.close

export const user = {
  email: "bemijonath@gmail.com",
  password: "password",
  name: "Jonathan iene",
};

export const product = {
  name:"brown bed",
  createdBy:undefined,
  images:[
    {
      img:"https://thisistheimageurl.png",
      public_id:"imageurl"
    }
  ],
  cost:500,
  shortDescription:"this is a fine bed spread"
}


export const orders = {
  products: [],
  shippingDetails: {
    fullName: "jathan",
    location: "Lagos",
    email: "john@.com",
    phoneNumber: "+3430903455366",
    city: "Ikeja"
  },
  shippingLocation: "Abuja"
}
