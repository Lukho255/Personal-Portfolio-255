/* eslint-disable space-before-function-paren */
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', async() => {
    // Run ESLint
    gulp.src(['es6/**/*.js', 'public/es6/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
    // Node source
    gulp.src('es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
    // browser source
    gulp.src('public/es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/dist'));
    // eslint-disable-next-line eol-last
});