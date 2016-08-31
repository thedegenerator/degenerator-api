const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Comment extends JsonApiView {
  get attributes() {
    return ['text'];
  }

  upload() {
    return this.belongsTo('App/Http/JsonApiViews/Upload', {
      included: true,
      excludeRelation: 'comments'
    });
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'comments'
    });
  }

}

module.exports = Comment;
