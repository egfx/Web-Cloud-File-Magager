<?php

include __DIR__ . '/../src/filelist.php';

try {

	$filelist = new Filelist();

    $pointer = intval($_GET['pointer']);
    $path = $filelist->getDirectoryTreeAtPointer($pointer);

    $files = $filelist->getDirectoryContents($path);

    foreach ($files as $key => $value) {
        $result[$key]['file'] = $value;
        $result[$key]['extension'] = $filelist->getFileType($value);
    }

    if (!$result) {
        throw new Exception('The result returned no object');
    }

    echo json_encode(array(
        'error' => false,
        'items' => $result,
        'index' => $pointer
    ), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);

} catch(Exception $e) {
    echo json_encode(array(
        'error' => true,
        'message' => $e->getMessage()
    ), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
}