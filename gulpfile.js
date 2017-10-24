const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer');

const autoprefixerOptions = {
    browsers: ['last 2 versions'],
    cascade: false
};

gulp.task('css', function () {
    return gulp.src('./src/style/main.css')
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./build/style/'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/style/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("babel", function () {
    return gulp.src("./src/script/script.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("./build/script/"))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("./build/script/"))
        .pipe(browserSync.reload({  // prompts a reload after compilation
            stream: true
        }));
});

gulp.task('project:watch', function () {

    //BrowserSync monitors the directory defined in baseDir and whenever we run the command, the page reloads.
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**/*.css', ['css']);
    gulp.watch('./src/**/*.js', ['babel']);
    gulp.watch(
        [
            './*.html', 
            './src/**/*.css', 
            './src/**/*.js'
        ]
    ).on('change', browserSync.reload);
});