//-----------------------------------------------//
/*
const gulp = require("gulp");
const { task } = require("gulp");
const { dest, src } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const rev = require("gulp-rev");
const cssnano = require("gulp-cssnano");
*/

import gulp from "gulp";
import dartSass from "sass";
import gulpsass from "gulp-sass";
const sass = gulpsass(dartSass);
import rev from "gulp-rev";
import cssnano from "gulp-cssnano";
import uglify from "gulp-uglify";
import minifyCSS from "gulp-minify-css";
import imagemin from "gulp-imagemin";
import { deleteAsync } from "del";

gulp.task("css", function (done) {
  console.log("minifying css...");
  gulp
    .src("./assets/sass/**/*.scss") //changed
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css")); //changed

  gulp
    .src("./assets/**/*.css") //changed
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets")) //changed
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets")); //changed
  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...");
  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", function (done) {
  console.log("minifying images...");
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

// empty the public/assets driectory
gulp.task("clean:assets", function (done) {
  deleteAsync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("Building assets");
    done();
  }
);