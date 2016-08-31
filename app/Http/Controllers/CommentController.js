'use strict';

const Comment = use('App/Model/Comment');
const attributes = ['text'];

class CommentController {

  * index(request, response) {
    const comments = yield Comment.with('upload', 'user').fetch();

    response.jsonApi('Comment', comments);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      upload_id: request.input('data.relationships.upload.data.id'),
      user_id: request.authUser.id,
    };
    const comment = yield Comment.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Comment', comment);
  }

  * show(request, response) {
    const id = request.param('id');
    const comment = yield Comment.with('upload', 'user').where({ id }).firstOrFail();

    response.jsonApi('Comment', comment);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      upload_id: request.input('data.relationships.upload.data.id'),
      user_id: request.authUser.id,
    };

    const comment = yield Comment.with('upload', 'user').where({ id }).firstOrFail();
    yield comment.update(Object.assign({}, input, foreignKeys));

    response.jsonApi('Comment', comment);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const comment = yield Comment.query().where({ id }).firstOrFail();
    yield comment.delete();

    response.status(204).send();
  }

}

module.exports = CommentController;
