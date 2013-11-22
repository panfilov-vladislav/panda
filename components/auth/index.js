var config;

config = {
  ns: "derby-passport",
  filename: __filename,
  scripts: {
    register: require("./register/index.js"),
    login: require("./login/index.js"),
    changePassword: require("./changePassword/index.js")
  }
};

module.exports = function(app, options) {
  return app.createLibrary(config, options);
};
