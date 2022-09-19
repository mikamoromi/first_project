<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru','PHPMailer-6.6.4/language/phpmailer.lang-ru.php');
$mail->isHTML(true);

//От кого письмо
$mail->setFrom('mihaspb17@gmail.com', 'Здравсвуйте!');
//Кому отправить
$mail->addAddress('monumentoo@yandex.ru'); 
//Тема письма
$mail->Subject = 'Here is the subject';

//Тело письма 
$body = '<h1>Hello</h1>';

if(trim(!empty($_POST['name']))) {
	$body.='<p><strong>Имя: </strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
	$body.='<p><strong>E-mail: </strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))){
	$body.='<p><strong>Cooбщeниe: </strong> '.$_POST['message'].'</p>';
}

if(!$mail->send()) {
	$message = 'Ошибка';
}else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>