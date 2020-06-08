import controller from "../users.controllers";
import response from "res";

const { getOne, updateOne, getMany } = controller;

describe("Crud action on users", () => {
	// test("create user should return status 200", async () => {

		const b = 1+1
		test("1+1 should equal 2", () => {
			expect(b).toEqual(2)
		})
		// const req = {
		// 	params: {
		// 		id: 1,
		// 	},
		// };
		// difference between a mock and a spy
		// /*
		// * a mock is data spy actually looks to see if somthing is called mock a function prevents the actual function
		// * from being called
		// */
		// const getOne = jest.fn();
		//
		// const res = new response();
		//
		// const StatusSpy = jest.spyOn(res, "status");
		// const JsonSpy = jest.spyOn(res, "json");
		//
		// await getOne(req, res);
		//
		// expect(getOne).toHaveBeenCalled();
		// expect(res).toHaveBeenCalled();
	// });
});
