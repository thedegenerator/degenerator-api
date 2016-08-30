const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Upload extends JsonApiView {
  get attributes() {
    return ['title', 'threshold', 'filters', 'extension', 'hits'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User');
  }
}

module.exports = Upload;
