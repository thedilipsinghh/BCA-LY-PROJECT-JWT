export type User = {
    name?: String,
    email: String,
    mobile?: String,
    password: String,
    _id?: String,
    isActive?: Boolean,
}

export type OTP = {
    username: String,
    otp?: String
}
export type RESET_PASS = {
    password: String,
    token: string,
}
export type LOGIN_RESPONSE = {
    message: String,
    result: {
        name: String,
        email: string,
        mobile: string,
    }
}