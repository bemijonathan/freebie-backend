import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const transporter = nodemailer.createTransport(
	smtpTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		auth: {
			user: "bemijonathan",
			pass: "atieneology",
		},
	})
);

const sendEmail = (mailOptions, callback) => {
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(chalk.blueBright(error));
			callback(false);
		} else {
			console.log("Email sent: " + info.response);
			callback(true);
		}
	});
};

export const orderMail = async (order) => {
	var mailOptions = {
		from: "bemijonathan@gmail.com",
		to: order.shippingDetails.email,
		subject: "ORDER PROCESSED",
		text: `
    	Products ${JSON.stringify(order)}
    `,
	};
	sendEmail(mailOptions, (response) => {
		console.log(response);
		return response;
	});
};
