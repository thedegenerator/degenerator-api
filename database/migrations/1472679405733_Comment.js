'use strict';

const Schema = use('Schema');

class CommentSchema extends Schema {

  up() {
    this.create('comments', (table) => {
      table.increments();
      table.integer('upload_id').references('uploads.id');
      table.integer('user_id').references('users.id');
      table.text('text');
      table.timestamps();
    });
  }

  down() {
    this.drop('comments');
  }

}

module.exports = CommentSchema;
