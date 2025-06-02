<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


session_start();

// El resto de tu código
$json = file_get_contents('php://input');
$data = json_decode($json, true);


if($data){
    $id = $data['id'];
    $contrasena = $data['contrasena'];
    
    require_once("../contacto.php");
    $obj = new contacto();
    
    // Verificar administrador
    $resultado = $obj->verificaridadminid($id);
    while ($registro = $resultado->fetch_assoc()) {
        if($id == $registro["id"] && $contrasena == $registro["contrasena"]) {
            $_SESSION['id'] = $id;
            $_SESSION['role'] = 'admin';
            echo json_encode([
                'success' => true, 
                'redirect' => '/MenuAdmin',
                'role' => 'admin'
            ]);
            exit;
        }
    }
    
    // Verificar maestro
    $resultado = $obj->verificaridmaestroid($id);
    while ($registro = $resultado->fetch_assoc()) {
        if($id == $registro["id"] && $contrasena == $registro["contrasena"]) {
            $_SESSION['id'] = $id;
            $_SESSION['role'] = 'maestro';
            echo json_encode([
                'success' => true, 
                'redirect' => '/MenuMaestro',
                'role' => 'maestro'
            ]);
            exit;
        }
    }
    
    // Verificar alumno
    $resultado = $obj->verificaridalumnoid($id);
    while ($registro = $resultado->fetch_assoc()) {
        if($id == $registro["id"] && $contrasena == $registro["contrasena"]) {
            $_SESSION['id'] = $id;
            $_SESSION['role'] = 'alumno';
            echo json_encode([
                'success' => true, 
                'redirect' => '/MenuAlumno',
                'role' => 'alumno'
            ]);
            exit;
        }
    }
    
    echo json_encode(['success' => false, 'error' => 'Credenciales inválidas']);
} else {
    echo json_encode(['success' => false, 'error' => 'Datos no recibidos']);
}
?>