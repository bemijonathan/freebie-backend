class Response {
	status(status) {
		this.status = status;
		return this;
	}
	json() {
		return this;
	}
}

export default Response;
