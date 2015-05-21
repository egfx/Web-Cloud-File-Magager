<?php

class Filelist {

	function __construct() {
       $this->dir = dirname(dirname(__FILE__));
   	}
	
	function getDirectoryTree(){
		$root = $this->dir;
		$iter = new RecursiveIteratorIterator(
		    new RecursiveDirectoryIterator($root, RecursiveDirectoryIterator::SKIP_DOTS),
		    RecursiveIteratorIterator::SELF_FIRST,
		    RecursiveIteratorIterator::CATCH_GET_CHILD // Ignore 'Permission denied'
		);
		$paths = array($root);
		foreach ($iter as $path => $dir) {
		    if ($dir->isDir()) {
		        $paths[] = $path;
		    }
		}
		return $paths;
	}

	function getDirectoryTreeAtPointer($pointer){
		$dirs = $this->getDirectoryTree();
		return $dirs[$pointer];
	}

	function getDirectoryContents($path){
		$files = scandir($path);
		return $files;
	}

	function getDirectoryOnly(){
		$dirs = array_filter(glob('*'), 'is_dir');
		return $dirs;
	}

	function getCurrentDir(){
		return getcwd();
	}

	function getFileType($file){

		$pathinfo = new SplFileInfo($file);
		$extension = pathinfo($pathinfo->getFilename(), PATHINFO_EXTENSION);
		
		if (is_dir($file) || is_dir($this->dir.DIRECTORY_SEPARATOR.$file)){
			return 'directory';
		} elseif (strlen(trim($extension)) > 0){
			switch ($extension){
			    case 'png':
			    case 'jpg':
			        return 'image';
			        break;
			    case 'json':
			        return 'json';
			        break;
			    case 'php':
			        return 'php';
			        break;
			    case 'js':
			    	return 'js';
			    	break;
			    case 'css':
			    	return 'css';
			    	break;
			    case 'htm':
			    case 'html':
			    	return 'html';
			    	break;
			    default:
			        return 'other';
			}
		} else {
			return 'error';
		}
	}

}