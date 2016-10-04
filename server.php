<?php // global functions
	function debug() {
		foreach (func_get_args() as $k => $v) {
			if ($v === true) {
				$v = 'True';
			} elseif ($v === false) {
				$v = 'False';
			} elseif ($v === null) {
				$v = 'None';
			}
			echo "<pre>".print_r($v, true)."</pre>"; 
		}
	}
	function kill() {
		call_user_func_array('debug', func_get_args());
		echo '<p style="color: white; background-color: red">kill</p>';
		die();
	}	
	function pathjoin() {
		$path = [];
		foreach (func_get_args() as $k => $v) {
			$path[] = trim(trim($v, '/'), DIRECTORY_SEPARATOR);
		}
		return implode(DIRECTORY_SEPARATOR, $path);
	}
	function hasAny() {
		$args = func_get_args();
		$arr = $args[sizeof($args) - 1];
		foreach (array_slice($args, 0, sizeof($args) - 1) as $k => $v) {
			if (in_array($v, $arr)) {
				return true;
			}
		}
		return false;
	}

	function is_ajax() {
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']); 
	}

?>
<?php
// $time = microtime(true);
$CONF = [
	"base_path" => dirname(dirname(__file__))
];

if (isset($_GET['getconfig']) AND $_GET['getconfig'] == 'yes') {
	header('content-type: application/json');
	if (is_file('config.json')) {
		die(file_get_contents('config.json'));
	}
	die('{}');
}


if (!isset($_GET['path'])) {
	die('no path specified, impossible');
	header("HTTP/1.0 404 Not Found");
}

$path = $_GET['path'];
$path = pathjoin($CONF['base_path'], $path);

function is_image($item) {
	$pathinfo = pathinfo($item);
	return array_key_exists('extension', $pathinfo) and in_array(
		strtolower($pathinfo['extension']), 
		['png', 'gif', 'bmp', 'svg', 'jpg', 'jpeg', 'ico']
	);
}

function listdir($path) {
	$items = [];
	$dir = opendir(utf8_decode($path));
	if (!$dir) {
		return false;
	}
	while (($item = readdir($dir)) !== false) {
		if (!in_array($item, ['.', '..'])) {
			$items[] = utf8_encode($item);
		}
	}
	return $items;
}

function hasFolder($path) {
	$items = listdir($path);
	foreach ($items as $k => $v) {
		if (is_dir(pathjoin($path, $v))) {
			return true;
		}
	}
	return false;
}

function indexNoticer($items) {
	foreach ($items as $k => $item) {
		$pi = pathinfo($item);
		if ($pi['filename'] == 'screenshot') {
			return $pi['extension'];
		}
	}
	return hasAny('index.php', 'index.html', $items);
}

function format_items($path) {

	

	$fitems = [
		'files' => [],
		'folders' => [],
	];


	$items = listdir($path);

	$temp_path = null;

	foreach ($items as $k => $item) {
		$temp_path = pathjoin($path, $item);
		$temp_path_decode = utf8_decode($temp_path);
		if (is_dir($temp_path_decode)) {
			

			if (isset($_GET['noticer'])) {
				if ($_GET['noticer'] == 'index') {
					$fitems['folders'][$item] = indexNoticer(listdir($temp_path));
				} elseif ($_GET['noticer'] == 'hasFolder') {
					$fitems['folders'][$item] = hasFolder($temp_path);
				} else {
					$fitems['folders'][$item] = null;
				}
			}

		} elseif (is_file($temp_path_decode)) {			
			$fitems['files'][$item] = is_image($item);
		} else {
			die("is not a file! $temp_path_decode");
			// debug($temp_path);
			// header('HTTP/1.0 404 Not Found');
			// header('content-type: text/html');
			// die('error, this is not a dir or a file');
		}
	}
	if (isset($_GET['filter']) AND $_GET['filter'] == 'folders') {
		unset($fitems['files']);
	}
	return $fitems;

}
if (is_dir(utf8_decode($path))) {
	echo json_encode(format_items($path), (is_ajax() ? 0 : JSON_PRETTY_PRINT));
	header("content-type: application/json");
} elseif (is_file(utf8_decode($path))) {
	if (is_image($path)) {
		header('content-type: image/png'); // png/jpg/whatever does not matter,
	} else {
		header('content-type: text/plain');
	}
	echo utf8_encode(file_get_contents(utf8_decode($path)));
} else {
	header('HTTP/1.0 404 Not Found');
	if (is_ajax()) {
		echo "The path '$path' does not exists!";
	} else {
		echo("The path <code>$path</code> does not exists!");
	}
	die();
}

?>
