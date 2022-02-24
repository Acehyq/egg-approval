'use strict'


module.exports = app => {

  const mongoose = app.mongoose;
  const Types = mongoose.Types;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('egg_approval');

  const ApprovalLogSchema = new Schema({
    code: String,
    title: String,
    type: Number,
    action: Number
  });

  const ApprovalLogModel = conn.model('approval_log', ApprovalLogSchema);

  return ApprovalLogModel;
}
