<?php
header('Content-Type: application/json');

session_start();
$session_id = session_id();

require_once './mail/lib/swift_required.php';
$t=json_encode($_POST);
$tt=json_decode($t);
$tt = $tt->{'data'};
$tt=json_decode($tt);<?php
session_start();
$session_id = session_id();

require_once './lib/swift_required.php';

$out = array(
    'html' => $_SERVER['REQUEST_METHOD'],
    'task' => $tt,
    'sql'=>$tt->{'task'},
    'utf8' => 'false',
    'status' => 'false',
    'msg' => ''
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
    //регистрация
    if ($tt->{'task'} == 'registration') {
        $sql = "SELECT * FROM `user` where mail=='.$tt->{'login'}.'";
        $result = mysqli_query($con, $sql);
        $tt->sql= $result->num_rows;
        if ($result->num_rows = 0) {
            $sql = "INSERT INTO `web_freelancer`.`user`  ( `mail`, `datatime`, `password`, `validation`, `validation`  )VALUES ( '" . $tt->{'login'} . "', NOW(),  PASSWORD('" . $tt->{'password'} . "'), '0', '".$session_id."' );";
            $result = mysqli_query($con,$sql);
            $index = $con->insert_id;
            if (!$index) {
                $out['status']="false";
            } else {
                $out['status']="true";
                $tomail = $tt->{'login'};
                $transport = Swift_SmtpTransport::newInstance('ssl://smtp.gmail.com', 465)
                    ->setUsername('freelance@kolesnikdenis.com')
                    ->setPassword('freelance321');
                $mailer = Swift_Mailer::newInstance($transport);

                $message = Swift_Message::newInstance('hello from geo freelance')
                    ->setFrom(array('freelance@kolesnikdenis.com' => 'geo freelance')) // can be $_POST['email'] etc...
                    ->setTo(array($tomail => 'Hellow new user')) // your email / multiple supported.
                    ->setBody('Here is the <strong>message</strong> <br> tyt budet ssilka validacii i t.d. :D <br> <h1> session id:'.$session_id.'</h1>', 'text/html');

                if ($mailer->send($message)) {
                    $out['msg']='Вам отправлено письмо с верификацией email';
                } else {
                    $out['msg']='произошла страшная ошибка';
                    $sql="UPDATE `web_freelancer`.`user` SET `validation` = '1' WHERE `user`.`id` = ".$add_id_user;
                    if ($con->query($sql) === TRUE) {
                        $out['msg']='мы вас добавили в базу но по какой то причине не смоги отправить вам письмо с вирификацией и по этой причине ваш акаунт активируется без верификации mail...';
                    }
                }

            }
        }else {
            $out['status']="false";
            $out['msg']='уже существует';
        }
    }
    //валидация mail
    if ($tt->{'task'} == 'email_verification') {
        $tomail = $tt->{'login'};
        $session= $tt->{'session_id'};
        $sql="UPDATE `web_freelancer`.`user` SET `validation` = '1' WHERE `user`.`mail` = ".$tomail ." and validation = '".$session."'";
        $result = mysqli_query($con,$sql);
        $index = $con->insert_id;
        if ($index <=0 ) {
            $out['status']="false";
        } else {
            $out['status']="true";
        }
    }
    //получение категорий
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