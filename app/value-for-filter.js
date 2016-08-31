module.exports = function getValForFilter(type, upload) {
  switch (type) {
    case 'blur':
      return 500 / upload.threshold;
    case 'impload':
      return .01 / upload.threshold;
    case 'swirl':
      return 720 / upload.threshold;
    case 'median':
      return 100 / upload.threshold;
    case 'spread':
      return .01 / upload.threshold;
    case 'emboss':
      return 50 / upload.threshold;
    case 'charcoal':
      return 100 / upload.threshold;
    case 'paint':
      return .1 / upload.threshold;
    default:
      return 1 / upload.threshold;
  }
};
