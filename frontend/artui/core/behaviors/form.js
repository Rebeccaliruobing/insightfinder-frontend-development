/*
 * 对Semantic UI form behavior的扩展如下:
 * http://semantic-ui.com/behaviors/form.html
 *
 * 在给form添加提交按钮时, 一定得添加type="submit", 如:
 * <div type="submit" class="ui submit button">注册</div>
 * 否则采用api进行表单提交后, form仍旧会以post提交.
 *
 * 1. 添加字段校验的类型(type)
 * 2. 修改校验的提示信息(prompt)
 */

// 账号(type=account)
const accountRegex = /^[a-zA-Z0-9]{6,30}$/;
$.fn.form.settings.rules.account = function(value) {
  return accountRegex.test(value);
};
$.fn.form.settings.prompt.account = '账号由6-30个英文字母或数字组成';

// 密码(type=password)
const passwordRegex = /^(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,30}$/;
$.fn.form.settings.rules.password = function(value) {
  return passwordRegex.test(value);
};
$.fn.form.settings.prompt.password = '密码由8-30个字符，且必需包括大、小写字母，数字及特殊字符';


// 手机号码(type=mobile)
const mobileRegex = /^(0|86)?(13[0-9]|14[5,7]|15[0-3,5-9]|17[0,6-8]|18[0-9])\d{8}$/;
$.fn.form.settings.rules.mobile = function(value) {
  return mobileRegex.test(value);
};
$.fn.form.settings.prompt.mobile = '请输入正确的手机号码';

// 邮件或手机号(type=emailOrMobile)
$.fn.form.settings.rules.emailOrMobile = function(value) {
  var emailRegExp = new RegExp($.fn.form.settings.regExp.email, 'i');
  return emailRegExp.test(value) || mobileRegex.test(value)
};
$.fn.form.settings.prompt.emailOrMobile = '请输入邮件地址或手机号';

// 短信验证码(type=vcode)
const vcodeRegex = /^(\d{6})$/;
$.fn.form.settings.rules.vcode = function(value) {
  return vcodeRegex.test(value);
};
$.fn.form.settings.prompt.vcode = '请输入短信验证码';

// 邀请码(type=icode)
const icodeRegex = /^([a-zA-Z0-9]{6})$/;
$.fn.form.settings.rules.icode = function(value) {
  return icodeRegex.test(value);
};
$.fn.form.settings.prompt.icode = '请输入从朋友获得的六位邀请码';

// 邮件(type=email)
$.fn.form.settings.prompt.email = '请输入正确的邮件地址';
