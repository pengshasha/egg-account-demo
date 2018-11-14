'use strict';
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;
  // /**
  //  * userName 用户名 类型Type--Stirng
  //  * passWord 密码  类型Type--String
  //  */
  const LoginSchema = new Schema({
    userName: String,
    passWord: String,
    telephone: String,
    nickName: String
  });
  // return mongoose.model('index', LoginSchema);

  return mongoose.model('user_table1', LoginSchema);
  // mongoose.connect('mongodb://localhost:27017/account');
  // const db = mongoose.connection;
  // db.on('error', () => {
  //   console.error('链接失败');
  // });
  // db.once('open', function() {
  //   const aa = db.model('user_table1', LoginSchema).insertMany({ userName: 'pengshasha', passWord: '123456' });
  //   console.log('-------');
  //   aa.then(res => {
  //     console.log('res-----');
  //     console.log(res);
  //   });
  //   return aa;
  //   // db.model('index', LoginSchema);
  // });
}
;
