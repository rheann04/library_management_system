<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestBody();
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendResponse(['error' => 'Username and password are required'], 400);
    }

    $conn = getDBConnection();
    $stmt = $conn->prepare("SELECT id, username, password, role, first_name, last_name FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendResponse(['error' => 'Invalid username or password'], 401);
    }

    $user = $result->fetch_assoc();
    
    // For now, we're using a simple password comparison
    // In production, you should use password_verify() with properly hashed passwords
    if ($password === 'admin123' && $username === 'admin') {
        // Generate a simple token (in production, use a proper JWT)
        $token = base64_encode(json_encode([
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role']
        ]));
        
        sendResponse([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'role' => $user['role'],
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name']
            ]
        ]);
    } else {
        sendResponse(['error' => 'Invalid username or password'], 401);
    }
} else {
    sendResponse(['error' => 'Method not allowed'], 405);
}
?> 