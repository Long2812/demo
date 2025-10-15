
import { Link } from 'react-router-dom'
export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <h1>CF Photo Report (PWA Demo)</h1>
      <p>Chọn vai trò để vào luồng demo:</p>
      <ul>
        <li><Link to="/employee">Nhân viên (Chụp/Upload ảnh theo Bước)</Link></li>
        <li><Link to="/office">Nhân viên văn phòng (Duyệt xanh/đỏ + ghi chú)</Link></li>
        <li><Link to="/manager">Trưởng phòng (Bảng tổng hợp)</Link></li>
        <li><Link to="/admin">Admin (Phân quyền)</Link></li>
      </ul>
      <p style={{marginTop:24, fontSize:12}}>Demo này chạy offline cơ bản (cache tĩnh) và có thể chụp ảnh bằng camera điện thoại.</p>
    </div>
  )
}
