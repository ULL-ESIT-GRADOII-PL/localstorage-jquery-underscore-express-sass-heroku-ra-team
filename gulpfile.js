// Gulpfile. Assignment: CSV

var gulp = require('gulp');
var watch = require('gulp-watch'); // Watch to have background tasks executing when some event is triggered
var htmlmin = require('gulp-minify-html');
var cssmin = require('gulp-minify-css');
var ghPages = require('gulp-gh-pages');		// Used to update the gh-pages branch
var clean = require('gulp-clean');	 // To clean the public directory
var uglify = require('gulp-uglify');     // To uglify the codes
var sass = require('gulp-sass');	// This is used to automatize the Sass tasks
var karma = require('gulp-karma');  // Include Karma

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

gulp.task('minify-all', function () {
  gulp.src('js/csv.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified'));

  gulp.src('./index.html')
  .pipe(htmlmin())
  .pipe(gulp.dest('./minified/'))

  gulp.src('./css/*.css')
  .pipe(cssmin({keepBreaks:true}))
  .pipe(gulp.dest('./minified/'))
});

gulp.task('minify-html', function() {
  return gulp.src(input.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(output.html));
});

// Deploy to gh pages
gulp.task('deploy', function() {
  return gulp.src('./csv-testing/*')
    .pipe(ghPages());
});

// Clean everything
gulp.task('clean', function () {
	return gulp.src(outDir, {read: false})
		.pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(input.js,['minified-js']);
  gulp.watch(input.html, ['minify-html']);
  gulp.watch(input.sass, ['sass']);
});

// Run the tests
gulp.task('test', function() {
  return gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

// Default tasks
gulp.task('default', ['minify-all'], function() {
  gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
