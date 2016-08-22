'use strict';
const Hash = use('Hash');
const User = use('App/Model/User');
const attributes = ['email', 'password', 'username'];

class UserController {


  * store(request, response) {
    const { email, username, password } = request.jsonApi.getAttributesSnakeCase(attributes);


    const user = yield User.create({
      email,
      username,
      password: yield Hash.make(password),
    });
    response.jsonApi('User', user);
  }

  // * current(request, response) {
  //   const user = request.authUser;
  //   user.related('uploads').load();
  //
  //   response.jsonApi('User', user);
  // }

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
    yield user.update(input);

    response.send(user);
  }


}

module.exports = UserController;
