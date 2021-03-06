import gulp from 'gulp';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js", '!/src/js/bundle/**')
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'bundle.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest('./src/js/bundle'))
                .on("end", browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min"
            }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch(["src/js/**/*.js", "!src/js/bundle/*.js"], gulp.parallel("build-js"));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist/"))
});

// gulp.task('scripts', function () {
//     return gulp.src("src/js/**/*.js")
//         .pipe(gulp.dest("dist/js"))
// });

// gulp.task('fonts', function () {
//     return gulp.src("src/fonts/**/*")
//         .pipe(gulp.dest("dist/fonts"))
// });

// gulp.task('icons', function () {
//     return gulp.src("src/icons/**/*")
//         .pipe(gulp.dest("dist/icons"))
// });

// gulp.task('mailer', function () {
//     return gulp.src("src/mailer/**/*")
//         .pipe(gulp.dest("dist/mailer"))
// });

// gulp.task('images', function () {
//     return gulp.src("src/img/**/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest("dist/img"))
// });

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); // , 'scripts', 'fonts', 'icons','html', 'mailer', 'images'