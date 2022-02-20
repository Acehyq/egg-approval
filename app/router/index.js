'use strict';


module.exports = app => {
  require('./user')(app);
  require('./approval')(app);
};
