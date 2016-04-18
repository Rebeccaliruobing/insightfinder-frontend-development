/*
 * 对Semantic UI message的扩展
 * http://semantic-ui.com/collections/message.html
 *
 * 1. 消息框关闭事件
 */

$('.ui.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;
