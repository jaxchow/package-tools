var exec = require('exec');
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

module.exports = {
  exec: function (args, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
      exec(args, options, (stderr, stdout, code) => {
        if (code) {
          var cmd = Array.isArray(args) ? args.join(' ') : args;
          reject(new Error(cmd + ' returned non zero exit code. Stderr: ' + stderr));
        } else {
          resolve(stdout);
        }
      });
    });
  },
  execTask:function(args,options){
	  options=options || {};
	  return new Promise((resolve,reject) =>{
		 var child=exec(args,options,function(){});
		 /*
		*/
		resolve(child);
	  });
  },
  isWindows: function () {
    return process.platform === 'win32';
  },
  binsPath: function () {
    return this.isWindows() ? path.join(this.home(), 'Kitematic-bins') : path.join('/usr/local/bin');
  },
  binsEnding: function () {
    return this.isWindows() ? '.exe' : '';
  },

  escapePath: function (str) {
    return str.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  },
  home: function () {
    return process.env[this.isWindows() ? 'USERPROFILE' : 'HOME'];
  },
  supportDir: function () {
    var dirs = ['Library', 'Application\ Support', 'Kitematic'];
    var acc = this.home();
    dirs.forEach(function (d) {
      acc = path.join(acc, d);
      if (!fs.existsSync(acc)) {
        fs.mkdirSync(acc);
      }
    });
    return acc;
  },
  CommandOrCtrl: function () {
    return this.isWindows() ? 'Ctrl' : 'Command';
  },
  removeSensitiveData: function (str) {
    if (!str || str.length === 0 || typeof str !== 'string' ) {
      return str;
    }
    return str.replace(/-----BEGIN CERTIFICATE-----.*-----END CERTIFICATE-----/mg, '<redacted>')
      .replace(/-----BEGIN RSA PRIVATE KEY-----.*-----END RSA PRIVATE KEY-----/mg, '<redacted>')
      .replace(/\/Users\/.*\//mg, '/Users/<redacted>/');
  },
  packagejson: function () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'package.json'), 'utf8'));
  },
  readPackagejson: function (dirname) {
    return JSON.parse(fs.readFileSync(path.join(dirname, 'package.json'), 'utf8'));
  },
  settingsjson: function () {
    var settingsjson = {};
    try {
      settingsjson = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'settings.json'), 'utf8'));
    } catch (err) {}
    return settingsjson;
  },
  compareVersions: function (v1, v2, options) {
    var lexicographical = options && options.lexicographical,
    zeroExtend = options && options.zeroExtend,
    v1parts = v1.split('.'),
    v2parts = v2.split('.');

    function isValidPart(x) {
      return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN;
    }

    if (zeroExtend) {
      while (v1parts.length < v2parts.length) {
        v1parts.push('0');
      }
      while (v2parts.length < v1parts.length) {
        v2parts.push('0');
      }
    }

    if (!lexicographical) {
      v1parts = v1parts.map(Number);
      v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
      if (v2parts.length === i) {
        return 1;
      }
      if (v1parts[i] === v2parts[i]) {
        continue;
      }
      else if (v1parts[i] > v2parts[i]) {
        return 1;
      }
      else {
        return -1;
      }
    }

    if (v1parts.length !== v2parts.length) {
      return -1;
    }

    return 0;
  },
  randomId: function () {
    return crypto.randomBytes(32).toString('hex');
  },
  webPorts: ['80', '8000', '8080', '3000', '5000', '2368', '9200', '8983']
};
