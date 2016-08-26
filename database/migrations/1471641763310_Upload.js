'use strict';

const Schema = use('Schema');

class UploadSchema extends Schema {

  up() {
    this.create('uploads', (table) => {
      table.increments();
      table.string('title');
      table.string('degenThresh');
      table.boolean('dither');
      table.boolean('emboss');
      table.boolean('sharpen');
      table.boolean('blur');
      table.boolean('implode');
      table.boolean('cycle');
      table.timestamps();
    });
  }

  down() {
    this.drop('uploads');
  }

}

module.exports = UploadSchema;
