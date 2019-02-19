var multer  = require('multer'),
	mkdirp = require('mkdirp'),
	mime = require('mime'),
	rmdir = require('rmdir');

exports.default = function(folder){
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      	var dir = './public/uploads/'  + req.user.username + '/' + folder;
      	
        mkdirp(dir, function (err) {
            if (err) console.error(err)
            else cb(null, dir);
        });
      },
      filename: function (req, file, cb) {
        var filename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        var extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
      	var file = filename + "-" + Date.now()  + extension;
        cb(null, file);
      }
    });
    return multer({ storage: storage });
}

exports.temp = function(){
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      	var dir = './public/temp';
      	
        mkdirp(dir, function (err) {
            if (err) console.error(err)
            else cb(null, dir);
        });
      },
      filename: function (req, file, cb) {
        var filename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        var extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
      	var file = filename + "-" + Date.now()  + extension;
        cb(null, file);
      }
    });
    return multer({ storage: storage });
}

exports.project = function(){
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      	var dir = './public/uploads/project/' + req.params.id + "/submission";
      	rmdir(dir, function (err, dirs, files) {
          mkdirp(dir, function (err) {
              if (err) console.error(err)
              else cb(null, dir);
          });
        });
      },
      filename: function (req, file, cb) {
        var filename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        var extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
      	var file = filename + "-" + Date.now() + extension;
        cb(null, file);
      }
    });
    return multer({ storage: storage });
}