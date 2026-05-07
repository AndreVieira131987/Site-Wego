<?php
// tracking.php

// Cabeçalhos para permitir requisições (CORS) e definir o retorno como JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Responde a requisições de preflight do navegador (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Aceita apenas requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido. Apenas POST."]);
    exit();
}

// =========================================================================
// CONFIGURAÇÕES DO BANCO DE DADOS
// Preencha com os dados do banco que você criar na hospedagem
// =========================================================================
$host = 'localhost';
$dbname = 'NOME_DO_SEU_BANCO';
$user = 'SEU_USUARIO';
$pass = 'SUA_SENHA';

try {
    // Recebe o pacote JSON enviado de forma assíncrona pelo React
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    // Validação básica: verificar se recebemos pelo menos um dos parâmetros UTM
    if (!isset($input['utm_source']) && !isset($input['utm_medium']) && !isset($input['utm_campaign'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Nenhuma UTM foi informada para registro."]);
        exit();
    }

    // Extrai as variáveis, garantindo que sejam nulas se não existirem
    $utm_source = $input['utm_source'] ?? null;
    $utm_medium = $input['utm_medium'] ?? null;
    $utm_campaign = $input['utm_campaign'] ?? null;
    $page_url = $input['page_url'] ?? null;
    
    // Captura opcional de segurança/informação extra
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;

    // Inicia a conexão PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Instrução SQL
    // Presume-se uma tabela chamada 'utm_tracking' com as colunas apropriadas.
    // A coluna de data/hora (created_at) pode ter o default CURRENT_TIMESTAMP no banco, 
    // mas estamos injetando o NOW() aqui por segurança.
    $sql = "INSERT INTO utm_tracking (utm_source, utm_medium, utm_campaign, page_url, ip_address, user_agent, created_at) 
            VALUES (:utm_source, :utm_medium, :utm_campaign, :page_url, :ip_address, :user_agent, NOW())";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':utm_source', $utm_source);
    $stmt->bindParam(':utm_medium', $utm_medium);
    $stmt->bindParam(':utm_campaign', $utm_campaign);
    $stmt->bindParam(':page_url', $page_url);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':user_agent', $user_agent);
    
    $stmt->execute();

    // Retorno de sucesso (silencioso para o usuário, mas lido pela API)
    echo json_encode(["status" => "success", "message" => "UTMs salvas com sucesso."]);

} catch (PDOException $e) {
    http_response_code(500);
    // Em produção, você pode querer omitir o erro real ($e->getMessage()) para o frontend.
    echo json_encode(["status" => "error", "message" => "Erro no banco de dados: " . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erro interno no servidor."]);
}
?>
