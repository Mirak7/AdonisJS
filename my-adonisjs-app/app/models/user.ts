//import { DateTime } from 'luxon'
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