import babel from "gulp-babel";
import uglify from "gulp-uglify";
import concat from "gulp-concat";


export const js = () => {
   return app.gulp
      .src("./src/js/**/*.js")
      .pipe(app.plugins.sourcemaps.init())
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "JS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(
         babel({
            presets: ["@babel/env"],
         })
      )
      .pipe(uglify())
      .pipe(concat("app.min.js"))
      .pipe(app.plugins.sourcemaps.write("."))
      .pipe(
         app.plugins.size({
            showFiles: true,
         })
      )
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream());
};
