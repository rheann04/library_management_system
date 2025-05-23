import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root', // <-- Set your MySQL username
  password: '', // <-- Set your MySQL password
  database: 'library_management'
};

export async function POST(request) {
  const data = await request.json();
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [result] = await connection.execute(
      `INSERT INTO books (title, author, isbn, status, description, published_year, publisher, total_copies, available_copies)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.author,
        data.isbn,
        data.status,
        data.description,
        data.publishedYear,
        data.publisher,
        data.copies,
        data.copies
      ]
    );
    await connection.end();
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    await connection.end();
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const data = await request.json();
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [result] = await connection.execute(
      `UPDATE books SET title=?, author=?, isbn=?, status=?, description=?, published_year=?, publisher=?, total_copies=?, available_copies=?
       WHERE id=?`,
      [
        data.title,
        data.author,
        data.isbn,
        data.status,
        data.description,
        data.publishedYear,
        data.publisher,
        data.copies,
        data.copies,
        data.id
      ]
    );
    await connection.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.end();
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.execute(`DELETE FROM books WHERE id=?`, [id]);
    await connection.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.end();
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 