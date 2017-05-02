import gulp         from 'gulp';
import browserify   from 'browserify';
import babelify     from 'babelify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import browserSync  from 'browser-sync';
import sass         from 'gulp-sass';

browserSync.create();

gulp.task('javaScript', () => {
  return browserify({entries: './src/js/app.js', debug: true})
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


gulp.task('sass', () => {
  return gulp.src("./src/styles/*.scss")
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});


gulp.task('serve', ['sass', 'javaScript'], () => {

  browserSync.init({
    server: true
  });

  gulp.watch("src/styles/*.scss", ['sass']);
  gulp.watch('src/js/*.js', ['javaScript']);
});


gulp.task('default', ['serve']);

