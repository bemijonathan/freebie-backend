import mongoose from "mongoose";
import { User } from "../users.model";
import bcrypt from "bcrypt";
// beforeEach(() => {

// })

describe("User Model", () => {
	let connection;
	const user = {
		email: "bemijonath@gmail.com",
		password: "password",
		name: "Jonathan iene",
	};
	let userdetails;

	beforeAll(async () => {
		connection = await mongoose.connect("mongodb://localhost/testnv", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		userdetails = await User.create(user);
	});

	it("user test is created and password is hashed", async () => {
		const match = await bcrypt.compare(user.password, userdetails.password);
		expect(userdetails).toHaveProperty("id");
		expect(match).toBeTruthy();
	});

	afterAll(() => {
		connection.connection.db.dropDatabase();
		mongoose.connection.close();
	});
});
