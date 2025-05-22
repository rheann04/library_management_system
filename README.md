# Library Management System

A modern web-based library management system built with Next.js and PHP/MySQL.

## Features

- User Authentication (Admin and Student roles)
- Book Management (Add, Edit, Delete, View)
- Student Management (Add, Edit, Delete, View)
- Book Borrowing System
- Dashboard with Statistics
- Responsive Design

## Tech Stack

- Frontend:
  - Next.js 13+ (React)
  - Tailwind CSS
  - JavaScript/TypeScript

- Backend:
  - PHP
  - MySQL
  - XAMPP (Local Development)

## Prerequisites

- Node.js 16+ and npm
- XAMPP (for PHP and MySQL)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Start XAMPP (Apache and MySQL)
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database named `library_management`
   - Import the `database.sql` file

4. Configure the backend:
   - Copy the `api` folder to your XAMPP's `htdocs/library_management` directory
   - Update database credentials in `api/config.php` if needed

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost/library_management/api

## Default Admin Account

- Username: admin
- Password: admin123

## Project Structure

```
library-management-system/
├── app/                    # Next.js frontend application
│   ├── admin/             # Admin dashboard and features
│   ├── components/        # Reusable React components
│   ├── services/         # API services
│   └── ...
├── api/                   # PHP backend API
│   ├── config.php        # Database configuration
│   ├── login.php         # Authentication endpoints
│   ├── books.php         # Book management endpoints
│   ├── students.php      # Student management endpoints
│   └── borrowings.php    # Book borrowing endpoints
├── public/               # Static files
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- XAMPP for the local development environment
