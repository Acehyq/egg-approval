'use strict';


module.exports = app => {

  const {router, controller, middleware, config} = app;

  const { approval, user } = controller;

  // middleware.authorization,
  router.post('approval',
    approval.create
    // user.login
  );
}
