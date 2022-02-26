module.exports = app => {

  const mongoose = app.mongoose;
  const Types = mongoose.Types;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('egg_approval');

  const MoneySchema = new Schema({
    sum: Number,           // 资金总额
  });

  const MoneyModel = conn.model('money', MoneySchema);

  return MoneyModel;
}
