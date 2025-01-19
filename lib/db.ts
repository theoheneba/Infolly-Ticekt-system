import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
});

export async function createUser(email: string, password: string, name: string, role: 'admin' | 'customer') {
  const [result] = await pool.execute(
    'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
    [uuidv4(), email, password, name, role]
  );
  return result;
}

export async function getUserByEmail(email: string) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function createTicket(userId: string, subject: string, message: string) {
  const [result] = await pool.execute(
    'INSERT INTO tickets (id, user_id, subject, status) VALUES (?, ?, ?, ?)',
    [uuidv4(), userId, subject, 'open']
  );
  const ticketId = (result as any).insertId;
  await createMessage(ticketId, userId, message);
  return { id: ticketId };
}

export async function getTickets(page: number, limit: number, search?: string) {
  let query = `
    SELECT t.*, u.email as customer_email, u.name as customer_name, 
           s.id as staff_id, s.name as staff_name, s.picture_url as staff_picture
    FROM tickets t 
    JOIN users u ON t.user_id = u.id
    LEFT JOIN support_staff s ON t.assigned_to = s.id
  `;
  const params = [];

  if (search) {
    query += ' WHERE t.subject LIKE ? OR u.email LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY t.created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, (page - 1) * limit);

  const [rows] = await pool.execute(query, params);
  return rows;
}

export async function getTicketById(id: string) {
  const [rows] = await pool.execute(
    'SELECT t.*, u.email, u.name FROM tickets t JOIN users u ON t.user_id = u.id WHERE t.id = ?',
    [id]
  );
  return rows[0];
}

export async function getTicketMessages(ticketId: string) {
  const [rows] = await pool.execute(
    'SELECT m.*, u.name, u.role FROM messages m JOIN users u ON m.user_id = u.id WHERE m.ticket_id = ? ORDER BY m.created_at ASC',
    [ticketId]
  );
  return rows;
}

export async function createMessage(ticketId: string, userId: string, content: string) {
  const [result] = await pool.execute(
    'INSERT INTO messages (id, ticket_id, user_id, content) VALUES (?, ?, ?, ?)',
    [uuidv4(), ticketId, userId, content]
  );
  return result;
}

export async function closeTicket(id: string) {
  const [result] = await pool.execute(
    'UPDATE tickets SET status = "closed" WHERE id = ?',
    [id]
  );
  return result;
}

export async function getUserTickets(userId: string, page: number, limit: number) {
  const [rows] = await pool.execute(
    'SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [userId, limit, (page - 1) * limit]
  );
  return rows;
}

export async function createAttachment(messageId: string, fileName: string, filePath: string) {
  const [result] = await pool.execute(
    'INSERT INTO attachments (id, message_id, file_name, file_path) VALUES (?, ?, ?, ?)',
    [uuidv4(), messageId, fileName, filePath]
  );
  return result;
}

export async function getMessageAttachments(messageId: string) {
  const [rows] = await pool.execute(
    'SELECT * FROM attachments WHERE message_id = ?',
    [messageId]
  );
  return rows;
}

export async function createSupportStaff(name: string, email: string, pictureUrl: string) {
  const [result] = await pool.execute(
    'INSERT INTO support_staff (id, name, email, picture_url) VALUES (?, ?, ?, ?)',
    [uuidv4(), name, email, pictureUrl]
  );
  return result;
}

export async function getSupportStaff() {
  const [rows] = await pool.execute('SELECT * FROM support_staff');
  return rows;
}

export async function assignTicket(ticketId: string, staffId: string) {
  const [result] = await pool.execute(
    'UPDATE tickets SET assigned_to = ? WHERE id = ?',
    [staffId, ticketId]
  );
  return result;
}

export async function getUserTicketCount(userId: string) {
  const [result] = await pool.execute(
    'SELECT COUNT(*) as count FROM tickets WHERE user_id = ?',
    [userId]
  );
  return (result as any)[0].count;
}

export async function getTicketCount(search?: string) {
  let query = 'SELECT COUNT(*) as count FROM tickets t JOIN users u ON t.user_id = u.id';
  const params = [];

  if (search) {
    query += ' WHERE t.subject LIKE ? OR u.email LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }

  const [result] = await pool.execute(query, params);
  return (result as any)[0].count;
}

export async function createInitialAdmin() {
  // Check if admin already exists
  const existingAdmin = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    ['admin@infolly.net']
  );

  if ((existingAdmin[0] as any[]).length === 0) {
    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin@2024', 10);
    
    // Create admin user
    await pool.execute(
      'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), 'admin@infolly.net', hashedPassword, 'Admin', 'admin']
    );
    
    console.log('Initial admin user created');
  }
}

