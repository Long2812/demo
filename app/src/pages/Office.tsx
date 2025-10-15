
import { listPhotos, updatePhoto } from '../utils/db'
import { useEffect, useState } from 'react'

export default function Office() {
  const [items, setItems] = useState(listPhotos())
  useEffect(() => {
    const id = setInterval(() => setItems(listPhotos()), 1000)
    return () => clearInterval(id)
  }, [])

  function setStatus(id: string, status: 'approved'|'rejected') {
    const note = prompt('Ghi chú (tuỳ chọn):') || undefined
    updatePhoto(id, { status, note })
    setItems(listPhotos())
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Nhân viên văn phòng: Duyệt ảnh</h2>
      <div style={{ display:'grid', gap:12 }}>
        {items.length === 0 && <p>Chưa có ảnh.</p>}
        {items.map(p => (
          <div key={p.id} style={{ border:'1px solid #ddd', borderRadius:8, padding:8 }}>
            <div style={{ display:'flex', gap:8, alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <strong>{p.area} · {p.step}</strong>
                <div style={{ fontSize:12, opacity:.8 }}>{new Date(p.createdAt).toLocaleString()}</div>
                {p.note && <div style={{ fontSize:12, color:'#6b7280' }}>Ghi chú: {p.note}</div>}
              </div>
              <span style={{ padding:'2px 8px', borderRadius:999, background: p.status==='approved' ? '#d1fae5' : p.status==='rejected' ? '#fee2e2' : '#e5e7eb' }}>
                {p.status || 'pending'}
              </span>
            </div>
            {p.url && <img src={p.url} alt="" style={{ maxWidth:'100%', borderRadius:8, marginTop:8 }} />}
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <button onClick={()=>setStatus(p.id,'approved')}>Duyệt (xanh)</button>
              <button onClick={()=>setStatus(p.id,'rejected')}>Không đạt (đỏ)</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
