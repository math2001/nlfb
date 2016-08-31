var gulp = require('gulp');
var coffee = require('gulp-coffee')
var stylus = require('gulp-stylus')
var livereload = require('gulp-livereload')
var plumber = require('gulp-plumber')

gulp.task('coffee-compile', function () {
	return gulp.src('js/coffee/*.coffee')
		.pipe(plumber())
		.pipe(coffee({
			bare: true
		}))
		.pipe(gulp.dest('js'))
})
gulp.task('coffee', ['coffee-compile'], function () {
	livereload.reload()
})
gulp.task('stylus', function () {
	return gulp.src('styles/stylus/main.styl')
		.pipe(plumber())
		.pipe(stylus())
		.pipe(gulp.dest('styles'))
		.pipe(livereload())

})

gulp.task('refresh', ['coffee', 'stylus'], function () {
	livereload.changed()	
})

function reload (e) {
	livereload.changed(e.path)
}

gulp.task('atomic-reload', function () {
	livereload.reload()
})


gulp.task('watch', function () {
	livereload.listen()
	gulp.watch('js/coffee/*.coffee', ['coffee'])
	gulp.watch('styles/stylus/*.styl', ['stylus'])
	gulp.watch(['**/*.php']).on('change', function (e) {
		livereload.changed(e.path)
	})
})

gulp.task('dist', function () {
	console.log('not much');
})