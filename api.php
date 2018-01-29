<?php
header('Content-Type: application/json');

$t=json_encode($_POST);
$tt=json_decode($t);
$tt = $tt->{'data'};
$tt=json_decode($tt);

$out = array(
    'html' => $_SERVER['REQUEST_METHOD'],
    'task' => $tt,
    'sql'=>$tt->{'task'},
    'utf8' => 'false'
);
if ($tt->{'task'}) {
    $con = mysqli_connect('localhost','root','SQLr00T','web_freelancer');
    if (mysqli_set_charset($con, "utf8")) {
        $tt->{'utf8'} = "ok";
        $out['utf8']  = "ok";
    }
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }
    if ($tt->{'task'} == 'get_categories') {
        $sql = "SELECT * FROM  `categories`";
        $result = mysqli_query($con, $sql);
        $tt->sql= $result->num_rows;
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            $tt->{'sql'} = json_encode($myArray);
            $out['sql'] =  json_encode($myArray);
        }
    }
}

echo json_encode($out);