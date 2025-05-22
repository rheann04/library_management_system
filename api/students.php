<?php
require_once 'config.php';

$conn = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get all students or a specific student
        if (isset($_GET['id'])) {
            $stmt = $conn->prepare("SELECT id, username, email, first_name, last_name, student_id, phone_number, created_at FROM users WHERE id = ? AND role = 'student'");
            $stmt->bind_param("i", $_GET['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $student = $result->fetch_assoc();
            
            if (!$student) {
                sendResponse(['error' => 'Student not found'], 404);
            }
            
            sendResponse($student);
        } else {
            $result = $conn->query("SELECT id, username, email, first_name, last_name, student_id, phone_number, created_at FROM users WHERE role = 'student' ORDER BY first_name");
            $students = [];
            while ($row = $result->fetch_assoc()) {
                $students[] = $row;
            }
            sendResponse($students);
        }
        break;

    case 'POST':
        // Add a new student
        $data = getRequestBody();
        
        // Check if username or email already exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ? OR student_id = ?");
        $stmt->bind_param("sss", $data['username'], $data['email'], $data['studentId']);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            sendResponse(['error' => 'Username, email, or student ID already exists'], 400);
        }
        
        // Insert new student
        $stmt = $conn->prepare("INSERT INTO users (username, password, email, role, first_name, last_name, student_id, phone_number) VALUES (?, ?, ?, 'student', ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", 
            $data['username'],
            password_hash($data['password'], PASSWORD_DEFAULT),
            $data['email'],
            $data['firstName'],
            $data['lastName'],
            $data['studentId'],
            $data['phoneNumber']
        );
        
        if ($stmt->execute()) {
            sendResponse(['id' => $conn->insert_id, 'message' => 'Student added successfully']);
        } else {
            sendResponse(['error' => 'Failed to add student'], 500);
        }
        break;

    case 'PUT':
        // Update a student
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Student ID is required'], 400);
        }

        $data = getRequestBody();
        
        // Check if username or email already exists for other students
        $stmt = $conn->prepare("SELECT id FROM users WHERE (username = ? OR email = ? OR student_id = ?) AND id != ? AND role = 'student'");
        $stmt->bind_param("sssi", $data['username'], $data['email'], $data['studentId'], $_GET['id']);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            sendResponse(['error' => 'Username, email, or student ID already exists'], 400);
        }

        $stmt = $conn->prepare("UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, student_id = ?, phone_number = ? WHERE id = ? AND role = 'student'");
        $stmt->bind_param("ssssssi", 
            $data['username'],
            $data['email'],
            $data['firstName'],
            $data['lastName'],
            $data['studentId'],
            $data['phoneNumber'],
            $_GET['id']
        );
        
        if ($stmt->execute()) {
            sendResponse(['message' => 'Student updated successfully']);
        } else {
            sendResponse(['error' => 'Failed to update student'], 500);
        }
        break;

    case 'DELETE':
        // Delete a student
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Student ID is required'], 400);
        }

        // Check if student has any active borrowings
        $stmt = $conn->prepare("SELECT id FROM borrowings WHERE user_id = ? AND status = 'Active'");
        $stmt->bind_param("i", $_GET['id']);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            sendResponse(['error' => 'Cannot delete student with active borrowings'], 400);
        }

        $stmt = $conn->prepare("DELETE FROM users WHERE id = ? AND role = 'student'");
        $stmt->bind_param("i", $_GET['id']);
        
        if ($stmt->execute()) {
            sendResponse(['message' => 'Student deleted successfully']);
        } else {
            sendResponse(['error' => 'Failed to delete student'], 500);
        }
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?> 