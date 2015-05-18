<?php

require_once __DIR__ . '/../src/filelist.php';

class myTest extends PHPUnit_Framework_TestCase {

	function setup(){
		$this->filelist = new Filelist();
	}

	/** @test */
	function testGetFullTreeFromCloutFileMgrRoot(){
		
		$dirs = $this->filelist->getDirectoryTree();

		for ($i=0; $i < count($dirs); $i++) { 
			$this->assertContains('CloutFileMgr',  $dirs[$i], 'you are not in the clout file manager directory!');	
		}

		$dirCount = count($dirs);

		$this->assertGreaterThan(0, $dirCount, 'directory contents not found!');

		// cleanup
		unset($this->filelist);
	}

	/** @test */
	function testCloutFileMgrDirectoryContentsFromRoot(){
		$dir = dirname(dirname(__FILE__));
		$files = $this->filelist->getDirectoryContents($dir);

		$result = count($files);

		$this->assertGreaterThan(0, $result, 'directory contents not found!');

		// cleanup
		unset($this->filelist);
	}

	/** @test */
	function testGetFullTreeFromRandomPointer(){

		$dirs = $this->filelist->getDirectoryTree();

		try {
			$countlimit = count($dirs)-1;
			$num = rand(0, $countlimit);
			$tree = $this->filelist->getDirectoryTreeAtPointer($num);
			$this->assertTrue(TRUE);
			//fwrite(STDERR, print_r($tree, TRUE));
		} catch(Exception $e){
			$this->assertFalse(TRUE, $e);
		}

		// cleanup
		unset($this->filelist);
	}

	/** @test */
	function testGetContentsFromRandomPointer(){

		$dirs = $this->filelist->getDirectoryTree();

		try {
			$countlimit = count($dirs)-1;
			$num = rand(0, $countlimit);
			$tree = $this->filelist->getDirectoryTreeAtPointer($num);
			$contents = $this->filelist->getDirectoryContents($tree);
			$this->assertTrue(TRUE);
			//fwrite(STDERR, print_r([$tree, $contents], TRUE));
		} catch(Exception $e){
			$this->assertFalse(TRUE, $e);
		}

		// cleanup
		unset($this->filelist);
	}

	/** @test */
	function testGetFileContentType(){

		$structureRoot = "\\mixedbag\\";
		$structure = "\\mixedbag\\somedir\\";
		if(!is_dir($structureRoot)){
			mkdir($structure, 0777, true);
		}

		$mockfiles = ['sunshine.jpg', 'socket.php', 'settings.json', 'effects.js', 'page.html', 'somedir', '.', '..'];
		$mocktypes = ['jpg', 'php', 'json', 'js', 'html'];

		foreach ($mockfiles as $key => $file_name){
			// test for directories
			if($this->filelist->getFileType($file_name) == 'directory' || $this->filelist->getFileType($structureRoot.$file_name) == 'directory'){
				$this->assertTrue(TRUE);
			} else {
			// test for files
				$fp = fopen($structure.$file_name,'w');
				fwrite($fp, '');
				fclose($fp);
				$this->assertTrue(in_array($this->filelist->getFileType($file_name), $mocktypes));
			}
		}

		// cleanup
		clearstatcache();
		unset($this->filelist);
	}

}