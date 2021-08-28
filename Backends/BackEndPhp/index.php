<?php
    require "class/product.php"; 
    $prod = new product;
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
    switch($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) { 
                header("Content-Type: application/json");
                echo $prod->getProductById($_GET['id']);
                http_response_code(200);
            } else {
                header("Content-Type: application/json");
                echo $prod->getAllProducts();
                http_response_code(200);
            }
            break;
        case 'POST':
            $postData = file_get_contents('php://input');
            header("Content-Type: application/json");
            echo $prod->insertProduct($postData);
            http_response_code(200);
            break;
        case 'PUT':
            if (isset($_GET['id'])) { 
                $putData = file_get_contents('php://input');
                header("Content-Type: application/json");
                echo $prod->updateProduct($putData, $_GET['id']);
                http_response_code(200);
            } else {
                header("Content-Type: application/json");
                echo json_encode(array('Error' => 'Especifique el id'));
                http_response_code(400);
            }
            break;
        case 'DELETE':
            if (isset($_GET['id'])) { 
                header("Content-Type: application/json");
                echo $prod->deleteProduct($_GET['id']);
                http_response_code(200);
            } else {
                header("Content-Type: application/json");
                echo json_encode(array('Error' => 'Especifique el id'));
                http_response_code(400);
            }
            break;
    }

?>