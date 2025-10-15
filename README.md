
# CF Photo Report (PWA Demo)

Demo PWA cho quy trình chụp ảnh báo cáo công việc: Nhân viên chụp/đẩy ảnh theo **Khu × Bước**, Văn phòng **duyệt xanh/đỏ + ghi chú**, Trưởng phòng xem **bảng tổng hợp**.

## Tính năng
- PWA offline cơ bản (cache tĩnh) + chạy tốt trên trình duyệt di động
- Chụp/chọn ảnh bằng `<input accept="image/*" capture="environment">`
- Luồng vai trò: Employee / Office / Manager / Admin
- Lưu demo: `localStorage`; Ảnh dùng `objectURL`
- Sẵn sàng tích hợp **Supabase** (Auth, DB, Storage) cho bản thật

## Chạy cục bộ
```bash
cd app
npm i
npm run dev
```

## Build & Deploy GitHub Pages
1. Push repo lên GitHub.
2. Bật **Pages**: Settings → Pages → Source: *GitHub Actions*.
3. Workflow trong `.github/workflows/pages.yml` sẽ build & deploy tự động.

## Tích hợp Supabase (tùy chọn)
- Tạo project Supabase, copy `URL` và `anon key` vào `.env` (xem `.env.example`)
- Cài lib: `npm i @supabase/supabase-js`
- Mở khoá RLS và định nghĩa bảng: users, areas, steps, tasks, photos, reviews.
- Thay `utils/db.ts` bằng các hàm gọi Supabase (insert, select, update). 

## Notes
- Đây là demo tối giản để xác thực luồng. Khi triển khai thực tế cần: nén ảnh trước upload, kiểm soát dung lượng, phân quyền bằng RLS, lịch nhắc (cron/Edge Functions).
