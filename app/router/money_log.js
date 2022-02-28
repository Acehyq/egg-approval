'use strict';


module.exports = app => {

  const {router, controller, middleware} = app;

  const {moneyLog} = controller;
  const {auth} = middleware;

  router.get('/money/log/list',
    auth(),
    moneyLog.list
  );
}
