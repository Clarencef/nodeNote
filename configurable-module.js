module.exports = function (config) {
  return {
    log: function (msg) {
      console.log(config.logPrefix + msg);
    }
  }
};