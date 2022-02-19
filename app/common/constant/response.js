'use strict';


const RES_BODY = {

  SUCCESS: {
    code: 0,
    msg: '成功'
  },

  ERR_AUTH_SIGN_WRONG: {
    code: 100,
    msg: '签名无效'
  },

  ERR_PARAM_ILLEGAL: {
    code: 101,
    msg: '请求数据错误'
  },

  // 服务错误, 未定义系统错误
  ERR_SERVICE_WRONG: {
    code: -1,
    msg: '其他错误'
  }
};


module.exports = {
  RES_BODY
};
