'use strict';

const Schema = use('Schema');

class CommentSchema extends Schema {

  up() {
    this.create('comments', (table) => {
      table.increments();
      table.integer('upload_id').references('uploads.id').onDelete('cascade');
      table.integer('user_id').references('users.id').onDelete('cascade');
      table.text('text');
      table.timestamps();
    });
  }

  down() {
    this.drop('comments');
  }

}

module.exports = CommentSchema;
