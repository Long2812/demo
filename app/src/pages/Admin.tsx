
import { clearAll } from '../utils/db'

export default function Admin() {
  function reset() {
    if (confirm('Xoá toàn bộ dữ liệu demo (localStorage)?')) clearAll()
  }
  return (
    <div style={{ padding: 16 }}>
      <h2>Admin: Phân quyền (Demo)</h2>
      <p>Trong bản demo này, phân quyền đơn giản hoá và chưa kết nối Auth. Nhấn nút dưới để xoá dữ liệu demo.</p>
      <button onClick={reset}>Xoá dữ liệu demo</button>
      <p style={{fontSize:12,opacity:.7, marginTop:8}}>Bản thật sẽ dùng Auth + RLS (Supabase) để phân quyền theo vai trò.</p>
    </div>
  )
}
