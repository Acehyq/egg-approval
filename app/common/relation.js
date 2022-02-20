'use strict'


const Types = require('mongoose').Types;

const UserInfo = {
  id: Types.ObjectId,
  name: String,
  code: String,
};

exports.GetApproverInfo = function (userCode) {
  return "20001";
}
