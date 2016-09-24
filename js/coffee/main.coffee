$(document).ready( ->
	Hash.init(EM)
	Path.init(EM)
	new Items(Path, EM)
)