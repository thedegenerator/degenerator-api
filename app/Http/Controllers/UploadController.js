'use strict';
const File = use('File'); // or use('AdonisFilesystem/Filesystem') if you did not install the alias
const Upload = use('App/Model/Upload');
const attributes = ['title', 'degenThresh', 'addHomepage', 'dither', 'emboss', 'sharpen', 'blur', 'implode', 'cycle', 'uploadFile'];
const Helpers = use('Helpers');
class UploadController {

  * index(request, response) {
    const uploads = yield Upload.with().fetch();

    response.jsonApi('Upload', uploads);
  }

  * upload(request, response) {
    // getting file instance
    const pic = request.file('pic', {
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg', 'gif'],
    });


    const fileName = pic.clientName();
    const imgObj = `<a href="image/${fileName}"><img src="image/${fileName}"></a>`;
    yield pic.move(Helpers.storagePath('./assets'), fileName);
    if (!pic.moved()) {
      response.badRequest(pic.errors());
      return;
    }

    response.ok(imgObj);
  }

  // * show(request, response) {
  //   const id = request.param('id');
  //   const upload = yield Upload.with().where({
  //     id,
  //   }).firstOrFail();
  //
  //   response.jsonApi('Upload', upload);
  // }
  //
  // * update(request, response) {
  //   const id = request.param('id');
  //   request.jsonApi.assertId(id);
  //
  //   const input = request.jsonApi.getAttributesSnakeCase(attributes);
  //   const foreignKeys = {};
  //
  //   const upload = yield Upload.with().where({
  //     id,
  //   }).firstOrFail();
  //   yield upload.update(Object.assign({}, input, foreignKeys));
  //
  //   response.send(upload);
  // }
  //
  // * destroy(request, response) {
  //   const id = request.param('id');
  //
  //   const upload = yield Upload.query().where({
  //     id,
  //   }).firstOrFail();
  //   yield upload.delete();
  //
  //   response.status(204).send();
  // }

}

module.exports = UploadController;
