const multer  = require('multer')
const	mkdirp = require('mkdirp')
const	mime = require('mime')
const	rmdir = require('rmdir')

exports.default = function(folder){
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      	const dir = './public/uploads/'  + req.user.username + '/' + folder;
      	
        mkdirp(dir, function (err) {
            if (err) console.error(err)
            else cb(null, dir);
        });
      },
      filename: function (req, file, cb) {
        const filename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
      	const file = filename + "-" + Date.now()  + extension;
        cb(null, file);
      }
    });
    return multer({ storage: storage });
}

exports.temp = function(){
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      	const dir = './public/temp';
      	
        mkdirp(dir, function (err) {
            if (err) console.error(err)
            else cb(null, dir);
        });
      },
      filename: function (req, file, cb) {
        const filename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
      	const file = filename + "-" + Date.now()  + extension;
        cb(null, file);
      }
    });
    return multer({ storage: storage });
}

exports.project = function(){
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      	const dir = './public/uploads/project/' + req.params.id + "/submission";
      	rmdir(dir, function (err, dirs, files) {
          mkdirp(dir, function (err) {
              if (err) console.error(err)
              else cb(null, dir);
          });
        });
      },
      filename: function (req, file, cb) {
        const filename = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
      	const file = filename + "-" + Date.now() + extension;
        cb(null, file);
      }
    });
    return multer({ storage: storage });
}