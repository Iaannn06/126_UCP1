const express = require('express');
const db = require('./models');
const app = express();
const port = 3001;

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
    const hotels = await db.Tentrem.create(req.body);
    res.status(201).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/hotel', async (_req, res) => {
  try {
    const hotels = await db.Tentrem.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Hotel' });
  }
});

app.put('/hotel/:id', async (req, res) => {
  try {
    const hotels = await db.Tentrem.findByPk(req.params.id);
    if (!hotels) return res.status(404).json({ error: 'Kamar not found' });
    await hotels.update(req.body);
    res.json({ message: 'hotel updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Hotel' });
  }
});

app.delete('/hotel/:id', async (req, res) => {
  try {
    const hotels = await db.Tentrem.findByPk(req.params.id);
    if (!hotels) return res.status(404).json({ error: 'hotel not found' });
    await hotels.destroy();
    res.json({ message: 'hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
});


