'use strict';
const File = use('File'); // or use('AdonisFilesystem/Filesystem') if you did not install the alias
const Upload = use('App/Model/Upload');

const Helpers = use('Helpers');
var uuid = require('node-uuid');
// const attributes = ['title', 'theshold', 'user_id', 'filter', 'filename'];
class UploadController {

  *index(request, response) {
    const uploads = yield Upload.with().fetch();

    response.jsonApi('Upload', uploads);
  }

  * upload(request, response) {
    // const { title, theshold, user_id, filter, filename } = request.jsonApi.getAttributesSnakeCase(attributes);
    // const upload = yield Upload.create({
    //   title,
    //   theshold,
    //   user_id,
    //   filter,
    //   filename,
    // });
    // response.jsonApi('Upload', upload);

    // getting file instance
    const pic = request.file('uploadFile', {
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg', 'gif'],
      filters: ['blur:10', 'blur:200'],
    });


    const fileName = `${uuid.v1()}.${pic.extension()}`;
    response.send(pic.toJSON());


    yield pic.move(Helpers.storagePath('./assets'), fileName);
    if (!pic.moved()) {
      response.badRequest(pic.errors());
      return;
    }
  }


  // * store(request, response) {
  //   // var filters=[ blur:10 ];
  //   const { title, threshold } = request.all();
  //
  //
  //   // yield request.authUser.posts().create({ title, post, user_id });
  //
  //   // yield Post.create({ title, post, user_id });
  //   yield request.authUser.posts()
  //   .create({ title, threshold });
  //
  //   yield request.with({ success: 'New post is now listed!' }).flash();
  //
  //   response.redirect('/posts');
  // }


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
