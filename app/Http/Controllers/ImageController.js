const fs = require('fs');
const gm = require('gm').subClass({
  imageMagick: true,
});
const Helpers = use('Helpers');
const Upload = use('App/Model/Upload');
let views = 0;

class ImageController {
  * preview(request, response) {
    const id = request.param('url');
    const upload = yield Upload.with().where({
      id,
    }).firstOrFail();

    const filepath = Helpers.storagePath(`./assets/${upload.filename}`);
    const tmpPath = Helpers.storagePath(`./assets/tmp-${upload.filename}`);

    const output = gm(filepath)
      .resize(200, 200)
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

    const output = gm(filepath)
      // .lower(10*3,10*3)
      .median([7])
      // .transparent(0, 0, 0)
      // .cycle(20)
      // .wave(-1, -10)
      .emboss(2)
      // .implode(.1)

    .stream();
    // .write(filepath)
    output.pipe(response.response);
    const writeStream = fs.createWriteStream(tmpPath);

    output.on('end', function () {
      fs.renameSync(tmpPath, filepath);
      console.log('BLURRY');
    });

    output.pipe(writeStream);
  }
}

module.exports = ImageController;
