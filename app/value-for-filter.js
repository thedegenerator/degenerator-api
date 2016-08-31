module.exports = function getValForFilter(type, upload) {
  switch (type) {
    case 'blur':
      return 500 / upload.threshold;
    case 'impload':
      return 1 / upload.threshold;
    case 'swirl':
      return 720 / upload.threshold;
    default:
      return 1 / upload.threshold;
  }
};
