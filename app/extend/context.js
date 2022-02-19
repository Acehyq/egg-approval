'use strict';


const EXT_LOGGER = Symbol('Context#extLogger');

const Common = require('../common');
const { RES_BODY } = Common.Constant.Response;
const { ERR_CODE } = Common.Constant.Err;
const { Type } = Common.Validate;

const nodeLogger = require('dash-logger');
const { BaseLogger } = nodeLogger;
const { extLoggerConfig } = require('../../config/dash-logger');
const _ = require('underscore');


module.exports = {

  get extLogger() {
    const curLoggerConfig = _.clone(extLoggerConfig);

    curLoggerConfig.api = this.request.path;
    curLoggerConfig.method = this.method;

    const TRACE_ID_HEADER = 'x-trace-id';
    if (this.req.headers[TRACE_ID_HEADER]) {
      extLoggerConfig.traceId = this.req.headers[TRACE_ID_HEADER];
    }

    if (!this[EXT_LOGGER]) {
      const logger = new BaseLogger(curLoggerConfig);
      this[EXT_LOGGER] = logger;
    }

    return this[EXT_LOGGER];
  },


  setErrResBody(err) {

    let errCode;
    let msg;
    const body = {};

    if (Type.isDemoError(err)) { // 自定义的DemoError类型
      this.extLogger.error(`DemoError: ${JSON.stringify(err)}`);

      errCode = err.toJSON().code;
      msg = err.toJSON().message;
    } else if (Type.isError(err)) { // nodejs原生类型
      this.extLogger.error(`Error: ${err.toString()}`);

      this.app.emit('error', err, this);

      errCode = ERR_CODE.ERR_SERVICE_WRONG;
      msg = err.message;
    }

    body.code = RES_BODY[errCode].code;
    body.msg = RES_BODY[errCode].msg;

    if (msg) {
      body.msg = msg;
    }

    this.extLogger.info(`response body: ${JSON.stringify(body)}`);
    this.body = body;
  },


  setSuccessResBody(data, msg) {

    const errCode = ERR_CODE.SUCCESS;
    const body = RES_BODY[errCode];

    if (msg !== "" && msg !== null) {
      body.msg = msg;
    }

    if (data) {
      body.data = data;
    }

    this.extLogger.info(`response body: ${JSON.stringify(body)}`);

    this.body = body;
  }
};
