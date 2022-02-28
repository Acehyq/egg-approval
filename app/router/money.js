'use strict';


module.exports = app => {

  const { router, controller, middleware } = app;

  const { money } = controller;
  const {auth} = middleware;

  router.get('/money/sum',
    auth(),
    money.sum
  );

  router.put('/money',
    auth(),
    money.create
  )
}
