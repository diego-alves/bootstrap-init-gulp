var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    clean  = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src([
    'js',
    'css',
    'dist'
  ], {read: false})
  .pipe(clean());
});

gulp.task('css', function() {
  return gulp.src('./app/sass/**/*.sass')
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        './app/sass',
        './node_modules/bootstrap-sass/assets/stylesheets'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('vjs', function() {
  return gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('js', function() {
  return gulp.src('./app/coffee/**/*.coffee')
    .pipe(coffee({bare: true})
      .on('error', console.log))
    .pipe(gulp.dest('./js'));
});

gulp.task('default', ['css', 'vjs', 'js']);

gulp.task('dist', ['default'], function() {
  return gulp.src([
    './index.html',
    './js/**/*',
    './css/**/*'
  ],{ base: './' })
  .pipe(gulp.dest('./dist'));
});
