# 📊 DataViz Studio - Trung Tâm Trực Quan Hóa & Tương Tác Đồ Thị

Ứng dụng web hiện đại hiển thị đa dạng các dạng đồ thị với khả năng tương tác sâu sắc, thời gian thực và trực quan hóa chuyên nghiệp.

---

## 🌟 Tính Năng Nổi Bật

### 1. Đa dạng 10 Dạng Đồ Thị Chuyên Nghiệp:
1. **Cột & Xếp Chồng (Bar & Stacked Columns):** So sánh đa chi nhánh, hỗ trợ xếp chồng (Stacked), chuyển đổi ngang/dọc, sắp xếp tăng/giảm dần theo giá trị.
2. **Đường & Miền Đa Trục (Line & Dual-Axis Area):** Đường cong mượt Bézier, dải màu Gradient, theo dõi 2 trục Y độc lập cùng tiêu điểm chữ thập (Crosshair).
3. **Tròn & Hoa Hồng (Donut & Nightingale Rose):** Chuyển đổi linh hoạt giữa dạng Vành khuyên (Donut) và Biểu đồ Hoa hồng (Nightingale Rose Chart) theo bán kính.
4. **Phân Tán & Bong Bóng 4D (Scatter & Bubble Matrix):** Tương quan 4 chiều (Chi phí, Lợi nhuận, Quy mô bong bóng, Phân vùng địa lý) kèm công cụ quét vùng chọn (Brush selection).
5. **Radar Mạng Nhện (Spider Competency):** Đánh giá năng lực đa tiêu chí, so sánh sức khỏe doanh nghiệp hoặc kỹ năng lập trình viên Senior / DevOps / AI Engineer.
6. **Bản Đồ Nhiệt Ma Trận (Weekly Activity Heatmap):** Ma trận 24 giờ x 7 ngày với thanh trượt VisualMap giúp lọc dải cường độ hoạt động trực quan.
7. **Mạng Lưới Kéo Thả (Force-Directed Network Graph):** Các nút mạng (Nodes) và liên kết (Edges) có thể **kéo thả tự do bằng chuột**, áp dụng mô phỏng vật lý động lực học.
8. **Nến Tài Chính K-Line (Candlestick & Volume):** Đồ thị giá chứng khoán/crypto chuẩn chuyên nghiệp (Mở, Đóng, Cao, Thấp), tích hợp chỉ báo đường trung bình động MA5, MA10, MA20 và cột khối lượng giao dịch.
9. **Đồng Hồ Đo Hiệu Năng (Speedometer & Gauge):** Kim đo động với các dải cảnh báo Xanh (An toàn) - Vàng (Chú ý) - Đỏ (Quá tải).
10. **Phễu Chuyển Đổi (Conversion Funnel):** Đo lường hành trình mua sắm từ Lượt truy cập đến Hoàn tất đơn hàng.

---

### 2. Sự Tương Tác Đỉnh Cao Dành Cho Người Xem:
- 🔍 **Thu Phóng & Di Chuyển (Zoom & Pan):** Cuộn chuột (Mousewheel) hoặc trượt thanh `DataZoom` ở cạnh đáy để phóng to từng khoảng thời gian.
- 🎨 **4 Giao Diện Hiện Đại (Multi-Theme):** 
  - 🌙 Chế độ Tối (Dark Slate)
  - ☀️ Chế độ Sáng (Crisp Light)
  - ⚡ Cyberpunk Neon
  - 🌲 Emerald Forest
- ✏️ **Bộ Biên Tập Dữ Liệu Trực Tiếp (Live Data Grid):** Bảng tính ngay trên trình duyệt, cho phép người xem sửa trực tiếp giá trị, thêm dòng, xóa dòng và bấm **"Áp dụng thay đổi"** để đồ thị tự động vẽ lại tức thì.
- 👆 **Kính Lúp Phân Tích Điểm Chạm (Point Inspector):** Click vào bất kỳ cột, đường kẻ hoặc nút mạng nào để mở bảng phân tích chuyên sâu về tỷ trọng %, độ lệch so với mức trung bình và xếp hạng.
- ⚡ **Chế Độ Dữ Liệu Thời Gian Thực (Live Streaming Simulation):** Bấm nút stream ở thanh tiêu đề (hoặc phím `Space`) để kích hoạt dòng dữ liệu biến thiên liên tục theo từng giây (mô phỏng sàn giao dịch hoặc IoT telemetry).
- 🎲 **Sinh Số Liệu Mới (Randomize):** Click nút xúc xắc hoặc ấn phím `R` để sinh bộ dữ liệu mẫu mới với hiệu ứng chuyển động mượt.
- 📥 **Nhập / Xuất Tự Do:** 
  - Dán dữ liệu CSV tùy ý của bạn để vẽ biểu đồ riêng.
  - Tải ảnh PNG độ phân giải 2x, tải file SVG Vector, tải dữ liệu JSON, hoặc xuất file CSV.

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Mở trực tiếp bằng trình duyệt (Nhanh nhất)
Chỉ cần nhấp đúp chuột vào file `index.html` trong thư mục:
```
C:\Users\Admin\.gemini\antigravity\scratch\interactive-charts-web\index.html
```

### Cách 2: Khởi chạy máy chủ cục bộ với Python
Mở terminal PowerShell trong thư mục dự án và chạy:
```powershell
py serve.py
```
Trình duyệt sẽ tự động mở địa chỉ: `http://localhost:8080/index.html`.

---

## ⌨️ Bảng Phím Tắt Tiện Ích

| Phím Tắt | Chức Năng |
| :--- | :--- |
| <kbd>Space</kbd> | Bật / Tạm dừng dòng dữ liệu Realtime Streaming |
| <kbd>R</kbd> | Sinh bộ dữ liệu ngẫu nhiên mới (Randomize) |
| <kbd>T</kbd> | Đổi nhanh giao diện Sáng ⇄ Tối |
| <kbd>F</kbd> | Bật / Tắt chế độ Toàn màn hình (Fullscreen) |
| <kbd>Esc</kbd> | Đóng cửa sổ hướng dẫn / trợ giúp |


---

# 📐 MathViz Lab - Khảo Sát Đồ Thị Hàm Số Bậc 1, 2, 3, 4

Bên cạnh các đồ thị thống kê kinh doanh, hệ thống đã tích hợp thêm phòng thí nghiệm toán học tương tác **MathViz Lab** tại:
👉 `math.html`

### 1. Các Dạng Hàm Số Hỗ Trợ:
- **Bậc 1 ($y = ax + b$):** Đồ thị đường thẳng, nghiên cứu hệ số góc $a$, tính đơn điệu đồng biến/nghịch biến.
- **Bậc 2 ($y = ax^2 + bx + c$):** Parabol, đỉnh $I(-b/2a, -\Delta/4a)$, trục đối xứng, bề lõm theo dấu của $a$.
- **Bậc 3 ($y = ax^3 + bx^2 + cx + d$):** Đạo hàm $y' = 3ax^2 + 2bx + c$, biệt thức $\Delta' = b^2 - 3ac$, 2 cực trị hoặc không có cực trị, điểm uốn $U$ là tâm đối xứng.
- **Bậc 4 Trùng Phương ($y = ax^4 + bx^2 + c$):** Xét tích $ab < 0$ (3 cực trị hình chữ W/M) và $ab \ge 0$ (1 cực trị), đối xứng qua trục $Oy$.
- **Bậc 4 Tổng Quát ($y = ax^4 + bx^3 + cx^2 + dx + e$):** Uốn lượn đa cực trị bất đối xứng.

### 2. Tương Tác Trực Quan:
- **Thanh trượt hệ số ($a, b, c, d, e$):** Kéo để đồ thị biến thiên theo thời gian thực (60 FPS).
- **Tiếp tuyến động tại $x_0$:** Di chuyển điểm tiếp xúc $M(x_0, y_0)$ trên đồ thị để quan sát hệ số góc tiếp tuyến $k = y'(x_0)$ đổi dấu từ âm sang dương hoặc triệt tiêu tại các cực trị.
- **Lớp phủ đạo hàm $y'(x)$:** Quan sát mối quan hệ giữa dấu của đạo hàm và chiều biến thiên của hàm số gốc.
- **Bảng Biến Thiên Tự Động:** Tự động tính toán các khoảng tăng/giảm và mũi tên biến thiên theo chuẩn toán học THPT.
- **Ứng dụng thực tế & Mẹo thi:** Giải thích mô hình dùng làm gì (quỹ đạo ném xiên, ăng-ten parabol, đường cong chuyển tiếp cao tốc, giếng thế lượng tử) và bí kíp nhận diện đồ thị trong 5 giây.
