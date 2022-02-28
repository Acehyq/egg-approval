'use strict';


module.exports = app => {
  require('./user')(app);
  require('./approval')(app);
  require('./money')(app);
  require('./money_log')(app);
};
