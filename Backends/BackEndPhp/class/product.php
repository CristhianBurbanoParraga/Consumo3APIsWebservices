<?php
    require 'config/connection.php';

    class product extends connection {

        public function getAllProducts () {
            $query = "SELECT * FROM product;";
            $con = parent::getConnection();
            $rs = array();
            $result = pg_query($con, $query);
            if ($result) {
                while ($row = pg_fetch_assoc($result)) {
                    $rs[] = $row;
                }
            } else {
                $rs = array('error' => "Error: No pudo buscar datos");
            }
            pg_close($con);
            return json_encode($rs);
        }

        public function getProductById ($id) {
            $query = "SELECT * FROM product WHERE id = ". $id .";";
            $con = parent::getConnection();
            $rs = null;
            $result = pg_query($con, $query);
            if ($result) {
                $rs = pg_fetch_assoc($result);
            } else {
                $rs = array('error' => "Error: No pudo buscar datos");
            }
            pg_close($con);
            return json_encode($rs);
        }

        public function insertProduct ($json) {
            $data = json_decode($json, true);
            $con = parent::getConnection();
            $result = array();
            $rs = pg_insert($con, "product", array('name' => $data['name'], 
                                        'price' => $data['price'], 
                                        'description' => $data['description']));
            if ($rs) {
                $result = array('name' => $data['name'], 
                                'price' => $data['price'], 
                                'description' => $data['description']);
            } else {
                $result = array('error' => "Error: no inserto");
            }
            pg_close($con);
            return json_encode($result);
        }

        public function updateProduct ($json, $id) {
            $data = json_decode($json, true);
            $con = parent::getConnection();
            $result = array();
            $rs = pg_update($con, "product", array('name' => $data['name'], 
                                                    'price' => $data['price'], 
                                                    'description' => $data['description']), 
                                                    array('id' => $id));
            if ($rs) {
               $result = array('id' => $id, 
                                'name' => $data['name'], 
                                'price' => $data['price'], 
                                'description' => $data['description']);
            } else {
                $result = array('error' => "Error no inserto");
            }
            pg_close($con);
            return json_encode($result);
        }

        public function deleteProduct ($id) {
            $con = parent::getConnection();
            $result = array();
            $rs = pg_delete($con, "product", 
                                    array('id' => $id));
            if ($rs) {
               $result = array('id' => $id);
            } else {
                $result = array('error' => "Error no inserto");
            }
            pg_close($con);
            return json_encode($result);
        }
    }
?>