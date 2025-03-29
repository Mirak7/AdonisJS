import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
    public async greet({request, response}: HttpContextContract) {
        const name = request.qs().name
        return response.json({message: `Greetings, ${name}`})
    }

    public async show({params, response}: HttpContextContract) {
        const name = params.name
        return response.json({message: `Greetings, ${name}`})
    }

    public async display({request, response}: HttpContextContract) {
        const {username, email} = request.body()
        return response.json({'username': `${username}`, 'email': `${email}`})
    }
}
