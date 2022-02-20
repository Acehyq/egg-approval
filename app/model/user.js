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

    const User = new Schema({
        name: String,           // 姓名
        department: String,     // 部门
        code: String,           // 员工编号
        position: String,       // 职位
        password: String,       // 密码
        token: String,          // token
        created_time: Date,
        updated_time: Date
    });

    const UserModel = conn.model('user', User);

    return UserModel;
}
