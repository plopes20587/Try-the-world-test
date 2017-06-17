var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Copy HTML to production
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('production'))
    .pipe(reload({stream:true}));
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
    .pipe(reload({stream:true}));
});

// Compile sass
gulp.task('sass', function(){
  var processors = [
  autoprefixer({browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']})
];
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(cssmin())
  .pipe(gulp.dest('production/css'))
  .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "production"
        }
    });
});

gulp.task('watch', function(){
  gulp.watch('src/js/*js', ['scripts'], reload)
  gulp.watch('src/img/*', ['imageMin'], reload)
  gulp.watch('src/sass/*scss', ['sass'], reload)
  gulp.watch('src/*html', ['copyHtml'], reload)
});

gulp.task('build', ['imageMin', 'copyHtml', 'scripts', 'sass']);
gulp.task('default', ['imageMin', 'copyHtml', 'scripts', 'sass', 'browserSync', 'watch']);
