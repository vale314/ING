const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/administrador'));
app.use('/api/vendedor', require('./routes/vendedor'));
app.use('/api/dulce', require('./routes/dulce'));

app.get('/video',(req,res)=>{
  const path = './server/video/2019.mp4'
 
    const head = {
      'Accept-Ranges': 'bytes',
      'Content-Type': 'video/mp4',
    }
 
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
 
 })

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('/video',(req,res)=>{
    const path = './server/video/compress.mp4'
   
      const head = {
        'Accept-Ranges': 'bytes',
        'Content-Type': 'video/mp4',
      }
   
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
   
   })

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
