<?php
require_once 'config.php';

$conn = getDBConnection();

function getRequestBody() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get all books or a specific book
        if (isset($_GET['id'])) {
            $stmt = $conn->prepare("SELECT * FROM books WHERE id = ?");
            $stmt->bind_param("i", $_GET['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $book = $result->fetch_assoc();
            
            if (!$book) {
                sendResponse(['error' => 'Book not found'], 404);
            }
            
            sendResponse($book);
        } else {
            $result = $conn->query("SELECT * FROM books ORDER BY title");
            $books = [];
            while ($row = $result->fetch_assoc()) {
                $books[] = $row;
            }
            sendResponse($books);
        }
        break;

    case 'POST':
        // Add a new book
        $data = getRequestBody();
        
        $stmt = $conn->prepare("INSERT INTO books (title, author, isbn, description, published_year, publisher, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssisii", 
            $data['title'],
            $data['author'],
            $data['isbn'],
            $data['description'],
            $data['publishedYear'],
            $data['publisher'],
            $data['copies'],
            $data['copies']
        );
        
        if ($stmt->execute()) {
            sendResponse(['id' => $conn->insert_id, 'message' => 'Book added successfully']);
        } else {
            sendResponse(['error' => 'Failed to add book'], 500);
        }
        break;

    case 'PUT':
        // Update a book
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Book ID is required'], 400);
        }

        $data = getRequestBody();
        $stmt = $conn->prepare("UPDATE books SET title = ?, author = ?, isbn = ?, description = ?, published_year = ?, publisher = ?, total_copies = ?, available_copies = ? WHERE id = ?");
        $stmt->bind_param("ssssisiii", 
            $data['title'],
            $data['author'],
            $data['isbn'],
            $data['description'],
            $data['publishedYear'],
            $data['publisher'],
            $data['totalCopies'],
            $data['availableCopies'],
            $_GET['id']
        );
        
        if ($stmt->execute()) {
            sendResponse(['message' => 'Book updated successfully']);
        } else {
            sendResponse(['error' => 'Failed to update book'], 500);
        }
        break;

    case 'DELETE':
        // Delete a book
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Book ID is required'], 400);
        }

        $stmt = $conn->prepare("DELETE FROM books WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);
        
        if ($stmt->execute()) {
            sendResponse(['message' => 'Book deleted successfully']);
        } else {
            sendResponse(['error' => 'Failed to delete book'], 500);
        }
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?> 