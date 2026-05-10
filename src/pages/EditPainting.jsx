import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './EditPainting.css'

export default function EditPainting() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { paintings, setPaintings } = useApp()
  const painting = state?.painting

  const [form, setForm] = useState({
    title: painting?.title || '',
    description: painting?.description || '',
    style: painting?.style || '',
    theme: painting?.theme || '',
  })

  const handleSave = () => {
    setPaintings(prev =>
      prev.map(p => p.id === painting.id ? { ...p, ...form } : p)
    )
    navigate(-1)
  }

  return (
    <div className="post-page">
      <h1>Edit Artwork</h1>
      <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <select value={form.style} onChange={e => setForm({...form, style: e.target.value})}>
        <option value="">Select Style</option>
        <option value="watercolor">Watercolor</option>
        <option value="digital">Digital</option>
        <option value="oil">Oil</option>
        <option value="sketch">Sketch</option>
      </select>
      <select value={form.theme} onChange={e => setForm({...form, theme: e.target.value})}>
        <option value="">Select Theme</option>
        <option value="nature">Nature</option>
        <option value="urban">Urban</option>
        <option value="portrait">Portrait</option>
        <option value="abstract">Abstract</option>
      </select>
      <div className="btn-row">
        <button className="btn-save" onClick={handleSave}>Save Changes</button>
        <button className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}