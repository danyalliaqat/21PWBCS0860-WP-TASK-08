const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in request body
app.use(express.json());


// ReadFile Endpoint
app.get('/readFile', async (req, res) => {
  try {
    const content = await fs.readFile('textfile.txt', 'utf-8');
    res.status(200).send(content);
  } catch (error) {
    res.status(404).send({ error: 'File not found' });
  }
});

// WriteFile Endpoint
app.post('/writeFile', async (req, res) => {
  const data = req.body.data;

  if (!data) {
    return res.status(400).send({ error: 'No data provided in the request body' });
  }

  try {
    await fs.writeFile('textfile.txt', data, 'utf-8');
    res.status(201).send({ message: 'File written successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// UpdateFile Endpoint
app.put('/updateFile', async (req, res) => {
  const newData = req.body.data;

  if (!newData) {
    return res.status(400).send({ error: 'No new data provided in the request body' });
  }

  try {
    // Read existing content
    let existingContent = await fs.readFile('textfile.txt', 'utf-8');

    // Append new data to the next line
    existingContent += '\n' + newData;

    // Write back to the file
    await fs.writeFile('textfile.txt', existingContent, 'utf-8');

    res.status(200).send({ message: 'File updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
