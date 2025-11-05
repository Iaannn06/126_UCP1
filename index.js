require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;  
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });



app.post('/hotel', async (req, res) => {
  try {
    const data = req.body;
    const hotel = await db.Tentrem.create(data);
    res.status(201).json({ message: 'Hotel created successfully', Tentrem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/hotel', async (req, res) => {
  try {
    const hotelList = await db.Tentrem.findAll();
    res.json(hotelList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/hotel/:id', async (req, res) => {
  try {
    const hotel = await db.Tentrem.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'hotel not found' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/hotel/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const hotel = await db.hotel.findByPk(id);
    if (!hotel) return res.status(404).json({ message: 'hotel not found' });

    await hotel.update(data);
    res.json({ message: 'Hotel updated successfully', komik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/Hotel/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await db.hotel.findByPk(id);
    if (!hotel) return res.status(404).json({ message: 'hotel not found' });

    await hotel.destroy();
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
