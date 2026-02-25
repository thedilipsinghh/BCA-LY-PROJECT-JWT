export type SETTING_RESPONSE = {
    message: String
    result: {
        _id: String,
        sms: Boolean,
        email: Boolean,
        whatsapp: Boolean,
    }
}
export type SETTING = {
    _id: String,
    sms: Boolean,
    email: Boolean,
    whatsapp: Boolean,
}