var check, sanitize, utils, validator;

validator = require('validator/validator-min.js');

check = validator.check;

sanitize = validator.sanitize;

utils = require('../utils.js');

exports.init = function(model) {};

exports.create = function(model, dom) {
  model.on('change', 'username', function(username) {
    if (!username) {
      return;
    }
    try {
      check(username).isAlphanumeric();
      return model.set('errors.username', '');
    } catch (err) {
      return model.set('errors.username', err.message);
    }
  });
  model.on('change', 'email', function(email) {
    if (!email) {
      return;
    }
    try {
      check(email).isEmail();
      return model.set('errors.email', '');
    } catch (err) {
      return model.set('errors.email', err.message);
    }
  });
  model.on('change', 'passwordConfirmation', function(passwordConfirmation) {
    if (!passwordConfirmation) {
      return;
    }
    try {
      check(passwordConfirmation).equals(model.get('password'));
      return model.set('errors.passwordConfirmation', '');
    } catch (err) {
      return model.set('errors.passwordConfirmation', err.message);
    }
  });
  model.on('change', 'password', function(password) {
    if (!password) {
      return;
    }
    try {
      check(password).len(6);
      return model.set('errors.password', '');
    } catch (err) {
      return model.set('errors.password', 'Password must be at least 6 characters');
    }
  });
  return model.on('change', 'errors.*', function(error) {
    var canSubmit, m;
    m = model.get();
    canSubmit = !m.errors.username && !m.errors.email && !m.errors.passwordConfirmation && !m.errors.password && !!m.username && !!m.email && !!m.passwordConfirmation && !!m.password;
    return model.set('canSubmit', canSubmit);
  });
};

exports.usernameBlur = function() {
  var $q, model, rootModel;
  model = this.model;
  rootModel = model.parent().parent();
  $q = rootModel.query('auths', {
    'local.username': model.get('username'),
    $limit: 1
  });
  return $q.fetch(function(err) {
    try {
      if (err) {
        throw new Error(err);
      }
      if ($q.get()[0]) {
        throw new Error('Username already taken');
      }
    } catch (err) {
      return model.set('errors.username', err.message);
    }
  });
};

exports.emailBlur = function() {
  var $q, model, rootModel;
  model = this.model;
  rootModel = model.parent().parent();
  $q = rootModel.query('auths', {
    'local.email': model.get('email'),
    $limit: 1
  });
  return $q.fetch(function(err) {
    try {
      if (err) {
        throw new Error(err);
      }
      if ($q.get()[0]) {
        throw new Error('Email already taken');
      }
    } catch (err) {
      return model.set('errors.email', err.message);
    }
  });
};
