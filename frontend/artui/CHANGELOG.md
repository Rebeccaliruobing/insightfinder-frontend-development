# 基于Semantic UI的有艺术品位的前段库
对Semantic UI的定制是基于其Github的[#next][1]分支. 定制采用Semantic UI标准定制方法, 即对site中的修改. 
对Semantic UI的扩展在artui中, 其目录结构也Semantic UI相同, 包括jquery及react的支持.
Semantic UI的安装及升级可参考[Semantic UI Getting Started][2].

## [Unrelease] (2016-04)
### Added

### Reset
- 使用[normalize.css][3] 4.0.0 替换当前版本

### Site
- 禁用google字体, 并添加中文字体及*monospace*字体及class
- 调整缺省的圆角为2px
- 将应用定制颜色的值保存在artui目录外的artui_variable.less, 与artui核心样式隔离
- *loopColors* Mixins，用于生成基于颜色名称的样式
- 添加*@boldFontWeight*变量，用于全局，用于遍历列表创建样式
- 添加*loopWide*Mixins，用于生成基于宽度名称的样式

### React
- **Link**, **IndexLink**组件, 对react-router中Link, IndexLink添加缺省的activeClassName 
- **Hoverable**组件, 用于hover时不同显示内容的react组件
- 添加**react-timeout**包，提供安全的timeout方法

### Container
- 增加大小的类, 支持mini ~ massive大小
- 用于生成固定宽度的弹性container的Mixin *makeContainer*
- 调整container小屏幕下的左右间隔为16px固定大小, 与字体无关
- 添加*basic*类，代表在任何屏幕下都是100%的宽度

### Segment
- 添加*flat*类，去掉凸起效果
- segment左右边距采用16px固定大小，与字体无关
- segment上下才用1em，与字体相关
- vertical时，不同颜色用于改变分割线的颜色

### Form
- 调整Label粗体为*@boldFontWeight*
- 添加*parts*类，用于描述多个输入项的field

### Input
- 添加*compact*类，减小边距
- 添加React组件，并且支持错误信息提示框

### Button
- 缺省字体大小为1em, 以支持全局设置字体大小
- 字体*font-weight*调整为normal
- 调整 *vertical-align* 为buttom，以和input等对齐

### Label
- 调整字体的深度为 *@boldFontWeight*
- 实现React Label组件，提供自动消失功能

### Menu
- 调整粗体的深度为 *@boldFontWeight*

- modal调整大小类, 支持mini ~ massive的modal
- icon添加hoverrotate类, hover时图标转动
- rest.js 添加基于api.js的rest封装实现, rest命令通过restMethod或data-rest-method指定
- collections/table.overrides 调整table中元素的样式, checkbox, th, selectable, sortable disabled等
- input.overrides 添加tiny大小的input

### Message
- React的Message组件, 用于处理Message的关闭
- 调整message左右间隔大小, 间隔固定16px/rem
- React Message组件添加自动延时关闭功能

### Accordion
- 添加React **Accordion**组件
- 增加accordion *dividing*类用于分割title, 并支持多种颜色
- title字体大小比content字体大一个号, 且为粗体*@boldFontWeight*

### Todo:
- globals/site.variables 添加常用的padding, margin大小的class? 参照bootstrap

[1]:https://github.com/necolas/normalize.css
[2]:https://github.com/Semantic-Org/Semantic-UI/blob/next/RELEASE-NOTES.md
[3]:http://semantic-ui.com/introduction/getting-started.html