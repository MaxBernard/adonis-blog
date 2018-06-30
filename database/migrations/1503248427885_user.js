'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('username', 40).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('is_admin').default(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
