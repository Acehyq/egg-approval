'use strict';


module.exports = app => {

  const {router, controller, middleware, config} = app;

  const { approval, user } = controller;
  const { auth } = middleware;

  router.put('/approval/apply',
    auth(),
    approval.create
  );

  router.get('/approval/list',
    auth(),
    approval.getApplyList
  );

  router.get('/approval/detail/:id',
    auth(),
    approval.getApprovalDetail
  );

  router.get('/approval/approve/list',
    auth(),
    approval.getApproveList
  );
}
