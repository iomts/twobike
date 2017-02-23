var gulp = require('gulp'),
    connect = require('gulp-connect'),//本地server
    livereload   = require("gulp-livereload"),//实时刷新
    runSequence = require('run-sequence'),//同步执行
    mincss = require('gulp-mini-css'),//css压缩   
    uglify = require('gulp-uglify'),//js压缩
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),//静态资源版本号
    concat = require('gulp-concat'),//文件合并
    stripDebug = require('gulp-strip-debug'),//去掉调试信息
    sass = require('gulp-sass'),//编译scss --> css
    amdOptimize = require("amd-optimize"),//requirejs优化
    rename = require('gulp-rename'),//文件重命名
    clean = require('gulp-clean'),//文件清理
    notify = require("gulp-notify");//消息提示

var path = {
    html: './danong-weixin/WEB-INF',//页面路径
    dev: './danong-weixin/static', //开发根目录
    live: '../src/main/webapp',//在线编译、实时刷新
    build: './danong-weixin/static' //生产根目录
}

var selfPath = ['js','css','component','utils','li'];
//压缩js
gulp.task('minjs', function() {
    selfPath.forEach(function(val){  
        gulp.src(path.dev + '/'+ val +'/**/*.js')
            .pipe(stripDebug())//去掉console.log
            .pipe(uglify())//不保留注释
            .pipe(gulp.dest(path.build + '/' + val));//输出
        })
});
//压缩css
gulp.task('mincss', function () {
    selfPath.forEach(function(val){  
        gulp.src(path.dev + '/'+ val +'/**/*.css')
            .pipe(mincss())//默认不保留注释
            .pipe(gulp.dest(path.build + '/' + val));//输出
        })
});
//编译sass
gulp.task('revSass', function () {
    gulp.src(path.live + '/static/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(path.live + '/static/css'));
});
//Img生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revImg', function(){
    gulp.src(path.dev + '/img/**/*.*')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(path.build + '/img'));
});
//Html替换Img版本
gulp.task('revHtml', function () {
    gulp.src([path.build + '/img/rev-manifest.json', path.html + '/weixin/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.html));
});

//使用connect启动一个Web服务器
gulp.task('server', function () {
    connect.server({
        name: 'dev h5',
        port: 8888,
        root: path.live,
        livereload: true
    });
});
gulp.task('reload-dev',function() {
    gulp.src(path.live + '/WEB-INF/**/**/*.html')
      .pipe(connect.reload());
});

//监听 -->> 开发环境实时编译sass、以及实时刷新页面
gulp.task('watch', function() {
    gulp.watch(
        [path.live + '/static/sass/**/*.scss',path.live + '/WEB-INF/**/**/*.html'],
        ['revSass','reload-dev']
    );
})

//按顺序执行server/watch task 
gulp.task('live', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['server'],
        ['watch'],
        done);
})

//仅编译sass
gulp.task('watch-sass', function() {
    gulp.watch(path.live + '/static/sass/**/*.scss',['revSass']);
})

//生产构建，压缩css、js
gulp.task('build', function(done) {
    condition = false;
    runSequence(//按顺序运行
        ['mincss'],
        ['minjs'],
        done);
})

gulp.task('help',function () {
    console.log('----------------- 一个神奇的工具gulp -----------------');
    console.log('task-- build       生产构建，压缩css、js');
    console.log('task-- watch-sass       仅编译sass');
    console.log('task-- live     监听 -->> 开发环境实时编译sass、以及实时刷新页面(需要localhost:8888访问) ');
    console.log('task-- watch       //js生成文件hash编码并生成 rev-manifest.json文件名对照映射');
    console.log('----------------- END -----------------');
});

