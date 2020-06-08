import mongoose from "mongoose";
import { User } from "../users.model";
import {connect, closeConnection, dropDatabase, user} from "dbsetup"
import bcrypt from "bcrypt";


describe("User Model", () => {
	let connection;
	let userdetails;

	beforeAll(async () => {
		connection = await connect()
		userdetails = await User.create(user);
	});

	it("user test is created and password is hashed", async () => {
		const match = await bcrypt.compare(user.password, userdetails.password);
		expect(userdetails).toHaveProperty("id");
		expect(match).toBeTruthy();
	});

	afterAll(async () => {
		dropDatabase(connection);
		closeConnection()
	});
});
