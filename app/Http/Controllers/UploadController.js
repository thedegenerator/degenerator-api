'use strict';

const Upload = use('App/Model/Upload');
const attributes = ['title', 'degenThresh', 'addHomepage', 'dither', 'emboss', 'sharpen', 'blur', 'implode', 'cycle', 'uploadFile'];

class UploadController {

  * index(request, response) {
    const uploads = yield Upload.with().fetch();

    response.jsonApi('Upload', uploads);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {};
    const upload = yield Upload.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Upload', upload);
  }

  * show(request, response) {
    const id = request.param('id');
    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();

    response.jsonApi('Upload', upload);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {};

    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();
    yield upload.update(Object.assign({}, input, foreignKeys));

    response.send(upload);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const upload = yield Upload.query().where({
      id,
    }).firstOrFail();
    yield upload.delete();

    response.status(204).send();
  }

}

module.exports = UploadController;
