'use strict';


module.exports = app => {

  const { router, controller, middleware, config } = app;

  const { user } = controller;

  // const paramValidator = validate.huawei.param;
  // const signValidator = validate.huawei.sign;


  /**
   * supply接口
   */
  router.post('/user/login',
    // signValidator(config),
    user.login
  );


  /*
  router.post('/hw/api/waybill_creation',
    paramValidator('WAYBILL_CREATION'),
    signValidator(config),
    huawei.waybill.create
  );
   */
};