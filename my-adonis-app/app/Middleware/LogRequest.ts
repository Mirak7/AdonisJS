import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    console.log(`Intercepting request METHOD:${request.method()} ROUTE:${request.url()}`)
    await next()
  }
}
