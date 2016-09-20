var gulp = require('gulp');

var minify = require('gulp-minify');
var cssmin = require('gulp-cssmin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');

//unit of common js files
gulp.task('min-js', function() {
    gulp.src('resources/assets/app/**/*.js')
        .pipe(concat('testApp.js'))
        .pipe(minify({
            noSource:'*.js'
        }))
        .pipe(gulp.dest('public/app'));
});

//unit of common css files
gulp.task('min-css', function () {
    gulp.src('resources/assets/css/*.css')
        .pipe(concat('common.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

//min html
gulp.task('min-html', function() {
    var opts = {comments:true,spare:true};
    gulp.src('resources/assets/app/template/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('public/app/template'));

    gulp.src('resources/assets/app/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['min-html', 'min-js', 'min-css']);






