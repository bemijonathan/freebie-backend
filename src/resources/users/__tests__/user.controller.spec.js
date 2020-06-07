import controller from "../users.controllers";
import response from "res";

const { getOne, updateOne, getMany } = controller;

describe("Crud action on users", () => {
	test("create user should return status 200", async () => {
		const req = {
			params: {
				id: 1,
			},
		};

		const getOne = jest.fn();

		const res = new response();

		const StatusSpy = jest.spyOn(res, "status");
		const JsonSpy = jest.spyOn(res, "json");

		await getOne(req, res);

		expect(getOne).toHaveBeenCalled();
		expect(res).toHaveBeenCalled();
	});
});
