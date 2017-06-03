var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

// Copy HTML to production
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('production'));
});


// Optimize Images
gulp.task('imageMin', function(){
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('production/img'));
});


// Minify JS
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('production/js'))
});

// Compile sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('production/css'));
});


gulp.task('default', ['imageMin', 'copyHtml', 'scripts', 'sass']);

gulp.task('watch', function(){
  gulp.watch('src/js/*js', ['scripts']);
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/sass/*scss', ['sass']);
  gulp.watch('src/*html', ['copyHtml']);
});
