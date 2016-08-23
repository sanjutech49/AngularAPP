/// <binding BeforeBuild='bower' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    jshint = require('gulp-jshint'),
     ignore = require('gulp-ignore');
var paths = {
    webroot: ""
};

// This is or IDP
//var jobItJs = require('jobIT/scripts.json');


gulp.task('scripts', function () {
    return gulp.src('jobIT/*/*.js')
      .pipe(concat('jobit.js'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('jshint', function () {
    gulp
      .src('jobIT/*/*.js')
        .pipe(ignore.exclude())
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});


