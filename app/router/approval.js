'use strict';


module.exports = app => {

  const {router, controller, middleware } = app;

  const { approval } = controller;
  const { auth } = middleware;

  router.put('/approval/apply',
    auth(),
    approval.create
  );

  router.post(
    '/approval/:id',
    auth(),
    approval.approve
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
