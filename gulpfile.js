var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var del = require('del');

////////// COMBINE & MINIFY
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    // minify only if CSS
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

////////// CLEAN DISTRIBUTION FOLDER
gulp.task('clean', function() {
  return del.sync('dist');
});

////////// BUILD DISTRIBUTION FOLDER
gulp.task('build', function (callback) {
  runSequence('clean', ['minify', 'js'],
    callback
  )
});

////////// MOVE JS TO DISTRIBUTION
gulp.task('js', function() {
  return gulp.src('src/js/**/*')
      .pipe(gulp.dest('dist/js'))
})