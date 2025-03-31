import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/register_user'
import User from '#models/user'

export default class UsersController {
    public async register({request, response}: HttpContext) {
        const payload = await request.validateUsing(registerUserValidator)
        const user = new User()

        user.username = payload.username
        user.email = payload.email
        user.password = payload.password

        await user.save()

        return response.json({message: user.$isPersisted? 'User added successfully': 'Error adding the user'})
    }
}