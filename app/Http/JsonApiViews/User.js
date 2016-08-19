const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'username'];
  }

  uploads() {
    return this.hasMany('App/Http/JsonApiViews/Upload', true);
  }
}

module.exports = User;
