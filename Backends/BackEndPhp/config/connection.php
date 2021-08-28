<?php
    class connection {
        private $host;
        private $user;
        private $password;
        private $database;
        private $port;
        private $connection;

        private function getDataConfig () {
            $path = dirname(__FILE__);
            $jsonData = file_get_contents($path ."/config.json");
            return json_decode($jsonData, true);
        }

        function __construct() {
            $data = $this->getDataConfig();
            foreach ($data as $key => $value) {
                $this->host = $value['host'];
                $this->user = $value['user'];
                $this->password = $value['password'];
                $this->database = $value['database'];
                $this->port = $value['port'];
            }
            $this->connection = pg_connect("host=". $this->host .
                                    " port=". $this->port .
                                    " dbname=". $this->database .
                                    " user=". $this->user .
                                    " password=". $this->password);
        }

        public function getConnection () {
            return $this->connection;
        }
    }

?>