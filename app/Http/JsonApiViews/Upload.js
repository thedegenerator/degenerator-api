const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Upload extends JsonApiView {
  get attributes() {
    return ['title', 'threshold', 'filters', 'extension', 'hits', 'filters'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User');
  }

  comments() {
    return this.belongsTo('App/Http/JsonApiViews/Comment');
  }
}

module.exports = Upload;
