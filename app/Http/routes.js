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
// Route.post('/uploads', 'UploadController.store');
Route.post('/uploads', 'UploadController.upload');
var fs = require('fs')
  , gm = require('gm').subClass({ imageMagick: true });
var Helpers = use('Helpers');

Route.get('image/:url.:extension', function * (request, response) {
  const filepath = Helpers.storagePath(`./assets/${request.param('url')}.${request.param('extension')}`);
  const tmpPath = Helpers.storagePath(`./assets/${request.param('url')}-1.${request.param('extension')}`);

  const output = gm(filepath)

// .lower(10*3,10*3)
.median([7])
.transparent(0, 255, 0)
.cycle(20)
.wave(-10, 4)
.solarize(1)
.swirl(180)
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

Route.any('/', function * (request, response) {
  response.json({
    jsonapi: {
      version: '1.0',
    },
    data: {
    },
    meta: {
      uptime: process.uptime(),
    },
  });
});

Route.get('/users/current', 'UserController.current').middleware('auth');
