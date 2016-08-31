'use strict';
const File = use('File'); // or use('AdonisFilesystem/Filesystem') if you did not install the alias
const Upload = use('App/Model/Upload');

const Helpers = use('Helpers');
var uuid = require('node-uuid');
const attributes = [
  'title',
  'threshold',
  'extension',
  'filters',
  'hits',
];

class UploadController {

  * index(request, response) {
    const uploads = yield Upload.with('user', 'comments')
    .orderBy('id', 'desc')
    .fetch();

    response.jsonApi('Upload', uploads);
  }

  * store(request, response) {
    // getting file instance
    const pic = request.file('uploadFile', {
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg', 'gif'],
    });


    const filename = `${uuid.v1()}.${pic.extension()}`;

    const attributes = {
      filename,
      user_id: request.authUser.id,
      title: request.input('title'),
      threshold: request.input('threshold'),
      extension: pic.extension(),
      filters: JSON.stringify(request.input('filters').split(',')),
    };


    const [upload] = yield [Upload.create(attributes), pic.move(Helpers.storagePath('./assets'), filename)];
    response.jsonApi('Upload', upload);
  }


  * show(request, response) {
    const id = request.param('id');
    const upload = yield Upload.with('user', 'comments').where({
      id,
    }).firstOrFail();

    response.jsonApi('Upload', upload);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);

    const upload = yield Upload.findOrFail(id);
    upload.fill(input);
    yield upload.save();

    response.jsonApi('Upload', upload);
  }

  * destroy(request, response) {
    const id = request.param('id');

    try {
      const upload = yield Upload.findOrFail(id);
      yield upload.delete();
    } catch (e) {
    } finally {
      response.status(204).send();
    }
  }
}

module.exports = UploadController;
