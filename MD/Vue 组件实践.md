# Vue 组件实践

## 基础组件

1. 注册一个组件，在Vue中实例它
2. 注册组件的方法为：`Vue.component('自己定义的组件名称'，构建函数)`
3. 构建函数可以为function 也可以是object

+ function：

```javascript
var Mycomponent = Vue.extend({
  //选项
})
```

+ object

```javascript
Vue.component('自己的组件名'，{
  template：'<div>test</div>'
})
```



```html
<div class="page" id="rank">
     <my-component></my-component>
</div>
```

```javascript
var Mycomponents = Vue.extend({
	template: '<div>test</div>'
});

Vue.component('my-component',Mycomponents);

var app1 = new Vue({
	el: "#rank"
});

```









# template 页面内组件

## 模板标签template

1. 创建模板标签<template>
2. 赋予一个id给template标签，使其有可指代性

```vue
 <template id="myComponent">
 	<div>This is a component!</div>
 </template>
```

3. 在页面中创建自己定义的标签，用来将template注册进去

```html
 <div id="app">
 	<my-component></my-component>
 </div>
```

4. 可以全局注册此组件，也可以直接在vue文件中使用

```javascript
Vue.component('my-component',{
	template: '#myComponent'
})

new Vue({
	el: '#app'
})
```

```javascript
new Vue({
	el: '#app',
	components:{
      'my-component':{
			template: '#myComponent'
		}
	}
})
```

如果在一个#app元素中注册组件，则不能再其他地方使用