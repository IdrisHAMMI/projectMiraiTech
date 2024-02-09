class CustomError extends Error {
    public status: number;

    constructor(status: number, message?: string) {
        super(message); // Pass the message to the Error constructor
        this.status = status; // Set the status property
    }
}

export const createError = (status: number, message: string): CustomError => {
    return new CustomError(status, message);
};
