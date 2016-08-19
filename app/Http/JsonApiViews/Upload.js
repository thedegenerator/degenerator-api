const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Upload extends JsonApiView {
  get attributes() {
    return ['title', 'degenThresh', 'addHomepage', 'dither', 'emboss', 'sharpen', 'blur', 'implode', 'cycle', 'uploadFile'];
  }
}

module.exports = Upload;
