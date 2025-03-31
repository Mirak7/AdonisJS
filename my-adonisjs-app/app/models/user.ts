//import { DateTime } from 'luxon'
import encryption from '@adonisjs/core/services/encryption'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  static primaryKey = 'email'

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare password: string
}