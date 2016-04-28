/*
 * Artui包括Semantic UI的功能扩展及参数选定. 其目录结构参照Semantic UI的结构.
 * Semantic UI中的组件样式的修改仍在Semantic中进行.
 *
 * index.js中包括了基于jquery或js的扩展. react.js中包括了基于React的扩展.
 * 当不需要使用React时, 只需要引入index.js文件.
 */

import './semantic/dist/components/api';
import './semantic/dist/components/form';
import './semantic/dist/components/transition';
import './semantic/dist/components/dropdown';
import './semantic/dist/components/checkbox';
import './semantic/dist/components/popup';
import './semantic/dist/components/accordion';

import './core/modules/transition';
import './core/behaviors/api';
import './core/behaviors/rest';
import './core/behaviors/form';
import './core/collections/message';