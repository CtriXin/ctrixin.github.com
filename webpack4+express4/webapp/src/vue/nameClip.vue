<template>
  <!--姓名组-->
  <div class="name-group">
    <div class="block-wrap">
      <div class="name-group-clip" v-if="clipSide=='left'" :style="'padding-right:'+clipPadding">
        <div class="name-group-icon" :style="'width:'+clipWidth">
          <div v-if="showGender" class="gender-icon" :class="genderPrefix(myGender)"></div>
          <div class="level-icon" :class="levelPrefix(myLevel,'level-')">
            <span class="name-group-level-num">{{myLevel}}</span>
          </div>
        </div>
        {{myName}}
      </div>
    </div>
  </div>

</template>


<!--usage-->

<!-- <name-clip :my-name="data.nick" clip-width="55px" clip-padding="57px"  clip-side="left" show-gender="true" :my-level="data.level" :my-gender="data.gender"></name-clip> -->
<!--  <name-clip :my-name="data.nick" clip-width="1.6rem" clip-padding="1.6rem" clip-side="left" show-gender="true" :my-level="data.level" :my-gender="data.gender"></name-clip> --> 
<!--  <name-clip my-name="gatgagd" my-level="14" my-gender="1"></name-clip> --> 
<!-- clip-side,clip-width,show-gender,clip-padding 可以不传 


-->

<script>

export default {
    data() {
        return {
            data: "some data should be here",
            isIOS:
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream,
            isAndroid: /Android/.test(navigator.userAgent) && !window.MSStream
        };
    },
    // props: ['myName', 'myGender', 'myLevel', 'showGender','clipSide','clipWidth','clipPadding','iosHeight','lineHeight'],
    created() {
        var self = this;
    },
    methods: {
        levelPrefix(lvl, classname) {
            let num;
            if (lvl >= 0 && lvl <= 10) num = 1;
            if (lvl >= 11 && lvl <= 20) num = 2;
            if (lvl >= 21 && lvl <= 30) num = 3;
            if (lvl >= 31 && lvl <= 45) num = 4;
            if (lvl >= 46 && lvl <= 60) num = 5;
            if (lvl >= 61 && lvl <= 75) num = 6;
            if (lvl >= 76 && lvl <= 90) num = 7;
            if (lvl >= 91 && lvl <= 110) num = 8;
            if (lvl >= 111 && lvl <= 130) num = 9;
            if (lvl >= 131 && lvl <= 160) num = 10;
            if (lvl >= 161 && lvl <= 200) num = 11;
            if (lvl >= 201 && lvl <= 230) num = 12;
            if (lvl >= 231 && lvl <= 260) num = 13;
            if (lvl >= 261 && lvl <= 300) num = 14;
            if (lvl >= 301) num = 15;

            // console.log(classname+num);
            return classname + num;
        },
        anchorlevelPrefix(lvl, classname) {
            let num;
            if (lvl >= 0 && lvl <= 10) num = 1;
            if (lvl >= 11 && lvl <= 20) num = 2;
            if (lvl >= 21 && lvl <= 30) num = 3;
            if (lvl >= 31 && lvl <= 45) num = 4;
            if (lvl >= 46 && lvl <= 60) num = 5;
            if (lvl >= 61 && lvl <= 75) num = 6;
            if (lvl >= 76 && lvl <= 90) num = 7;
            if (lvl >= 91 && lvl <= 110) num = 8;
            if (lvl >= 111 && lvl <= 130) num = 9;
            if (lvl >= 131) num = 10;
            return classname + num;
        },
        genderPrefix(gender) {
            // console.log(gender);
            if (gender == 0) return "gender-nosex";
            if (gender == 1) return "gender-male";
            if (gender == 2) return "gender-female";
        }
    },
    props: {
        myName: {
            // 序列
            required: true
        },
        myGender: {
            // 用户数据
            required: true
        },
        myLevel: {
            // 静态资源路径
            required: true
        },
        showGender: {
            default: "true"
        },
        clipSide: {
            // 必须提供字段
            default: "left"
        },
        clipWidth: {
            // 姓名截取的长度
            default: "1.76rem"
        },
        clipPadding: {
            // 姓名截取的padding长度
            default: "1.76rem"
        },
        iosHeight: {
            // ios高度
            default: ".3733rem"
        },
        lineHeight: {
            // 必须提供字段
            default: ".4rem"
        }
    }
};
</script>
