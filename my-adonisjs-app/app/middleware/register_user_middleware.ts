import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RegisterUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(`Intercepted the request: METHOD: ${ctx.request.method()}, ROUTE: ${ctx.route?.pattern}`)

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}