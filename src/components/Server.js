import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import path from 'path';
import cors from 'cors'; 
import { fileURLToPath } from 'url';

const app = express();
const port = 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5175', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'myDBuser',
  port: 4000,
  password: 'password',
  database: 'myDB'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the POST request to add a product
app.post('/add-product', (req, res) => {
  const { name, category } = req.body;
  const sql = 'INSERT INTO Products (name, category) VALUES (?, ?)';

  connection.query(sql, [name, category], (err, results) => {
    if (err) {
      console.error('Error inserting product:', err);
      res.status(500).send('Error inserting product');
      return;
    }
    res.send('Product added successfully');
  });
});

// API endpoint to fetch a single iPhone product by ID
app.get('/api/iphones/:id', (req, res) => {
  const { id } = req.params;
  console.log('Fetching product details for ID:', id);
  const sql = `
    SELECT 
      products.id, 
      products.name, 
      products.category, 
      // products.price, 
      products.price_range, 
      products.description,
      products.product_brief_description,
      products.product_img,
      products.product_link
    FROM products
    WHERE products.id = ?
  `;
  
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product details:', err);
      res.status(500).send('Error fetching product details');
      return;
    }
    if (results.length === 0) {
      console.log('Product not found for ID:', id);
      res.status(404).send('Product not found');
      return;
    }
    console.log('Fetched product details:', results[0]);
    res.json(results[0]);
  });
});

// API endpoint to fetch all iPhone products
app.get('/api/iphones', (req, res) => {
  const sql = `
    SELECT 
      products.id, 
      products.name, 
      products.category, 
      products.price, 
      products.price_range, 
      products.description,
      products.product_brief_description,
      products.product_img,
      products.product_link
    FROM products
    WHERE products.category = 'iPhone'
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
