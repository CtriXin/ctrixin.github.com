# rem解决方案 + 1px的border处理

此方案主要解决**移动端**的字体大小样式和针对UI提出的border 1px处理方案



首先 保证meta的viewport 已经禁用缩放，并且**没有**设置width=device-width





## js

```js
//此方法可以放在Vue文件里，在create时执行
let self = this;
let scales = 1 / window.devicePixelRatio; //得到当前屏幕或设备的是否retina
let width = document.documentElement.clientWidth/window.devicePixelRatio; //得到宽度
let scale = width / 375; //得到基于iphone6的缩放比例
$('html').css('font-size', width/10*window.devicePixelRatio);//设置字体大小为屏幕宽度/10  1rem = 屏幕宽度/10
```



上述方法是通过js 定义了1rem的对应font-size 将根据设备进行适配 同时进行了是否retina屏幕的检测，在调试大小时不需要注意 只需要把此方法执行即可



```javascript
let scales = 1 / window.devicePixelRatio
$('head').append('<meta name="viewport" content="initial-scale=' + scales + ',maximum-scale=' + scales + ', minimum-scale=' + scales + ',user-scalable=no">');
```

此方法是设置meta 根据像素密度设置不同的viewport ***需要先执行！***放在$(function(){})里



## css

```scss
@function rem($px) {
    $remSize: $px / 375 *10;
    @return #{$remSize}rem
}
```

这个是scss的定义方法，通过此方法则省去计算的问题，只需要在执行的时候使用即可，如：

```scss
div {
        font-size: rem(13);
    }
```







## 通过上面的设置 在border上 直接使用1px 即可



对于使用rem导致的sprite问题 可以让sprite缩放100倍

如下：

```css
.icon-my {
    width: 2.13333rem;
    height: 2.13333rem;
    position: relative; /* 相对定位 */
}

.icon-my:after {
    content: '';
    width: 10000%;  /* 放大100倍 */
    height: 10000%;
    position: absolute; 
    left: 0;
    top: 0;
    background: url(icon-index.png) no-repeat -245.33333rem 0; /* 单位尺寸放大100倍 */
    background-size: 593.06667rem 458.66667rem;
    transform-origin: 0 0; /* 不从中心点缩放 */
    transform: scale(0.01); /* 缩放回原尺寸 */
}
```

