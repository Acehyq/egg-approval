'use strict'

module.exports = app => {

  const mongoose = app.mongoose;
  const Types = mongoose.Types;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('egg_approval');

  const UserInfo = {
    id: Types.ObjectId,
    name: String,
    code: String,
  };

  const ApprovalSchema = new Schema({
    code: String,
    "title": String,
    "type": Number,
    "content": String,
    "money": Number,
    useOfMoney: String,
    applicant: UserInfo,
    approver: UserInfo,
    comment: String,
    status: Number,
    created_time: Date,
    updated_time: Date
  });

  const ApprovalModel = conn.model('approval', ApprovalSchema);

  return ApprovalModel;
}
