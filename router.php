<?php

//sleep(1);

class Router
{
    const BASE_URL = 'https://realty-back';

//    static $codes = [
//        100 => 'Continue',
//        101 => 'Switching Protocols',
//        102 => 'Processing',
//        200 => 'OK',
//        201 => 'Created',
//        202 => 'Accepted',
//        203 => 'Non-Authoritative Information',
//        204 => 'No Content',
//        205 => 'Reset Content',
//        206 => 'Partial Content',
//        207 => 'Multi-Status',
//        300 => 'Multiple Choices',
//        301 => 'Moved Permanently',
//        302 => 'Found',
//        303 => 'See Other',
//        304 => 'Not Modified',
//        305 => 'Use Proxy',
//        306 => 'Switch Proxy',
//        307 => 'Temporary Redirect',
//        400 => 'Bad Request',
//        401 => 'Unauthorized',
//        402 => 'Payment Required',
//        403 => 'Forbidden',
//        404 => 'Not Found',
//        405 => 'Method Not Allowed',
//        406 => 'Not Acceptable',
//        407 => 'Proxy Authentication Required',
//        408 => 'Request Timeout',
//        409 => 'Conflict',
//        410 => 'Gone',
//        411 => 'Length Required',
//        412 => 'Precondition Failed',
//        413 => 'Request Entity Too Large',
//        414 => 'Request-URI Too Long',
//        415 => 'Unsupported Media Type',
//        416 => 'Requested Range Not Satisfiable',
//        417 => 'Expectation Failed',
//        418 => 'I\'m a teapot',
//        422 => 'Unprocessable Entity',
//        423 => 'Locked',
//        424 => 'Failed Dependency',
//        425 => 'Unordered Collection',
//        426 => 'Upgrade Required',
//        449 => 'Retry With',
//        450 => 'Blocked by Windows Parental Controls',
//        500 => 'Internal Server Error',
//        501 => 'Not Implemented',
//        502 => 'Bad Gateway',
//        503 => 'Service Unavailable',
//        504 => 'Gateway Timeout',
//        505 => 'HTTP Version Not Supported',
//        506 => 'Variant Also Negotiates',
//        507 => 'Insufficient Storage',
//        509 => 'Bandwidth Limit Exceeded',
//        510 => 'Not Extended'
//    ];

    private static $routes = [
        'oauth/token' => [
            'url' => '/oauth/token',
            'method' => 'POST',
            'post' => ['username', 'password', 'grant_type', 'client_id', 'scope', 'client_secret'],
            'get' => [],
            'headers' => []
        ],
        'api/currencies' => [
            'url' => '/api/currencies',
            'method' => 'GET',
            'post' => [],
            'get' => [],
            'headers' => []
        ],
        'api/card_categories' => [
            'url' => '/api/card_categories',
            'method' => 'GET',
            'post' => [],
            'get' => [],
            'headers' => []
        ],
        'api/user_profile' => [
            'url' => '/api/user_profile',
            'method' => 'GET',
            'post' => [],
            'get' => [],
            'headers' => []
        ],
        'api/user/1' => [
            'url' => '/api/user/1',
            'method' => 'PUT',
            'post' => [],
            'get' => [],
            'headers' => []
        ],
    ];

    private $response;
    private $status;

    function __construct($url)
    {

        if (!isset(self::$routes[$url])) {
            throw new Exception('Invalid URL');
        }

        if (isset(self::$routes[$url]['post'])) {
            foreach (self::$routes[$url]['post'] as $k => $v) {
                self::$routes[$url]['post'][$v] = $_POST[$v];
                unset(self::$routes[$url]['post'][$k]);
            }
        }

        if (isset(self::$routes[$url]['get'])) {
            foreach (self::$routes[$url]['get'] as $k) {
                self::$routes[$url]['get'][$k] = $_GET[$k];
            }
        }

        $remote_url = sprintf(
            '%s%s',
            self::BASE_URL,
            self::$routes[$url]['url']
        );

        if (isset(self::$routes[$url]['get']) && !empty(self::$routes[$url]['get'])) {
            $remote_url = sprintf(
                "%s?%s",
                $remote_url,
                http_build_query(self::$routes[$url]['get'])
            );
        }

        $curl_opts = [
            CURLOPT_URL => $remote_url,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0
        ];

        if (isset(self::$routes[$url]['headers']) && !empty(self::$routes[$url]['headers'])) {
            $curl_opts[CURLOPT_HEADER] = self::$routes[$url]['headers'];
        }

        if (self::$routes[$url]['method'] === 'POST') {
            $curl_opts += [
                CURLOPT_POST => 1,
                CURLOPT_POSTFIELDS => http_build_query(self::$routes[$url]['post'])
            ];
        }

        $ch = curl_init();
        curl_setopt_array($ch, $curl_opts);
        $this->response = curl_exec($ch);
        $this->status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    }

    function response() {
        http_response_code($this->status);
        return $this->response;
    }
}


echo (new Router($_GET['__url']))->response();
