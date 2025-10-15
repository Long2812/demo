
import { useState } from 'react'

type Props = {
  onCaptured: (file: File) => void
}

export default function CameraCapture({ onCaptured }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // Simple size limit: 1.5MB
    if (file.size > 1.5 * 1024 * 1024) {
      setError('Ảnh vượt quá 1.5MB, vui lòng chọn ảnh nhỏ hơn.')
      return
    }
    setError(null)
    const url = URL.createObjectURL(file)
    setPreview(url)
    onCaptured(file)
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
      />
      {error && <p style={{color:'red'}}>{error}</p>}
      {preview && (
        <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
      )}
    </div>
  )
}
