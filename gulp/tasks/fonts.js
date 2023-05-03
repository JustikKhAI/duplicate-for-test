import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import rename from "gulp-rename";

export const otfToTtf = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "FONTS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(
         fonter({
            formats: ["ttf"],
         })
      )
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "FONTS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(
         fonter({
            formats: ["woff"],
         })
      )
      .pipe(
         rename(function (path) {
            if (path.basename.startsWith("fonts")) {
               path.basename = path.basename.slice(6);
            } else {
               path.basename = path.basename;
            }
         })
      )
      .pipe(app.gulp.dest(`${app.path.build.fonts}/fonts/`));
};
export const ttfToWoff2 = () => {
   return app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`)
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "FONTS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(ttf2woff2())
      .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};
export const fontStyle = () => {
   let fontsFile = `${app.path.srcFolder}/scss/_fonts.scss`;
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         if (!fs.existsSync(fontsFile)) {
            fs.writeFile(
               fontsFile,
               "/* Этот файл не для включения, а для копирования шрифтов в основной файл */\r",
               cb
            );
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
               let fontFileName = fontsFiles[i].split(".")[0];
               let fStyle = "normal";
               if (
                  fontFileName.toLowerCase().includes("italic") ||
                  fontFileName.toLowerCase().includes("cursive")
               )
                  fStyle = "italic";
               if (newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split("-")[0]
                     ? fontFileName.split("-")[0]
                     : fontFileName;
                  let fontWeight = fontFileName.split("-")[1]
                     ? fontFileName.split("-")[1]
                     : fontFileName;
                  if (
                     fontWeight.toLowerCase() === "thin" ||
                     fontFileName.toLowerCase().includes("thin")
                  ) {
                     fontWeight = 100;
                  } else if (
                     fontWeight.toLowerCase() === "extralight" ||
                     fontFileName.toLowerCase().includes("extralight")
                  ) {
                     fontWeight = 200;
                  } else if (
                     fontWeight.toLowerCase() === "light" ||
                     fontFileName.toLowerCase().includes("light")
                  ) {
                     fontWeight = 300;
                  } else if (
                     fontWeight.toLowerCase() === "medium" ||
                     fontFileName.toLowerCase().includes("medium")
                  ) {
                     fontWeight = 500;
                  } else if (
                     fontWeight.toLowerCase() === "semibold" ||
                     fontFileName.toLowerCase().includes("semibold")
                  ) {
                     fontWeight = 600;
                  } else if (
                     fontWeight.toLowerCase() === "bold" ||
                     fontFileName.toLowerCase().includes("bold")
                  ) {
                     fontWeight = 700;
                  } else if (
                     fontWeight.toLowerCase() === "extrabold" ||
                     fontFileName.toLowerCase().includes("extrabold")
                  ) {
                     fontWeight = 800;
                  } else if (
                     fontWeight.toLowerCase() === "black" ||
                     fontFileName.toLowerCase().includes("black")
                  ) {
                     fontWeight = 900;
                  } else {
                     fontWeight = 400;
                  }
                  fs.appendFile(
                     fontsFile,
                     `@font-face {\r\tfont-family: ${fontName};\r\tfont-display: swap;\r\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),\r\t\turl("../fonts/${fontFileName}.woff") format("woff");\r\tfont-weight: ${fontWeight};\r\tfont-style: ${fStyle};\r}\r\n`,
                     cb
                  );
                  newFileOnly = fontFileName;
               }
            }
         } else {
            console.log(
               "Файл scss/fonts.scss уже существует. Для обновления нужно его удалить."
            );
         }
      }
   });

   return app.gulp.src(`${app.path.srcFolder}`);
   function cb() {}
};
