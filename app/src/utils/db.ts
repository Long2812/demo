
export type PhotoRecord = {
  id: string
  area: string   // Khu
  step: string   // Bước
  by: string     // user id or email
  note?: string
  status?: 'approved' | 'rejected' | 'pending'
  url?: string   // objectURL in demo; in thực tế: public URL từ Storage
  createdAt: number
}

const KEY = 'cf_demo_photos_v1'

export function listPhotos(): PhotoRecord[] {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}
export function savePhoto(p: PhotoRecord) {
  const arr = listPhotos()
  arr.push(p)
  localStorage.setItem(KEY, JSON.stringify(arr))
}
export function updatePhoto(id: string, patch: Partial<PhotoRecord>) {
  const arr = listPhotos().map(x => x.id === id ? { ...x, ...patch } : x)
  localStorage.setItem(KEY, JSON.stringify(arr))
}
export function clearAll() {
  localStorage.removeItem(KEY)
}
