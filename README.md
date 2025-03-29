# AdonisJS
Repo to learn AdonisJS

## Installation
```
npm install -g @adonisjs/cli
adonis --version
```

## Create a new adonisjs project
```
npx create-adonis-ts-app my-adonis-app
```
Select the project structure 
- api (for REST API servers)
- web (web app with rendered templates)
- slim (smallest possible adonisjs app)

Enter project name
Configure eslint (code analysis tool) ? may cause problems when installing it on the project initialization better install it later.
Installing dependencies

## Running the server

```
node ace serve --watch
```
On http://127.0.0.1:3333 you should have a blank page with a json response 

## Project structure
- app/
handles business logic like controllers, models and middleware
- config
Configuration files
- database
Migrations and seeds
- public
Public assets (if needed)
- start/
Application entry points
- env.ts
Environment variables
- package.json
Dependencies

## Routes
Defining routes for http request for example a route for a get request on localhost/welcome
```
Route.get('/page', asynch () => {
    return {'welcome': 'Welcome to AdonisJS!'}
})
```
## Controllers
To handle logic we use controllers instead of routes to make it cleaner
```
node ace make:controller UserController
```
```
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController {
  public async greet({ response }: HttpContextContract) {
    return response.json({ message: 'Hello from UserController!' })
  }
}
```

Then link the controller to the route
```
import Route from '@ioc:Adonis/Core/Route'
import UserController from 'App/Controllers/Http/UserController'

Route.get('/greet', new UserController().greet)
```

## Handling Query Parameters
To recover a query parameter like this localhost/greet?name=Mirak
In the UserController
```
public async greet( {request, response}: HttpContextContract) {
    const name = request.qs().name || 'Guest'
    return response.json({message: `Greetings, ${name}!`})
}
```

## Handling Route Parameters
To recover a route paramter like this localhost/greet/Mirak
In the userController
```
public asynch show( {params, response}: HttpContextContract ) {
    const name = params.name
    return response.json({message: `Greetings, ${name}!`})
}
```
then in the start/routes.ts
```
Route.get('greet/:name', new UserController().show)
```

## Hnadling request body data (POST)
We define the route in routes.ts
```
Route.post('/register', new UserController().register)
```

Then we handle the logic in the user controller
```
public async register({request, response}: HttpContextContract) {
    public {username, email}= request.body()
    return response.json({"username": `${username}`, "email": `${email}`})
}
```

## Middleware
Allows to intercept request before they reach the controller, typically ised for auth, logging, request modification, etc...

```
node ace make:middleware LogRequest
```
```{App/Middleware/LogRequest.ts}
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    console.log(`Intercepting request METHOD:${request.method()} ROUTE:${request.url()}`)
    await next()
  }
}
```
Inside start/kernel.ts we define it either globally 
```
Server.middleware.register([
  () => import('App/Middleware/LogRequest.ts'),
])
```
register contains an array of middlewares of the form () => import('middlewarePath')

Or locally to a certain route in registerName (store a key value pair of middlewares for specific routes)
```
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/LogRequest')
})
```
then in start/routes.ts (only for registred middlewares)
```
Route.post('/register', new UsersController().display).middleware('auth')
```