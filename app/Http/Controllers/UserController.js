'use strict';

const User = use('App/Model/User');
const attributes = ['email', 'password', 'username'];

class UserController {

  * index(request, response) {
    const users = yield User.with('uploads').fetch();

    response.jsonApi('User', users);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.create(Object.assign({}, input));

    response.jsonApi('User', user);
  }

  * current(request, response) {
    const user = request.authUser;
    user.related('uploads').load();

    response.jsonApi('User', user);
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.with('uploads').where({ id }).firstOrFail();

    response.jsonApi('User', user);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const user = yield User.with('uploads').where({ id }).firstOrFail();
    yield user.update(Object.assign({}, input));

    response.send(user);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const user = yield User.query().where({ id }).firstOrFail();
    yield user.delete();

    response.status(204).send();
  }

}

module.exports = UserController;
