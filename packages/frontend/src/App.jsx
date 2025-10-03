import { useEffect, useState } from 'react';

export default function App(){
  const [items, setItems] = useState([]);
  const [name,setName] = useState('');
  const api = import.meta.env.VITE_API_URL || 'http://192.168.85.10:4000';

  useEffect(()=>{
    fetch(`${api}/api/items`).then(r=>r.json()).then(setItems).catch(console.error);
  },[]);

  async function handleAdd(e){
    e.preventDefault();
    if(!name) return;
    await fetch(`${api}/api/items`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name })
    }).then(r=>r.json()).then(n=> setItems(prev=>[n,...prev]));
    setName('');
  }

  return (
    <div style={{padding:20}}>
      <h1>Monorepo React + Express + MongoDB (Docker)</h1>
      <form onSubmit={handleAdd}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nuevo item" />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {items.map(it=> <li key={it._id}>{it.name} - {new Date(it.createdAt).toLocaleString()}</li>)}
      </ul>
    </div>
  )
}
