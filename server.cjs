const express = require('express');
const { generateRandomRobot } = require('./src/utils/robotGenerator.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/ai', (req, res) => {
  try {
    const robotDescription = generateRandomRobot();
    
    // Simulate AI image generation (replace with actual AI integration later)
    const imageUrl = `https://source.unsplash.com/random/400x400?robot&${Date.now()}`;

    res.json({
      success: true,
      data: {
        description: robotDescription,
        imageUrl: imageUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred while generating the robot'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});