module.exports = app => {

    const mongoose = app.mongoose;
    const Types = mongoose.Types;

    /*
    export class UserInfo {
  @Prop()
  id: Types.ObjectId; // mongo id
  @Prop()
  name: string;       // 姓名
  @Prop()
  code: string;       // 员工id
     */

    const UserInfo = {
        id: Types.ObjectId,
        name: String,
        code: String,
    };

    const User = {
        name: String,           // 姓名
        department: String,     // 部门
        code: String,           // 员工编号
        position: String,       // 职位
        password: String,       // 密码
        token: String,          // token
        created_time: Date,
        updated_time: Date
    };
}
