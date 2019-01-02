const express = require('express');
const multer  =   require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
      })
    }
  })
const upload = multer({ storage: storage });

router.get('/files', function (req, res) {
    const images = fs.readdirSync('public/upload')
    var sorted = []
    for (let item of images){
        if(item.split('.').pop() === 'png'
        || item.split('.').pop() === 'jpg'
        || item.split('.').pop() === 'jpeg'
        || item.split('.').pop() === 'svg'){
            var abc = {
                  "image" : "/upload/"+item,
                  "folder" : '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
  })

  router.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
      res.redirect('back')
  });

  router.post('/delete_file', function(req, res, next){
  	var url_del = 'public' + req.body.url_del
    console.log(url_del)
  	if(fs.existsSync(url_del)){
  		fs.unlinkSync(url_del)
  	}
  	res.redirect('back')
  });

  module.exports = app => app.use('/', router);