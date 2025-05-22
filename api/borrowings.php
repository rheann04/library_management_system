<?php
require_once 'config.php';

$conn = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get all borrowings or a specific borrowing
        if (isset($_GET['id'])) {
            $stmt = $conn->prepare("
                SELECT b.*, u.first_name, u.last_name, bk.title as book_title 
                FROM borrowings b 
                JOIN users u ON b.user_id = u.id 
                JOIN books bk ON b.book_id = bk.id 
                WHERE b.id = ?
            ");
            $stmt->bind_param("i", $_GET['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $borrowing = $result->fetch_assoc();
            
            if (!$borrowing) {
                sendResponse(['error' => 'Borrowing record not found'], 404);
            }
            
            sendResponse($borrowing);
        } else {
            $query = "
                SELECT b.*, u.first_name, u.last_name, bk.title as book_title 
                FROM borrowings b 
                JOIN users u ON b.user_id = u.id 
                JOIN books bk ON b.book_id = bk.id 
                ORDER BY b.borrow_date DESC
            ";
            
            if (isset($_GET['user_id'])) {
                $query = "
                    SELECT b.*, u.first_name, u.last_name, bk.title as book_title 
                    FROM borrowings b 
                    JOIN users u ON b.user_id = u.id 
                    JOIN books bk ON b.book_id = bk.id 
                    WHERE b.user_id = ? 
                    ORDER BY b.borrow_date DESC
                ";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $_GET['user_id']);
            } else {
                $stmt = $conn->prepare($query);
            }
            
            $stmt->execute();
            $result = $stmt->get_result();
            $borrowings = [];
            while ($row = $result->fetch_assoc()) {
                $borrowings[] = $row;
            }
            sendResponse($borrowings);
        }
        break;

    case 'POST':
        // Create a new borrowing
        $data = getRequestBody();
        
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // Check if book is available
            $stmt = $conn->prepare("SELECT available_copies FROM books WHERE id = ? FOR UPDATE");
            $stmt->bind_param("i", $data['bookId']);
            $stmt->execute();
            $result = $stmt->get_result();
            $book = $result->fetch_assoc();
            
            if (!$book || $book['available_copies'] < 1) {
                throw new Exception('Book is not available for borrowing');
            }
            
            // Check if user already has an active borrowing of this book
            $stmt = $conn->prepare("SELECT id FROM borrowings WHERE user_id = ? AND book_id = ? AND status = 'Active'");
            $stmt->bind_param("ii", $data['userId'], $data['bookId']);
            $stmt->execute();
            if ($stmt->get_result()->num_rows > 0) {
                throw new Exception('User already has an active borrowing of this book');
            }
            
            // Create borrowing record
            $stmt = $conn->prepare("INSERT INTO borrowings (book_id, user_id, due_date) VALUES (?, ?, ?)");
            $stmt->bind_param("iis", $data['bookId'], $data['userId'], $data['dueDate']);
            $stmt->execute();
            
            // Update book available copies
            $stmt = $conn->prepare("UPDATE books SET available_copies = available_copies - 1 WHERE id = ?");
            $stmt->bind_param("i", $data['bookId']);
            $stmt->execute();
            
            $conn->commit();
            sendResponse(['id' => $conn->insert_id, 'message' => 'Book borrowed successfully']);
        } catch (Exception $e) {
            $conn->rollback();
            sendResponse(['error' => $e->getMessage()], 400);
        }
        break;

    case 'PUT':
        // Return a book
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Borrowing ID is required'], 400);
        }

        $conn->begin_transaction();
        
        try {
            // Get borrowing record
            $stmt = $conn->prepare("SELECT book_id, status FROM borrowings WHERE id = ? FOR UPDATE");
            $stmt->bind_param("i", $_GET['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $borrowing = $result->fetch_assoc();
            
            if (!$borrowing) {
                throw new Exception('Borrowing record not found');
            }
            
            if ($borrowing['status'] !== 'Active') {
                throw new Exception('Book is already returned');
            }
            
            // Update borrowing record
            $stmt = $conn->prepare("UPDATE borrowings SET status = 'Returned', return_date = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->bind_param("i", $_GET['id']);
            $stmt->execute();
            
            // Update book available copies
            $stmt = $conn->prepare("UPDATE books SET available_copies = available_copies + 1 WHERE id = ?");
            $stmt->bind_param("i", $borrowing['book_id']);
            $stmt->execute();
            
            $conn->commit();
            sendResponse(['message' => 'Book returned successfully']);
        } catch (Exception $e) {
            $conn->rollback();
            sendResponse(['error' => $e->getMessage()], 400);
        }
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?> 