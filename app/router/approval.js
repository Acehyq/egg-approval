'use strict';


module.exports = app => {

  const {router, controller, middleware, config} = app;

  const { approval, user } = controller;
  const { auth } = middleware;

  // middleware.authorization,
  router.put('/approval',
    auth(),
    approval.create
    // user.login
  );
}
