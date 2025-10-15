
import { listPhotos } from '../utils/db'
import { useEffect, useMemo, useState } from 'react'

const AREAS = ['Khu A','Khu B','Khu C','Khu D','Khu E','Khu F','Khu G','Khu H']
const STEPS = ['Bước 1','Bước 2','Bước 3']

export default function Manager() {
  const [items, setItems] = useState(listPhotos())
  useEffect(() => {
    const id = setInterval(() => setItems(listPhotos()), 1000)
    return () => clearInterval(id)
  }, [])

  const matrix = useMemo(() => {
    // status precedence: approved > rejected > pending/none
    const map = new Map<string, string>()
    items.forEach(p => {
      const key = p.area + '|' + p.step
      const cur = map.get(key)
      const s = p.status || 'pending'
      const rank = (v:string) => v === 'approved' ? 3 : v === 'rejected' ? 2 : 1
      if (!cur || rank(s) > rank(cur)) map.set(key, s)
    })
    return map
  }, [items])

  return (
    <div style={{ padding: 16 }}>
      <h2>Trưởng phòng: Bảng tổng hợp (Khu × Bước)</h2>
      <div style={{ overflowX:'auto' }}>
        <table style={{ borderCollapse:'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ border:'1px solid #ddd', padding:8 }}>Khu/Bước</th>
              {STEPS.map(s => <th key={s} style={{ border:'1px solid #ddd', padding:8 }}>{s}</th>)}
            </tr>
          </thead>
          <tbody>
            {AREAS.map(a => (
              <tr key={a}>
                <td style={{ border:'1px solid #ddd', padding:8, whiteSpace:'nowrap' }}>{a}</td>
                {STEPS.map(s => {
                  const st = matrix.get(a+'|'+s) || ''
                  const bg = st==='approved' ? '#d1fae5' : st==='rejected' ? '#fee2e2' : st==='pending' ? '#e5e7eb' : 'transparent'
                  const text = st==='approved' ? 'xanh' : st==='rejected' ? 'đỏ' : st==='pending' ? 'chờ' : ''
                  return <td key={s} style={{ border:'1px solid #ddd', padding:8, background:bg, textAlign:'center' }}>{text}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{fontSize:12,opacity:.7, marginTop:8}}>Quy tắc hiển thị: “xanh” = approved, “đỏ” = rejected, “chờ” = pending, trống = chưa có.</p>
    </div>
  )
}
