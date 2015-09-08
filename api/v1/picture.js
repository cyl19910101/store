var path = require('path');
var fs = require('fs');
var pictureDirectory = ['Documents', 'store', 'resources', 'pictures'];
var picturePath = process.env['HOME'] + path.sep + pictureDirectory.join(path.sep);
process.env['PICTURE_PATH'] = picturePath;
var multer = require('multer');
var upload = multer({dest: picturePath});

exports.reqFileParser = upload.array('photos', 5);

exports.postPicture = function (req, res, next) {
  //TODO: handle error
  var files = req.files;
  files.forEach(function (file) {
    var storeName = file.path + path.extname(file.originalname);
    var fileName = storeName.split('/').pop();
    fs.rename(file.path, storeName, function (err) {
      if (err) console.log(err);
      else
        res.send(
          {
            initialPreview: [
              "<img src='/picture/" + fileName + "' class='file-preview-image' alt='uploadedPicture' title='uploadedPicture'>"
            ],
            initialPreviewConfig: [
              {
                caption: fileName,
                url: '/api/v1/picture', // server delete action
                key: fileName
              }
            ]
          });
    });
  });
};

exports.deletePicture = function (req, res, next) {
  var deleteFileName = req.body.key;
  var realPath = picturePath + path.sep + deleteFileName;
  fs.unlink(realPath, function (err) {
    if (err) {
      //TODO
      res.send({error: "got err when delete file " + deleteFileName});
    }
    else {
      res.send({success: "success to delete " + deleteFileName})
    }
  });
};
