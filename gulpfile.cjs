const gulp = require("gulp");

gulp.task("watch", () => {
  return gulp.watch("./*");
});
gulp.task(
  "default",
  gulp.series("watch")
);