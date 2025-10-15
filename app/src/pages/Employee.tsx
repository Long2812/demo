
import { useState } from 'react'
import CameraCapture from '../components/CameraCapture'
import { savePhoto, PhotoRecord } from '../utils/db'

export default function Employee() {
  const [file, setFile] = useState<File | null>(null)
  const [area, setArea] = useState('Khu A')
  const [step, setStep] = useState('Bước 1')
  const [msg, setMsg] = useState<string | null>(null)

  function handleCaptured(f: File) {
    setFile(f)
  }
  function handleSubmit() {
    if (!file) { setMsg('Vui lòng chụp/chọn ảnh.'); return }
    const id = crypto.randomUUID()
    const url = URL.createObjectURL(file)
    const rec: PhotoRecord = {
      id, area, step, by: 'nhanvien@example.com', url, status: 'pending', createdAt: Date.now()
    }
    savePhoto(rec)
    setMsg('Đã lưu ảnh (demo lưu local). Trạng thái: pending.')
    setFile(null)
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Nhân viên: Chụp/Upload ảnh</h2>
      <div style={{ display:'grid', gap:8, maxWidth:480 }}>
        <label>Khu
          <select value={area} onChange={e=>setArea(e.target.value)}>
            <option>Khu A</option><option>Khu B</option><option>Khu C</option>
            <option>Khu D</option><option>Khu E</option><option>Khu F</option><option>Khu G</option><option>Khu H</option>
          </select>
        </label>
        <label>Bước
          <select value={step} onChange={e=>setStep(e.target.value)}>
            <option>Bước 1</option><option>Bước 2</option><option>Bước 3</option>
          </select>
        </label>
        <CameraCapture onCaptured={handleCaptured} />
        <button onClick={handleSubmit} style={{ padding:8, borderRadius:8 }}>Gửi</button>
        {msg && <p>{msg}</p>}
        <p style={{fontSize:12,opacity:.7}}>Trong bản demo: dữ liệu lưu localStorage và ảnh là objectURL; phiên bản thật sẽ upload lên Supabase Storage và ghi bản ghi DB.</p>
      </div>
    </div>
  )
}
