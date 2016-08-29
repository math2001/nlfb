<?php


function debug() {
	$args = [];
	foreach (func_get_args() as $k => $v) {
		if (is_bool($v)) {
			$args[] = $v ? 'true' : 'false';
		} else {
			$args[] = print_r($v, true);
		}
	}
	echo '<pre>'.print_r(implode(' ', $args), true).'</pre>';
}

function quote($el) {
	return '"'.$el.'"'; 
}

function is_ajax() {
	return true or isset($_SERVER['HTTP_X_REQUESTED_WITH']); 
}

function array_default_value(&$arr, $key, $val) {
	if (!array_key_exists($key, $arr) or $arr[$key] == '') {
		$arr[$key] = $val;
	}
	return $arr;
}

function puts() {
	foreach (func_get_args() as $k => $v) {
		echo debug($v);
	}
}


function pre() {
	echo "<pre>"; 
}

function path_join() {
	return implode(DIRECTORY_SEPARATOR, func_get_args()); 
}

function is_not_in() {
	$val = func_get_arg(0);
	$args = array_slice(func_get_args(), 1);
	foreach ($args as $k => $v) {
		if ($v == $val) {
			return false;
		}
	}
	return true;
}

function listdir($path) {
	if (is_dir($path)) {
		$items = [
			"dirs" => [],
			"files" => [],
			"errors" => []
		];
		if ($handle = opendir($path)) {
		    while (false !== ($entry = readdir($handle))) {
		    	if (is_dir(path_join($path, $entry))) {
		    		if (is_not_in($entry, '.', '..')) {
			    		$items['dirs'][] = $entry;
		    		}
		    	} elseif (is_file(path_join($path, $entry))) {
		    		$items['files'][] = $entry;
		    	} else {
		    		$items['errors'][] = $entry;
		    	}
		    }

		    closedir($handle);
		}
		return $items;
	} elseif (is_file($path)) {
		$text = file_get_contents($path);
		if (
			in_array('extension', array_keys($pathinfo = pathinfo($path))) AND
			in_array(strtolower($pathinfo['extension']), ['jpg', 'png', 'bmp', 'jpeg', 'gif', 'ico', 'svg']
		)) {
			header('content-type: image/png');
			return $path;
		} elseif ($text == '') {
			return 'EMPTY';
		} else {
			return htmlspecialchars($text);
		}
	} else {
		return "Error: what the hell?! \"$path\"";
	}
}

function has_dirs($path) {
	if ($handle = opendir($path)) {
		while (false !== ($entry = readdir($handle))) {
			if (is_dir(path_join($path, $entry)) and !in_array($entry, ['.', '..'])) {
				return true;
			}
		}

		closedir($handle);
	}
	return false;
}

function list_dirs_with_dirs_in($path) {
	if (!is_dir($path)) {
		return 'it is not a dir';
	}
	$dirs = [];
	if ($handle = opendir($path)) {
		while (false !== ($entry = readdir($handle))) {
			if (is_dir(path_join($path, $entry)) and !in_array($entry, ['.', '..'])) {
				$dirs[$entry] = has_dirs(path_join($path, $entry));
			}
		}

		closedir($handle);
	}
	return $dirs;
}

if (!is_ajax()) {
	echo "<a href='/'>Localhost</a>";
}

array_default_value($_GET, 'path', './');
array_default_value($_GET, 'forsidebar', 'no');

$_GET['path'] = '../'.$_GET['path'];

$items = listdir($_GET['path']);

// for the side bar

if ($_GET['forsidebar'] == 'yes') {
	$items = list_dirs_with_dirs_in($_GET['path']);
	header('content-type: application/json');
	die(json_encode($items));
}

// for the normal navigation

if (is_array($items)) {
	header('content-type: application/json');
	$json = json_encode($items);
} else {
	$json = $items;
}

die($json);
?>