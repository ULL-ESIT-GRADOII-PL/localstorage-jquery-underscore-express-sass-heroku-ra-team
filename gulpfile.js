// Gulpfile. Assignment: CSV

var gulp = require('gulp');
var watch = require('gulp-watch'); // Watch to have background tasks executing when some event is triggered
var htmlmin = require('gulp-htmlmin');
var ghPages = require('gulp-gh-pages');		// Used to update the gh-pages branch
var clean = require('gulp-clean');	 // To clean the public directory
var uglify = require('gulp-uglify');     // To uglify the codes
var sass = require('gulp-sass');	// This is used to automatize the Sass tasks

var sourceDir = 'src/';
var input = {
  html: sourceDir + 'html/*.html',
  css: sourceDir + 'css/*.css',
  sass: sourceDir + 'styles/*.sass',
  js: sourceDir + 'js/*.js'
};

var outDir = 'public/';
var output = {
  html: outDir,
  sass: outDir + 'css/',
  js: outDir + 'js/'
};

gulp.task('sass', function () {
  return gulp.src(input.sass)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(output.sass));
});

gulp.task('minified-js', function() {
  return gulp.src(input.js)
    .pipe(uglify())
    .pipe(gulp.dest(output.js));
});

gulp.task('minify-html', function() {
  return gulp.src(input.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(output.html));
});

gulp.task('generate-pages', function() {
  return gulp.src(outDir + '**/*')
    .pipe(ghPages('.'));
});

gulp.task('clean', function () {
	return gulp.src(outDir, {read: false})
		.pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(input.js,['minified-js']);
  gulp.watch(input.html, ['minify-html']);
  gulp.watch(input.sass, ['sass']);
});

gulp.task('default', ['minify-html', "minified-js", "sass"]);  // Default tasks loads everything again
