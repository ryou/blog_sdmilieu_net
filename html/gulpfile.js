var gulp = require('gulp');

// 汎用プラグイン
var rename  = require('gulp-rename');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var watch   = require('gulp-watch');
var del     = require('del');

// css関係
var sass         = require('gulp-sass');
var csscomb      = require('gulp-csscomb');
var autoprefixer = require('gulp-autoprefixer');

// ブラウザ関係
var browserSync = require('browser-sync').create();

// 画像関係
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


var paths = {
  sass: './src/**/*.scss',
  png: './src/**/*.png',
  cp: [
    './src/**/*',
    './src/**/.*',
    '!./src/**/{*.scss,*.png}'
  ],
  dest: './public'
};


gulp.task('sass', function() {
  return gulp.src(paths.sass)
  .pipe(sass({
    includePaths: './sass_imports',
    outputStyle: 'nested'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['android 2.3'],
    remove: false
  }))
  .pipe(csscomb())
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream());
});

gulp.task('img', function(){

  /*
  pngquantでqualityの範囲外の画像は圧縮されずdistディレクトリにも
  出力されないので、先に画像を全てコピーしておく
  また、画質に関係しないデータは削除しておきたいためimageminをかけておく
  */
  gulp.src(paths.png)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.dest))
      .on('end', function() {
        gulp.src(paths.png)
            .pipe(imagemin({
              progressive: true,
              use: [
                pngquant({
                  quality: '60-80'
                })
              ]
            }))
            /*
            pngquantはガンマ補正情報を埋め込む場合があり、それが残っているとpng画像だけ
            周りと色の差が発生してしまう場合があるので、再度imageminをかけて補正情報を除去
            */
            .pipe(imagemin())
            .pipe(gulp.dest(paths.dest));
      });
});

gulp.task('cp', function() {
  gulp.src(paths.cp)
      .pipe(gulp.dest(paths.dest));
});

gulp.task('clean', function(cb) {
  del([
    paths.dest + '/**/*',
    paths.dest + '/**/.*',
    '!' + paths.dest  + '/posts',
    '!' + paths.dest  + '/posts/**/*'
  ]).then(function() {
    cb();
  });
});

gulp.task('build', ['clean'], function() {
  gulp.start(['cp', 'sass', 'img']);
});

gulp.task('default', ['build'], function() {
  browserSync.init({
    // 案件に応じて、proxyかserverどちらかの行を有効に
    proxy: "192.168.33.10",
    // server: paths.dest,
    open: false,
    ghostMode: false
  });

  watch(['./src/**/*.scss', './sass_imports/**/*.scss'], function(event) {
    gulp.start('sass');
  });
  watch([paths.png], function(event) {
    gulp.start('img');
  });
  watch(paths.cp, function(event) {
    gulp.start('cp');
  });
});
