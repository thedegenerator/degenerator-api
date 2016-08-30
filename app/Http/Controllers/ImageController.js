const fs = require('fs');
const gm = require('gm').subClass({
  imageMagick: true,
});
const Helpers = use('Helpers');
const Upload = use('App/Model/Upload');


class ImageController {
  * preview(request, response) {
    const id = request.param('url');
    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();

    const filepath = Helpers.storagePath(`./assets/${upload.filename}`);

    const output = gm(filepath)
      .resize(200)
      .colors(2)
      .contrast(-11)
      .stream();

    output.pipe(response.response);
  }

  * expose(request, response) {
    const id = request.param('url');
    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();

    const filepath = Helpers.storagePath(`./assets/${upload.filename}`);
    const tmpPath = Helpers.storagePath(`./assets/tmp-${upload.filename}`);

    const applyFilter = (image, filterType) => image[filterType](10);

    const output = upload.filters.reduce(applyFilter, gm(filepath)).stream();

    output.pipe(response.response);
    const writeStream = fs.createWriteStream(tmpPath);

    output.on('end',  () => {
      fs.renameSync(tmpPath, filepath);
    });

    output.pipe(writeStream);
  }
}

module.exports = ImageController;
