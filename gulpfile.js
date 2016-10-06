var gulp       = require('gulp'),
	coffee     = require('gulp-coffee'),
	stylus     = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	plumber    = require('gulp-plumber')

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


gulp.task('heavy-watcher', function () {
	// reload a lot
	livereload.listen()
	gulp.watch('js/coffee/*.coffee', ['coffee'])
	gulp.watch('styles/stylus/*.styl', ['stylus'])
	gulp.watch(['**/*.php']).on('change', function (e) {
		livereload.changed(e.path)
	})
})

gulp.task('lw', function () {
	// reload only on STYLE change
	livereload.listen()
	gulp.watch('js/coffee/*.coffee', ['coffee-compile'])
	gulp.watch('styles/stylus/*.styl', ['stylus']) // reload
})

gulp.task('dist', function () {
	console.log('not much');
})