import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/register_user'

export default class UsersController {
    public async register({request}: HttpContext) {
        const payload = await request.validateUsing(registerUserValidator)
        return payload
    }
}