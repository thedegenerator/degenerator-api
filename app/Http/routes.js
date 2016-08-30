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
  .only('index', 'show', 'update', 'destroy');

Route.resource('/uploads', 'UploadController')
  .only('store', 'destroy')
  .middleware('auth');

Route.get('/image/:url-expose.:extension', 'ImageController.expose');
Route.get('/image/:url.:extension', 'ImageController.preview');

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
