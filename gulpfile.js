'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks-render');
var rename = require('gulp-rename');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('nunjucks', function() {
    return gulp.src('src/templates/*.+(html|nunjucks)')
        .pipe(nunjucks({
            path: ['src/templates']
        }))
        .pipe(rename((path) => {
            if (path.basename == "index") {
                path.dirname = ".";
            } else {
                path.dirname = "./pages/" + path.basename;
                path.basename = "index";
            }
        }))
        .pipe(gulp.dest("."));
});
