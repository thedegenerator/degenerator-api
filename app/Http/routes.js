'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/users', 'UserController.store');
Route.post('/token', 'SessionController.store');
Route.resource('/uploads', 'UploadController')
  .middleware('auth')
  .only('store', 'index', 'show');

const fs = require('fs');
const gm = require('gm').subClass({
  imageMagick: true,
});
const Helpers = use('Helpers');
const Upload = use('App/Model/Upload');

Route.get('/image/:url.:extension', function*(request, response) {
  const id = request.param('url');
  const upload = yield Upload.with().where({
    id,
  }).firstOrFail();

  const filepath = Helpers.storagePath(`./assets/${upload.filename}`);
  const tmpPath = Helpers.storagePath(`./assets/tmp-${upload.filename}`);

  const output = gm(filepath)
    // .lower(10*3,10*3)
    .median([7])
    // .transparent(255, 255, 255)
    // .cycle(20)
    // .wave(-1, -10)
    .emboss(2)
    .swirl(10)
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
});

Route.any('/', function*(request, response) {
  response.json({
    jsonapi: {
      version: '1.0',
    },
    data: {},
    meta: {
      uptime: process.uptime(),
    },
  });
});

Route.get('/users/current', 'UserController.current').middleware('auth');
