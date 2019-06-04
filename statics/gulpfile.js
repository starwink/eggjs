var gulp = require("gulp");
var sass = require('gulp-sass');
var minify=require('gulp-minify');
var pug = require('gulp-pug');
var rename = require("gulp-rename");
var concat = require("gulp-concat");//js合并
var browserSync = require("browser-sync").create();
//https://www.npmjs.com/package/gulp-concat

var bashPath='.';
var staticVersion='/4.0';
var outPath='../app/public/isz'+staticVersion;
var outHtmlPath='../app';
var viewHtmlPath='../app/public/isz/html/'
var sourcePath=bashPath+staticVersion;

gulp.task('sass:prod', function () {
  return gulp.src(sourcePath+'/sass/**/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(outPath+'/css'));
});

gulp.task('sass:dev', function () {
  return gulp.src(sourcePath+'/sass/**/*.scss')
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(outPath+'/css'));
});
 
gulp.task('js:prod',function(){
  return gulp.src(sourcePath+'/js/**/*.js')
  .pipe(minify({
    //同时会编译未压缩js
    ext:{
      // source:'.min.js',
       min:[/(.*)\.js$/, '$1.min.js']
    },
    noSource:true,
    //定义不会压缩的目录
    // exclude: ['tasks'],
     ignoreFiles: ['*.min.js']
}))
  .pipe(gulp.dest(outPath+'/js'));
});

gulp.task('js:dev', function() {
  gulp.src(sourcePath+'/js/**/*.js')
  .pipe(rename(function (path) {
    if(path.basename.indexOf(".min")==-1){
      path.extname = ".min.js";
    }else{
      path.extname = ".js";
    }
  }))
    .pipe(gulp.dest(outPath+'/js'))
});



 //http://jade-lang.com/api
gulp.task('pug:dev', function buildHTML() {
  return gulp.src(sourcePath+'/pug/**/*.pug')
  .pipe(pug({
    pretty:true, //不压缩
  }))
  .pipe(rename(function (path) {
    path.extname = ".html";
  }))
  .pipe(gulp.dest(outHtmlPath+'/view'))
});

gulp.task('pug:view', function buildHTML() {
  return gulp.src(sourcePath+'/pug/**/*.pug')
  .pipe(pug({
    pretty:true, //不压缩
  }))
  .pipe(rename(function (path) {
    path.extname = ".html";
  }))
  .pipe(gulp.dest(viewHtmlPath+'/view'))
});

gulp.task('pug:prod', function buildHTML() {
  return gulp.src(sourcePath+'/pug/**/*.pug')
  .pipe(pug({
  }))
  .pipe(rename(function (path) {
    path.extname = ".html";
  }))
  .pipe(gulp.dest(outHtmlPath+'/view'))
});



gulp.task('sass:watch', function () {
  gulp.watch(sourcePath+'/sass/**/*.scss', ['sass:dev']);
});
gulp.task('js:watch', function () {
  gulp.watch(sourcePath+'/js/**/*.js', ['js:dev']);
});
gulp.task('pug:watch', function () {
  gulp.watch(sourcePath+'/pug/**/*.pug', ['pug:dev']);
});

gulp.task('watch', function () {
  gulp.watch(sourcePath+'/sass/**/*.scss', ['sass:dev']);
  gulp.watch(sourcePath+'/js/**/*.js', ['js:dev']);
  gulp.watch(sourcePath+'/pug/**/*.pug', ['pug:dev']);
});


gulp.task('dev',['sass:dev','js:dev','pug:dev'],function(){

})

gulp.task('prod',['sass:prod','js:prod','pug:prod'],function(){

})


gulp.task('view',function(){
  gulp.watch(sourcePath+'/sass/**/*.scss', ['sass:dev']);
  gulp.watch(sourcePath+'/js/**/*.js', ['js:dev']);
  gulp.watch(sourcePath+'/pug/**/*.pug', ['pug:view']);
})