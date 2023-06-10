import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp
      .src(app.path.src.scss)
      .pipe(app.plugins.sourcemaps.init())
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "SCSS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(
         sass().on("error", sass.logError)
      )
      .pipe(groupCssMediaQueries())
      .pipe(
         webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
         })
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            autoprefixer({
               grid: true,
               overrideBrowserslist: ["last 3 versions"],
               cascade: true,
            })
         )
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(
         app.plugins.if(
            app.isBuild,
            cleanCss({
               level: 2,
            })
         )
      )
      .pipe(
         rename({
            extname: ".min.css",
         })
      )
      .pipe(app.plugins.sourcemaps.write("."))
      .pipe(
         app.plugins.size({
            showFiles: true,
         })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream());
};
