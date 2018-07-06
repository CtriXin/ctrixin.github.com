var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var gulp = require('gulp');

//express启动项
gulp.task("node", function () {
    nodemon({
        script: './bin/www',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});


gulp.task('start', ["node"], function () {
    //所需要监听的文件
    var files = [
        "routes/**",
        'views/**/*.html',
        'views/**/*.ejs',
        'dist/**/*.*'
    ];

    browserSync.init(files, {
        proxy: 'localhost:5656', //所要代理的地址，端口要与bin/www中的端口一致
        browser: 'google chrome',
        notify: false,
        // port: 3001    //代理地址的端口号
    });

    gulp.watch(files).on("change", reload);
});