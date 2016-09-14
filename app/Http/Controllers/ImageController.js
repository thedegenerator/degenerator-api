const fs = require('fs');
const gm = require('gm').subClass({
  imageMagick: true,
});
const Helpers = use('Helpers');
const Upload = use('App/Model/Upload');
const File = use('File');
const Env = use('Env');

const filterValue = use('App/value-for-filter');
console.log(filterValue);

class ImageController {
  * preview(request, response) {
    const id = request.param('url');
    console.log('id', id);
    console.log(id);
    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();

    const stream = File.getStream(upload.filename);

    const output = gm(stream, upload.filename)
      .resize(200)


      .stream();

    output.pipe(response.response);
  }

  * expose(request, response) {
    const id = request.param('url');
    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();

    const filepath = Helpers.storagePath(`./app/${upload.filename}`);
    const tmpPath = Helpers.storagePath(`./app/tmp-${upload.filename}`);

    const applyFilter = (image, filterType) => image[filterType](filterValue(filterType, upload));

    const stream = File.getStream(upload.filename);

    const st = gm(stream, upload.filename);

    const output = upload.filters.reduce(applyFilter, st).stream();

    output.pipe(response.response);

    if (Env.get('FILE_DRIVER') !== 's3') {
      const writeStream = fs.createWriteStream(tmpPath);

      output.on('end',  () => {
        fs.renameSync(tmpPath, filepath);
      });

      output.pipe(writeStream);
    } else {
      File.putStream(upload.filename, output);
    }

    upload.hits++;
    yield upload.save();
  }
}

module.exports = ImageController;
