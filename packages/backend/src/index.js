import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/monorepo';
mongoose.connect(MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

const itemSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model('Item', itemSchema);

app.get('/api/health', (req,res)=> res.json({status:'El sitio está funcionando'}));

app.get('/api/items', async (req,res)=>{
  const items = await Item.find().sort({createdAt:-1}).limit(100);
  res.json(items);
});

app.post('/api/items', async (req,res)=>{
  const { name } = req.body;
  if(!name) return res.status(400).json({ error: 'name required' });
  const it = await Item.create({ name });
  res.status(201).json(it);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));
