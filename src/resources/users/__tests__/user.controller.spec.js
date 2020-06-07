import mongoose from "mongoose";
import { User } from "../users.model";
import bcrypt from "bcrypt";
// beforeEach(() => {

// })

describe("User Model", () => {
	it("user test is created and password is hashed", async () => {
		await mongoose.connect("mongodb://localhost/test-env", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const user = {
			email: "bemijonath@gmail.com",
			password: "password",
			name: "Jonathan iene",
		};

		const userdetails = await User.create(user);
		const match = await bcrypt.compare(user.password, userdetails.password);
		expect(userdetails).toHaveProperty("id");

		expect(match).toBeTruthy();
	});
});
