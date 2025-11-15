<?php

$filter = "firstName";
$search = "";

$courses = [];
$filters = array(
"fname",
"lname",
"grade",
);

if (isset($_GET["search"])){
	
	// Decode json file	
	$newContents = json_decode(file_get_contents("tutorprofiles.json"), true);

	$search = $_GET["search"];
	//$filter = $_GET["filter"];	
	
	
	// Sort list alphabetically: IMPLIMENT THIS IN UPLOADING LATER
	
	for($i = 0; $i < count($filters); $i++){
	
	$filter = $filters[$i];
	
		usort($newContents , function($a, $b) {
			
			global $filter;	

			if ($a[$filter] > $b[$filter]) {
				return 1;
			} else {
				return -1;
			}
		});

		// Binary search - https://www.geeksforgeeks.org/binary-search/
		
		$l = 0; // lowest to check
		$r = count($newContents) - 1; // highest to check
		$searchLength = strlen($search);
		
		$found = false;
		
		// There may be multiple people with the same name, or there is no good results, so multiple people may be returned

		$list = array();
		
		$preciseSearch = true;
		
		$return = false;
		
		while ($l <= $r && $return == false)  {

			$m = $l + (int)(($r - $l) / 2); // Find Middle
				
								   // Use substr so that if the user searches with an incomplete name, it will still find it
			$res = strcmp($search, substr($newContents[$m][$filter], 0, $searchLength));
			

			// Check if x is present at mid
			if ($res == 0) {
					
			// found a match for the precise first name, check if there are any duplicate names
			$list[] = $newContents[$m];
			$return = true;
					
				// check up
				for ($i = $m - 1; true; $i--) {

					if($i < 0){
						break;
					}else if ( strcmp($search, substr($newContents[$i][$filter], 0, $searchLength))== 0 ){
						$list[] = $newContents[$i];
					}else{
						break;
					}
				}
					
				// check down
				for ($i = $m + 1; $i < count($newContents); $i++) {

					if ( strcmp($search, substr($newContents[$i][$filter], 0, $searchLength)) == 0 ){
						$list[] = $newContents[$i];
					}else{
						break;
					}
				}
			}

				// If x greater, ignore left half
				if ($res > 0) {
				$l = $m + 1;
			}
			
				// If x is smaller, ignore right half
				else {
				$r = $m - 1;
			}
		}
	}

	if(empty($list)){
			
		$result = array("No Apples");
		echo json_encode($result);
		return;
			
	}else{
		echo json_encode($list);
	}
		
	return;

	//echo $_GET["search"];

	$result = array("No Apples");
	echo json_encode($result);
	return;
	
}


?>


/*if($filter == "canTutor") {

		for($i = 0; $i < count($newContents) ; $i++){
			for($v = 0; $v < count($newContents[$i]["courses"]); $v++){
				$courses[$newContents[$i]["courses"][$v]][] = $i;
			}
		}
		
		if(empty($courses[$search])){
			$result = array("No Apples");
			echo json_encode($result);
			return;
		}

		$list = [];

		for($i = 0; $i < count($courses[$search]); $i++) {
			$list[] = $newContents[$courses[$search][$i]];
		}

		echo json_encode($list);
		return;
		
	}else{
	
}*/