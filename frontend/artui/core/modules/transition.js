/*
 * 当React与dropdown, popup等组件结合时, 其中的transition由于动画的延迟
 * 导致React组件被删除后动画仍未结束而引发异常. 通过禁用错误信息避免该异常在console
 * 中显示.
 * http://semantic-ui.com/modules/transition.html
***/

$.fn.transition.settings.silent = true;