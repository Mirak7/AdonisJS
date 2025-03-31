import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
    vine.object({
        username: vine.string().trim().alphaNumeric(),
        password: vine.string().alphaNumeric().minLength(6),
        email: vine.string().email()
    })
)