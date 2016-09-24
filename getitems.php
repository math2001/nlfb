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
	function pathjoin() {
		$path = [];
		foreach (func_get_args() as $k => $v) {
			$path[] = trim($v, '/');
		}
		return implode('/', $path);
	}
	function has_any() {
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

$CONF = [
	"base_path" => "C:/wamp/www/"
];

if (!isset($_GET['path'])) {
	die('no path specified, impossible');
	header("HTTP/1.0 404 Not Found");
}

$path = $_GET['path'];
$path = pathjoin($CONF['base_path'], $path);

function is_image($item) {
	return in_array(
		strtolower(pathinfo($item)['extension']), 
		['png', 'gif', 'bmp', 'svg', 'jpg', 'jpeg', 'ico']
	);
}

/**
* List dirs and files
* @return [...]
*/
function listdir($path) {
	if (!is_dir($path)) {
		return null;
	}
	$items = [];
	$dir = opendir($path);
	if (!$dir) {
		return false;
	}
	while (($item = readdir($dir)) !== false) {
		if (!in_array($item, ['.', '..'])) {
			$items[] = $item;
		}
	}
	return $items;
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
		if (is_dir($temp_path)) {
			
			if (isset($_GET['noticer'])) {
				if ($_GET['noticer'] == 'index') {
					$fitems['folders'][$item] = has_any('index.php', 'index.html',
					listdir($temp_path));
				}
			}

		} elseif (is_file($temp_path)) {
			$fitems['files'][$item] = is_image($item);
		} else {
			debug($temp_path);
			die('error');
		}
	}

	return $fitems;

}
header("content-type: application/json");
echo json_encode(format_items($path));


?>