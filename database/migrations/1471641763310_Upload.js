'use strict';

const Schema = use('Schema');

class UploadSchema extends Schema {

  up() {
    this.create('uploads', (table) => {
      table.increments();
      table.string('title');
      table.string('threshold');
      table.integer('user_id').references('users.id');
      table.json('filters');
      table.string('filename');
      table.string('extension');
      table.integer('hits');
      table.timestamps();
    });
  }

  down() {
    this.drop('uploads');
  }

}

module.exports = UploadSchema;
