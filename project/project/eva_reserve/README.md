此项目为eva游戏的预约和官网页面，其中官网为专为bilibili制作



## 预约页面

此项目分为手机版和pc版。

1. pc版使用foundation为基础框架，搭配swiper2的轮播图滚动
2. mobile版使用了light7为基础框架，因为其手机适配的易用性

### bug

弹窗偶然会出现偏移问题,此问题已经解决，如若代码未更新，可自行添加

```css
.is-reveal-open{
    overflow: initial !important;
}
.reveal-overlay{
    overflow-y: hidden;
}
```

此代码调整了弹窗后，页面由于增加了is-reveal-open的class导致overflow，hidden的问题，此问题为通用问题解决方案，可以放在bootstrap和semanticUI上使用

