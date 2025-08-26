class ResponseError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = "FAILED";
    }

    reconstruct() {
        return {
            statusCode: this.statusCode,
            status: this.status,
            message: super.message
        }
    }
}

export {
    ResponseError
}