const mongoose = require('mongoose');

mongoose.connect('mongodb://sif:sif2010@ds243963.mlab.com:43963/sif', { useNewUrlParser: true});
mongoose.Promise = global.Promise;

const statusDB = mongoose.connection;

statusDB.on('error', console.error.bind(console, 'connection error:'));
statusDB.once('open', function() {
  console.log('Conectado ao mongoLab com sucesso!');
});


module.exports = mongoose;