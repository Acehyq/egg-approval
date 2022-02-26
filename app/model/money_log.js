module.exports = app => {

  const mongoose = app.mongoose;
  const Types = mongoose.Types;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('egg_approval');

  const MoneyLogSchema = new Schema({
    approval_code: String,
    money: Number
  });

  const MoneyLogModel = conn.model('money_log', MoneyLogSchema);

  return MoneyLogModel;
}
