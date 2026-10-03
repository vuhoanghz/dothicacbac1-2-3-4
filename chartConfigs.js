/**
 * DataViz Studio - Chart Configurations & Dataset Generator
 * Contains full definitions for 10 interactive chart families with multiple scenarios
 */

const ChartConfigs = {
  // Current active customization state
  state: {
    isStacked: false,
    isSmooth: true,
    isRose: false,
    showLabels: true,
    barWidth: 32,
    lineTension: 0.4,
    areaOpacity: 0.35,
    animationDuration: 1000,
    showGrid: true,
    showCrosshair: true,
    palette: 'modern',
    sortOrder: 'none', // 'none' | 'asc' | 'desc'
    scenario: 'business'
  },

  // Color palettes
  palettes: {
    modern: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'],
    warm: ['#f43f5e', '#fb923c', '#eab308', '#ec4899', '#a855f7', '#f87171'],
    cool: ['#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#14b8a6', '#2dd4bf'],
    neon: ['#f43f5e', '#a855f7', '#22c55e', '#eab308', '#06b6d4', '#ec4899']
  },

  // Dataset Scenarios
  datasets: {
    // 1. BAR CHART DATASETS
    bar: {
      business: {
        title: 'Biểu đồ Cột: Doanh Thu & Lợi Nhuận Chi Nhánh',
        desc: 'So sánh kết quả kinh doanh giữa các chi nhánh. Người xem có thể kéo thanh trượt thu phóng (DataZoom), chuyển sang cột xếp chồng, hoặc lọc theo chú giải.',
        categories: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Huế'],
        series: [
          { name: 'Doanh Thu (triệu đ)', data: [1450, 2180, 980, 850, 620, 740, 510] },
          { name: 'Chi Phí (triệu đ)', data: [920, 1420, 610, 580, 410, 480, 360] },
          { name: 'Lợi Nhuận Thuần', data: [530, 760, 370, 270, 210, 260, 150] }
        ]
      },
      tech: {
        title: 'Biểu đồ Cột: Tài Nguyên Server & Băng Thông Cloud',
        desc: 'Theo dõi mức độ sử dụng CPU, RAM và Băng thông qua các cụm máy chủ khu vực (Data Centers).',
        categories: ['Cluster US-East', 'Cluster US-West', 'Cluster EU-Central', 'Cluster AP-East', 'Cluster AP-South'],
        series: [
          { name: 'CPU Usage (%)', data: [78, 62, 89, 45, 71] },
          { name: 'RAM Usage (%)', data: [85, 54, 92, 50, 68] },
          { name: 'Storage Disk (%)', data: [60, 40, 75, 30, 55] }
        ]
      },
      social: {
        title: 'Biểu đồ Cột: Tương Tác Nội Dung Đa Nền Tảng',
        desc: 'Phân tích lượng Like, Share và Comment trên các mạng xã hội hàng đầu.',
        categories: ['TikTok', 'Facebook', 'YouTube', 'Instagram', 'LinkedIn', 'X (Twitter)'],
        series: [
          { name: 'Lượt Xem (K)', data: [4500, 3200, 5100, 2800, 650, 1200] },
          { name: 'Lượt Tương Tác (K)', data: [820, 450, 610, 520, 120, 210] },
          { name: 'Lượt Chia Sẻ (K)', data: [310, 180, 95, 140, 45, 90] }
        ]
      },
      science: {
        title: 'Biểu đồ Cột: Sản Lượng Năng Lượng Tái Tạo',
        desc: 'Thống kê sản lượng điện phát (MWh) từ Điện Mặt Trời, Điện Gió và Thủy Điện theo từng tháng.',
        categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'],
        series: [
          { name: 'Điện Mặt Trời (MWh)', data: [1200, 1450, 1900, 2400, 2800, 3100, 2950] },
          { name: 'Điện Gió (MWh)', data: [2100, 1980, 1600, 1400, 1200, 1100, 1350] },
          { name: 'Thủy Điện (MWh)', data: [3400, 3100, 2800, 2600, 2900, 3500, 3800] }
        ]
      }
    },

    // 2. LINE & AREA DATASET
    line: {
      business: {
        title: 'Biểu đồ Đường & Miền: Doanh Thu & Tỷ Lệ Chuyển Đổi',
        desc: 'Theo dõi lưu lượng khách và tỷ lệ chuyển đổi qua 12 tháng. Trục kép (Dual-axis), vùng dải màu mượt mà, hover tiêu điểm chữ thập.',
        categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        series: [
          { name: 'Doanh Số (triệu đ)', data: [320, 410, 380, 520, 610, 590, 720, 840, 790, 910, 1050, 1200], yAxisIndex: 0, type: 'line', area: true },
          { name: 'Tỷ Lệ Chuyển Đổi (%)', data: [2.1, 2.5, 2.3, 3.1, 3.4, 3.2, 3.8, 4.2, 4.0, 4.6, 5.1, 5.8], yAxisIndex: 1, type: 'line', area: false }
        ]
      },
      tech: {
        title: 'Biểu đồ Đường: Độ Trễ Mạng & Số Request Mỗi Giây',
        desc: 'Giám sát chỉ số RPS (Requests/sec) và Latency thời gian thực.',
        categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        series: [
          { name: 'Requests/sec (kRPS)', data: [12, 8, 5, 14, 45, 82, 95, 88, 92, 110, 85, 40], yAxisIndex: 0, type: 'line', area: true },
          { name: 'Độ Trễ Latency (ms)', data: [24, 21, 19, 25, 42, 65, 78, 62, 70, 85, 55, 30], yAxisIndex: 1, type: 'line', area: false }
        ]
      },
      social: {
        title: 'Biểu đồ Đường: Tăng Trưởng Người Dùng Mới',
        desc: 'Tốc độ tăng trưởng người dùng hoạt động hàng ngày (DAU) và thời gian online trung bình.',
        categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
        series: [
          { name: 'Người Dùng DAU (nghìn)', data: [120, 135, 142, 140, 168, 220, 245], yAxisIndex: 0, type: 'line', area: true },
          { name: 'Thời Gian Online (phút)', data: [28, 30, 31, 29, 36, 48, 52], yAxisIndex: 1, type: 'line', area: false }
        ]
      },
      science: {
        title: 'Biểu đồ Đường: Nhiệt Độ Trung Bình & Lượng Mưa',
        desc: 'Biến thiên nhiệt độ trung bình (°C) và lượng mưa (mm) qua các tháng trong năm.',
        categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        series: [
          { name: 'Nhiệt Độ (°C)', data: [18.5, 20.1, 23.4, 27.2, 31.0, 33.5, 32.8, 31.9, 29.5, 26.2, 22.0, 19.1], yAxisIndex: 0, type: 'line', area: false },
          { name: 'Lượng Mưa (mm)', data: [25, 32, 45, 90, 180, 260, 290, 310, 240, 140, 60, 35], yAxisIndex: 1, type: 'line', area: true }
        ]
      }
    },

    // 3. PIE & ROSE DATASET
    pie: {
      business: {
        title: 'Biểu đồ Tròn / Vành Khuyên: Cơ Cấu Nguồn Thu Doanh Nghiệp',
        desc: 'Phân tích tỷ trọng đóng góp doanh thu giữa các mảng dịch vụ. Bấm vào chú giải để ẩn/hiện, di chuột vào để làm nổi bật (explode slice).',
        data: [
          { value: 4200, name: 'Phần Mềm SaaS' },
          { value: 2850, name: 'Dịch Vụ Tư Vấn AI' },
          { value: 1950, name: 'Bản Quyền Đào Tạo' },
          { value: 1400, name: 'Bảo Trì Hệ Thống' },
          { value: 920, name: 'Quảng Cáo & Hợp Tác' }
        ]
      },
      tech: {
        title: 'Biểu đồ Tròn: Thị Phần Hệ Điều Hành & Nền Tảng Cloud',
        desc: 'Tỷ trọng thị phần máy chủ điện toán đám mây toàn cầu.',
        data: [
          { value: 34, name: 'Amazon Web Services (AWS)' },
          { value: 23, name: 'Microsoft Azure' },
          { value: 12, name: 'Google Cloud Platform (GCP)' },
          { value: 9, name: 'Alibaba Cloud' },
          { value: 6, name: 'Oracle Cloud' },
          { value: 16, name: 'Nhà Cung Cấp Khác' }
        ]
      },
      social: {
        title: 'Biểu đồ Tròn: Phân Bố Độ Tuổi Người Dùng Mạng Xã Hội',
        desc: 'Cơ cấu người dùng theo từng nhóm độ tuổi tương tác.',
        data: [
          { value: 38, name: 'Gen Z (18 - 24 tuổi)' },
          { value: 32, name: 'Millennials (25 - 34 tuổi)' },
          { value: 18, name: 'Gen X (35 - 49 tuổi)' },
          { value: 8, name: 'Boomers (50 - 64 tuổi)' },
          { value: 4, name: 'Nhóm 65+ tuổi' }
        ]
      },
      science: {
        title: 'Biểu đồ Tròn: Cơ Cấu Nguồn Phát Thải Khí Nhà Kính',
        desc: 'Tỷ lệ phát thải CO2 theo các ngành công nghiệp chủ đạo.',
        data: [
          { value: 32, name: 'Sản Xuất Năng Lượng' },
          { value: 24, name: 'Giao Thông Vận Tải' },
          { value: 19, name: 'Sản Xuất Công Nghiệp' },
          { value: 14, name: 'Nông Nghiệp & Lâm Nghiệp' },
          { value: 11, name: 'Xây Dựng Dân Dụng' }
        ]
      }
    },

    // 4. SCATTER & BUBBLE DATASET
    scatter: {
      business: {
        title: 'Biểu đồ Bong Bóng 4D: Chi Phí Marketing vs Lợi Nhuận',
        desc: 'Phân tích tương quan đa chiều: Trục X (Chi Phí Marketing), Trục Y (Lợi Nhuận Ròng), Độ lớn bong bóng (Lượng khách hàng mới), Màu sắc (Khu vực).',
        series: [
          {
            name: 'Khu Vực Miền Bắc',
            data: [
              [120, 240, 45, 'Chi Nhánh Ba Đình'],
              [180, 310, 60, 'Chi Nhánh Cầu Giấy'],
              [260, 480, 85, 'Chi Nhánh Đống Đa'],
              [90, 160, 30, 'Chi Nhánh Tây Hồ'],
              [340, 620, 110, 'Chi Nhánh Hoàn Kiếm']
            ]
          },
          {
            name: 'Khu Vực Miền Nam',
            data: [
              [150, 320, 55, 'Chi Nhánh Quận 1'],
              [290, 580, 95, 'Chi Nhánh Quận 3'],
              [380, 720, 130, 'Chi Nhánh Quận 7'],
              [210, 410, 70, 'Chi Nhánh Bình Thạnh'],
              [420, 850, 160, 'Chi Nhánh Thủ Đức']
            ]
          },
          {
            name: 'Khu Vực Miền Trung',
            data: [
              [80, 140, 25, 'Chi Nhánh Hải Châu'],
              [110, 190, 38, 'Chi Nhánh Thanh Khê'],
              [160, 280, 50, 'Chi Nhánh Sơn Trà'],
              [70, 110, 20, 'Chi Nhánh Ngũ Hành Sơn']
            ]
          }
        ]
      },
      tech: {
        title: 'Biểu đồ Phân Tán: Bộ Nhớ RAM vs Thời Gian Phản Hồi',
        desc: 'Mỗi điểm đại diện cho một microservice: X (RAM tiêu thụ MB), Y (Thời gian xử lý ms), Size (Lượng request/s).',
        series: [
          {
            name: 'Core Services',
            data: [
              [128, 15, 30, 'Auth Service'],
              [256, 28, 60, 'User Service'],
              [512, 45, 90, 'Billing Service'],
              [1024, 75, 120, 'Analytics Engine']
            ]
          },
          {
            name: 'Worker Services',
            data: [
              [64, 8, 15, 'Email Dispatcher'],
              [128, 12, 25, 'Push Notification'],
              [384, 55, 70, 'Report Generator'],
              [768, 65, 80, 'Image Optimizer']
            ]
          }
        ]
      },
      social: {
        title: 'Biểu đồ Phân Tán: Độ Dài Video vs Tỷ Lệ Giữ Chân Khán Giả',
        desc: 'Trục X: Độ dài video (giây), Trục Y: Tỷ lệ giữ chân (%), Size: Lượt chia sẻ.',
        series: [
          {
            name: 'Video Ngắn (< 60s)',
            data: [
              [15, 85, 120, 'Tip lập trình 15s'],
              [30, 78, 110, 'Highlight công nghệ 30s'],
              [45, 68, 95, 'Review nhanh bàn phím 45s'],
              [55, 62, 85, 'Mẹo CSS flexbox 55s']
            ]
          },
          {
            name: 'Video Dài (> 60s)',
            data: [
              [90, 52, 70, 'Hướng dẫn AI prompt'],
              [120, 48, 65, 'So sánh React & Vue'],
              [180, 40, 50, 'Setup bàn làm việc 2026'],
              [240, 36, 45, 'Chuyện nghề IT']
            ]
          }
        ]
      },
      science: {
        title: 'Biểu đồ Phân Tán: Nồng Độ Bụi PM2.5 vs Độ Ẩm Không Khí',
        desc: 'Khảo sát nồng độ bụi mịn PM2.5 (µg/m³) theo độ ẩm (%) và nhiệt độ.',
        series: [
          {
            name: 'Khu Vực Đô Thị',
            data: [
              [45, 65, 30, 'Trạm Đo Ngã Tư Sở'],
              [55, 85, 40, 'Trạm Đo Cầu Giấy'],
              [68, 115, 55, 'Trạm Đo Hoàng Mai'],
              [82, 145, 75, 'Trạm Đo Hà Đông']
            ]
          },
          {
            name: 'Khu Vực Ngoại Thành & Công Viên',
            data: [
              [50, 35, 15, 'Trạm Đo Sóc Sơn'],
              [65, 42, 20, 'Trạm Đo Ba Vì'],
              [75, 48, 22, 'Trạm Đo Gia Lâm']
            ]
          }
        ]
      }
    },

    // 5. RADAR DATASET
    radar: {
      business: {
        title: 'Biểu đồ Radar Mạng Nhện: Đánh Giá Sức Khỏe Doanh Nghiệp',
        desc: 'So sánh đa chỉ số năng lực cốt lõi giữa Doanh nghiệp hiện tại và Mức chuẩn ngành (Benchmark).',
        indicators: [
          { name: 'Tăng Trưởng Doanh Thu', max: 100 },
          { name: 'Biên Lợi Nhuận Ròng', max: 100 },
          { name: 'Độ Hài Lòng Khách Hàng (CSAT)', max: 100 },
          { name: 'Năng Lực Đổi Mới Sáng Tạo', max: 100 },
          { name: 'Khả Năng Kiểm Soát Rủi Ro', max: 100 },
          { name: 'Chuyển Đổi Số', max: 100 }
        ],
        series: [
          { name: 'Công Ty Chúng Ta', value: [88, 76, 92, 85, 70, 95] },
          { name: 'Mức Chuẩn Ngành (Benchmark)', value: [65, 60, 75, 68, 78, 62] },
          { name: 'Đối Thủ Cạnh Tranh A', value: [72, 82, 80, 74, 85, 70] }
        ]
      },
      tech: {
        title: 'Biểu đồ Radar: Đánh Giá Năng Lực Kỹ Sư Công Nghệ',
        desc: 'So sánh bộ kỹ năng chuyên sâu giữa các vị trí kỹ thuật trong nhóm.',
        indicators: [
          { name: 'System Design & Arch', max: 100 },
          { name: 'Thuật Toán & Cấu Trúc DL', max: 100 },
          { name: 'Cloud & DevOps / CI-CD', max: 100 },
          { name: 'Bảo Mật An Ninh Mạng', max: 100 },
          { name: 'AI & Data Engineering', max: 100 },
          { name: 'Giao Tiếp & Phối Hợp Team', max: 100 }
        ],
        series: [
          { name: 'Senior AI Engineer', value: [85, 95, 75, 70, 98, 80] },
          { name: 'DevOps Architect', value: [92, 75, 98, 90, 65, 78] },
          { name: 'Lead Fullstack Developer', value: [90, 88, 82, 78, 72, 92] }
        ]
      },
      social: {
        title: 'Biểu đồ Radar: Chỉ Số Thương Hiệu Đa Kênh',
        desc: 'Đo lường độ phủ, độ tương tác, cảm xúc tích cực và uy tín trên mạng.',
        indicators: [
          { name: 'Độ Nhận Diện Brand', max: 100 },
          { name: 'Mức Độ Lan Tỏa (Viral)', max: 100 },
          { name: 'Cảm Xúc Tích Cực (Sentiment)', max: 100 },
          { name: 'Tỷ Lệ Giữ Chân Fan', max: 100 },
          { name: 'Tần Suất Tương Tác', max: 100 },
          { name: 'Chuyển Đổi Mua Hàng', max: 100 }
        ],
        series: [
          { name: 'Chiến Dịch Mùa Hè 2026', value: [94, 88, 85, 76, 90, 82] },
          { name: 'Chiến Dịch Đầu Năm 2026', value: [75, 68, 72, 70, 65, 60] }
        ]
      },
      science: {
        title: 'Biểu đồ Radar: Chỉ Số Đa Dạng Sinh Thái Rừng',
        desc: 'Đánh giá độ phong phú loài, chất lượng đất, nguồn nước và tán phủ.',
        indicators: [
          { name: 'Độ Che Phủ Tán Rừng', max: 100 },
          { name: 'Đa Dạng Loài Thực Vật', max: 100 },
          { name: 'Quần Thể Động Vật', max: 100 },
          { name: 'Độ Màu Mỡ Của Đất', max: 100 },
          { name: 'Trữ Lượng Nước Ngầm', max: 100 },
          { name: 'Khả Năng Hấp Thụ Carbon', max: 100 }
        ],
        series: [
          { name: 'Vườn Quốc Gia Cúc Phương', value: [92, 95, 88, 85, 90, 94] },
          { name: 'Khu Bảo Tồn Ven Đô', value: [65, 58, 52, 60, 70, 62] }
        ]
      }
    },

    // 6. HEATMAP DATASET
    heatmap: {
      business: {
        title: 'Bản Đồ Nhiệt: Mật Độ Giao Dịch Trong Tuần (24 Giờ x 7 Ngày)',
        desc: 'Khảo sát tần suất khách hàng phát sinh đơn hàng. Người xem có thể kéo thanh trượt VisualMap bên cạnh để lọc dải mức độ hoạt động cao/thấp.',
        days: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        hours: ['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h']
      },
      tech: {
        title: 'Bản Đồ Nhiệt: Lượng Lỗi Ngoại Lệ Server (Error Spike Matrix)',
        desc: 'Theo dõi tần suất xuất hiện cảnh báo lỗi theo các khung giờ trực tuần.',
        days: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        hours: ['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h']
      },
      social: {
        title: 'Bản Đồ Nhiệt: Khung Giờ Vàng Đăng Bài & Tương Tác',
        desc: 'Thời điểm người dùng online và bình luận sôi nổi nhất trong tuần.',
        days: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        hours: ['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h']
      },
      science: {
        title: 'Bản Đồ Nhiệt: Bức Xạ Tia Cực Tím UV Theo Giờ',
        desc: 'Chỉ số đo tia cực tím (UVI) theo từng thời điểm trong tuần.',
        days: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        hours: ['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h']
      }
    },

    // 7. FORCE-DIRECTED NETWORK GRAPH DATASET
    network: {
      business: {
        title: 'Đồ Thị Mạng Lưới Quan Hệ: Hệ Sinh Thái Khách Hàng & Đối Tác',
        desc: 'Các nút mạng (Nodes) có thể kéo thả tự do bằng chuột! Click vào một nút để tô sáng các liên kết liên quan và xem vai trò.',
        nodes: [
          { id: '1', name: 'Tập Đoàn Trụ Sở Chính', category: 0, symbolSize: 55 },
          { id: '2', name: 'Chi Nhánh Hà Nội', category: 1, symbolSize: 38 },
          { id: '3', name: 'Chi Nhánh TP.HCM', category: 1, symbolSize: 42 },
          { id: '4', name: 'Chi Nhánh Đà Nẵng', category: 1, symbolSize: 32 },
          { id: '5', name: 'Đối Tác Ngân Hàng Techcombank', category: 2, symbolSize: 34 },
          { id: '6', name: 'Đối Tác Cloud AWS', category: 2, symbolSize: 35 },
          { id: '7', name: 'Khách Hàng VIP VinFast', category: 3, symbolSize: 30 },
          { id: '8', name: 'Khách Hàng VIP FPT', category: 3, symbolSize: 30 },
          { id: '9', name: 'Khách Hàng VIP Viettel', category: 3, symbolSize: 30 },
          { id: '10', name: 'Đơn Vị Vận Chuyển GHTK', category: 4, symbolSize: 26 },
          { id: '11', name: 'Cổng Thanh Toán VNPay', category: 2, symbolSize: 28 },
          { id: '12', name: 'Nhà Cung Cấp Linh Kiện', category: 4, symbolSize: 25 }
        ],
        links: [
          { source: '1', target: '2', value: 'Quản Lý Trực Tiếp' },
          { source: '1', target: '3', value: 'Quản Lý Trực Tiếp' },
          { source: '1', target: '4', value: 'Quản Lý Trực Tiếp' },
          { source: '1', target: '5', value: 'Hợp Đồng Tài Chính' },
          { source: '1', target: '6', value: 'Hạ Tầng Cloud' },
          { source: '2', target: '7', value: 'Triển Khai Dự Án' },
          { source: '3', target: '8', value: 'Hợp Đồng SaaS' },
          { source: '2', target: '9', value: 'Tích Hợp API' },
          { source: '3', target: '11', value: 'Xử Lý Giao Dịch' },
          { source: '4', target: '10', value: 'Logistics' },
          { source: '2', target: '12', value: 'Nhập Thiết Bị' },
          { source: '7', target: '5', value: 'Liên Kết Ngân Hàng' },
          { source: '8', target: '6', value: 'Đồng Triển Khai AWS' }
        ],
        categories: [
          { name: 'Trụ Sở Chính' },
          { name: 'Chi Nhánh Khu Vực' },
          { name: 'Đối Tác Công Nghệ/Fintech' },
          { name: 'Khách Hàng Doanh Nghiệp' },
          { name: 'Vận Hành & Cung Ứng' }
        ]
      }
    },

    // 8. FINANCIAL CANDLESTICK DATASET
    candlestick: {
      business: {
        title: 'Biểu đồ Nến Nhật (K-Line) & Khối Lượng Giao Dịch Cổ Phiếu',
        desc: 'Phân tích biến động giá cổ phiếu (Mở, Đóng, Cao, Thấp) tích hợp các đường trung bình động MA5, MA10, MA20 và cột khối lượng volume.',
        dates: [
          '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05',
          '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11', '2026-09-12',
          '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19',
          '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25', '2026-09-26'
        ],
        // [Open, Close, Lowest, Highest]
        data: [
          [23.2, 23.8, 22.8, 24.1], [23.8, 24.5, 23.5, 24.9], [24.5, 24.1, 23.9, 25.0], [24.1, 25.2, 24.0, 25.6],
          [25.2, 26.0, 25.1, 26.5], [26.0, 25.4, 25.2, 26.3], [25.4, 25.8, 25.0, 26.1], [25.8, 26.7, 25.6, 27.2],
          [26.7, 27.5, 26.5, 28.0], [27.5, 27.0, 26.8, 27.9], [27.0, 28.2, 26.9, 28.6], [28.2, 29.1, 28.0, 29.5],
          [29.1, 28.5, 28.2, 29.4], [28.5, 29.8, 28.4, 30.2], [29.8, 30.5, 29.5, 31.0], [30.5, 30.1, 29.8, 31.2],
          [30.1, 31.4, 30.0, 31.8], [31.4, 32.0, 31.1, 32.5], [32.0, 31.5, 31.2, 32.4], [31.5, 33.2, 31.4, 33.8]
        ],
        volumes: [
          1420, 1850, 1200, 2100, 2600, 1950, 1780, 2900, 3400, 2150,
          3100, 3850, 2400, 3600, 4200, 2800, 3900, 4500, 3100, 5200
        ]
      }
    },

    // 9. GAUGE DATASET
    gauge: {
      business: {
        title: 'Đồng Hồ Đo Hiệu Suất Hệ Thống (Server CPU & Load KPI)',
        desc: 'Hiển thị tải hệ thống theo thời gian thực với các vùng cảnh báo: Bình thường (Xanh) - Cảnh giác (Vàng) - Quá tải (Đỏ).',
        value: 74.5,
        titleName: 'CPU Load (%)'
      }
    },

    // 10. FUNNEL DATASET
    funnel: {
      business: {
        title: 'Biểu đồ Phễu Chuyển Đổi Thương Mại Điện Tử (Sales Funnel)',
        desc: 'Theo dõi hành trình khách hàng từ bước tiếp cận ban đầu đến khi hoàn tất thanh toán và tỷ lệ chuyển đổi qua từng phễu.',
        data: [
          { value: 100, name: '1. Lượt Truy Cập Website (100K)' },
          { value: 72, name: '2. Xem Chi Tiết Sản Phẩm (72K)' },
          { value: 45, name: '3. Thêm Vào Giỏ Hàng (45K)' },
          { value: 28, name: '4. Bắt Đầu Thanh Toán (28K)' },
          { value: 16, name: '5. Hoàn Tất Đơn Hàng (16K)' }
        ]
      }
    }
  },

  // Calculate Moving Average for Candlestick
  calculateMA(dayCount, data) {
    const result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data[i - j][1]; // Close price
      }
      result.push(parseFloat((sum / dayCount).toFixed(2)));
    }
    return result;
  },

  // Get active color palette array
  getActiveColors() {
    return this.palettes[this.state.palette] || this.palettes.modern;
  },

  // Generate ECharts Option based on type
  getOption(chartType) {
    const scenario = this.state.scenario;
    const colors = this.getActiveColors();
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? '#e2e8f0' : '#1e293b';
    const subtleColor = isDark ? '#64748b' : '#94a3b8';
    const splitLineColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';

    switch (chartType) {
      // -------------------------------------------------------------
      // 1. BAR CHART OPTION
      // -------------------------------------------------------------
      case 'bar': {
        const ds = (this.datasets.bar[scenario] || this.datasets.bar.business);
        let categories = [...ds.categories];
        let seriesData = ds.series.map(s => ({ ...s, data: [...s.data] }));

        // Handle Sorting if user toggled
        if (this.state.sortOrder === 'asc' || this.state.sortOrder === 'desc') {
          const combined = categories.map((cat, idx) => ({
            cat,
            values: seriesData.map(s => s.data[idx]),
            primaryVal: seriesData[0].data[idx]
          }));
          combined.sort((a, b) => this.state.sortOrder === 'asc' ? a.primaryVal - b.primaryVal : b.primaryVal - a.primaryVal);
          categories = combined.map(c => c.cat);
          seriesData.forEach((s, sIdx) => {
            s.data = combined.map(c => c.values[sIdx]);
          });
        }

        const series = seriesData.map((s, idx) => ({
          name: s.name,
          type: 'bar',
          stack: this.state.isStacked ? 'total' : undefined,
          barWidth: this.state.barWidth,
          barMaxWidth: 50,
          emphasis: {
            focus: 'series',
            itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' }
          },
          label: {
            show: this.state.showLabels,
            position: this.state.isStacked ? 'inside' : 'top',
            color: this.state.isStacked ? '#fff' : textColor,
            fontSize: 11,
            formatter: '{c}'
          },
          itemStyle: {
            borderRadius: this.state.isStacked ? 0 : [6, 6, 0, 0],
            color: colors[idx % colors.length]
          },
          data: s.data
        }));

        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: this.state.showCrosshair ? 'shadow' : 'none' },
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor, fontSize: 13 },
            formatter: (params) => {
              let html = `<div style="font-weight:700;margin-bottom:6px;border-bottom:1px solid #475569;padding-bottom:4px;">📍 ${params[0].name}</div>`;
              let sum = 0;
              params.forEach(p => {
                const val = typeof p.value === 'number' ? p.value : p.value[1];
                sum += (val || 0);
                html += `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin:3px 0;">
                  <span>${p.marker} <b>${p.seriesName}</b>:</span>
                  <span style="font-family:monospace;font-weight:700;">${val ? val.toLocaleString() : 0}</span>
                </div>`;
              });
              if (params.length > 1) {
                html += `<div style="margin-top:6px;padding-top:4px;border-top:1px dashed #475569;font-size:11px;color:${subtleColor};text-align:right;">
                  Tổng cộng: <b>${sum.toLocaleString()}</b>
                </div>`;
              }
              return html;
            }
          },
          legend: {
            data: seriesData.map(s => s.name),
            textStyle: { color: textColor },
            top: 5
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '14%',
            top: '14%',
            containLabel: true,
            show: this.state.showGrid,
            borderColor: splitLineColor
          },
          toolbox: {
            show: true,
            right: '2%',
            top: '2%',
            iconStyle: { borderColor: textColor },
            feature: {
              magicType: { type: ['line', 'bar', 'stack'] },
              restore: {},
              saveAsImage: { title: 'Tải ảnh PNG' }
            }
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              bottom: 5,
              height: 22,
              borderColor: splitLineColor,
              textStyle: { color: subtleColor }
            },
            {
              type: 'inside',
              xAxisIndex: [0]
            }
          ],
          xAxis: {
            type: 'category',
            data: categories,
            axisLine: { lineStyle: { color: subtleColor } },
            axisTick: { alignWithLabel: true },
            axisLabel: { color: textColor, rotate: categories.length > 6 ? 20 : 0 }
          },
          yAxis: {
            type: 'value',
            axisLine: { show: true, lineStyle: { color: subtleColor } },
            splitLine: { show: this.state.showGrid, lineStyle: { color: splitLineColor } },
            axisLabel: { color: textColor }
          },
          series
        };
      }

      // -------------------------------------------------------------
      // 2. LINE & AREA CHART OPTION
      // -------------------------------------------------------------
      case 'line': {
        const ds = (this.datasets.line[scenario] || this.datasets.line.business);
        const series = ds.series.map((s, idx) => ({
          name: s.name,
          type: 'line',
          yAxisIndex: s.yAxisIndex || 0,
          smooth: this.state.isSmooth ? this.state.lineTension : false,
          showSymbol: true,
          symbolSize: 8,
          lineStyle: { width: 3, color: colors[idx % colors.length] },
          itemStyle: { color: colors[idx % colors.length] },
          label: {
            show: this.state.showLabels,
            position: 'top',
            color: textColor,
            fontSize: 11
          },
          areaStyle: s.area ? {
            opacity: this.state.areaOpacity,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[idx % colors.length] },
              { offset: 1, color: 'rgba(0, 0, 0, 0.02)' }
            ])
          } : undefined,
          markPoint: {
            data: [
              { type: 'max', name: 'Đỉnh cao nhất' },
              { type: 'min', name: 'Đáy thấp nhất' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Trung bình' }]
          },
          data: s.data
        }));

        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: this.state.showCrosshair ? 'cross' : 'line' },
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor }
          },
          legend: {
            data: ds.series.map(s => s.name),
            textStyle: { color: textColor },
            top: 5
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '14%',
            top: '14%',
            containLabel: true,
            show: this.state.showGrid,
            borderColor: splitLineColor
          },
          toolbox: {
            feature: {
              dataZoom: { yAxisIndex: 'none' },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            { type: 'slider', show: true, bottom: 5, height: 22, textStyle: { color: subtleColor } },
            { type: 'inside' }
          ],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ds.categories,
            axisLine: { lineStyle: { color: subtleColor } },
            axisLabel: { color: textColor }
          },
          yAxis: [
            {
              type: 'value',
              name: ds.series[0]?.name || 'Trục 1',
              nameTextStyle: { color: subtleColor },
              splitLine: { show: this.state.showGrid, lineStyle: { color: splitLineColor } },
              axisLabel: { color: textColor }
            },
            {
              type: 'value',
              name: ds.series[1]?.name || 'Trục 2',
              nameTextStyle: { color: subtleColor },
              splitLine: { show: false },
              axisLabel: { color: textColor }
            }
          ],
          series
        };
      }

      // -------------------------------------------------------------
      // 3. PIE & NIGHTINGALE ROSE CHART OPTION
      // -------------------------------------------------------------
      case 'pie': {
        const ds = (this.datasets.pie[scenario] || this.datasets.pie.business);
        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            trigger: 'item',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor },
            formatter: '{b}: <b style="font-family:monospace">{c}</b> ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle',
            textStyle: { color: textColor }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          series: [
            {
              name: 'Phân Bổ Tỷ Trọng',
              type: 'pie',
              radius: this.state.isRose ? [20, 150] : [60, 140],
              center: ['58%', '50%'],
              roseType: this.state.isRose ? 'radius' : undefined,
              itemStyle: {
                borderRadius: 8,
                borderColor: isDark ? '#111827' : '#ffffff',
                borderWidth: 2
              },
              label: {
                show: this.state.showLabels,
                color: textColor,
                formatter: '{b}: {d}%'
              },
              emphasis: {
                label: { show: true, fontSize: 14, fontWeight: 'bold' },
                itemStyle: { shadowBlur: 15, shadowColor: 'rgba(0, 0, 0, 0.5)' }
              },
              data: ds.data
            }
          ]
        };
      }

      // -------------------------------------------------------------
      // 4. SCATTER & BUBBLE CHART OPTION
      // -------------------------------------------------------------
      case 'scatter': {
        const ds = (this.datasets.scatter[scenario] || this.datasets.scatter.business);
        const series = ds.series.map((s, idx) => ({
          name: s.name,
          type: 'scatter',
          data: s.data,
          symbolSize: (data) => Math.max(12, Math.min(65, (data[2] || 20) * 0.7)),
          itemStyle: {
            color: colors[idx % colors.length],
            opacity: 0.82,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            show: this.state.showLabels,
            formatter: (param) => param.data[3] || '',
            position: 'top',
            color: textColor,
            fontSize: 10
          }
        }));

        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor },
            formatter: (param) => {
              const d = param.data;
              return `<div style="font-weight:700;color:${param.color}">● ${d[3] || param.seriesName}</div>
                <div>X (Chi Phí): <b>${d[0]}</b></div>
                <div>Y (Lợi Nhuận): <b>${d[1]}</b></div>
                <div>Quy Mô (Size): <b>${d[2]}</b></div>`;
            }
          },
          legend: {
            data: ds.series.map(s => s.name),
            textStyle: { color: textColor },
            top: 5
          },
          brush: {
            toolbox: ['rect', 'polygon', 'clear'],
            xAxisIndex: 0
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: '14%',
            containLabel: true,
            show: this.state.showGrid,
            borderColor: splitLineColor
          },
          xAxis: {
            type: 'value',
            name: 'Chi Phí / Trục X',
            nameTextStyle: { color: subtleColor },
            splitLine: { show: this.state.showGrid, lineStyle: { color: splitLineColor } },
            axisLabel: { color: textColor }
          },
          yAxis: {
            type: 'value',
            name: 'Lợi Nhuận / Trục Y',
            nameTextStyle: { color: subtleColor },
            splitLine: { show: this.state.showGrid, lineStyle: { color: splitLineColor } },
            axisLabel: { color: textColor }
          },
          series
        };
      }

      // -------------------------------------------------------------
      // 5. RADAR (SPIDER) CHART OPTION
      // -------------------------------------------------------------
      case 'radar': {
        const ds = (this.datasets.radar[scenario] || this.datasets.radar.business);
        const seriesData = ds.series.map((s, idx) => ({
          value: s.value,
          name: s.name,
          symbolSize: 6,
          lineStyle: { width: 2, color: colors[idx % colors.length] },
          itemStyle: { color: colors[idx % colors.length] },
          areaStyle: {
            color: colors[idx % colors.length],
            opacity: 0.25
          }
        }));

        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            trigger: 'item',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor }
          },
          legend: {
            data: ds.series.map(s => s.name),
            textStyle: { color: textColor },
            top: 5
          },
          radar: {
            indicator: ds.indicators,
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
              color: textColor,
              fontSize: 12,
              fontWeight: 500
            },
            splitLine: { lineStyle: { color: splitLineColor } },
            splitArea: {
              show: true,
              areaStyle: {
                color: isDark
                  ? ['rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.05)']
                  : ['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.03)']
              }
            },
            axisLine: { lineStyle: { color: splitLineColor } }
          },
          series: [
            {
              type: 'radar',
              data: seriesData
            }
          ]
        };
      }

      // -------------------------------------------------------------
      // 6. HEATMAP MATRIX OPTION
      // -------------------------------------------------------------
      case 'heatmap': {
        const ds = (this.datasets.heatmap[scenario] || this.datasets.heatmap.business);
        const data = [];
        for (let i = 0; i < ds.days.length; i++) {
          for (let j = 0; j < ds.hours.length; j++) {
            // Generate realistic heat value with peak during afternoon/evening
            const base = (i >= 5 ? 70 : 45); // weekends higher
            const hourWeight = Math.sin((j / ds.hours.length) * Math.PI) * 50;
            const val = Math.floor(Math.max(10, base + hourWeight + (Math.random() * 20 - 10)));
            data.push([j, i, val]);
          }
        }

        return {
          animationDuration: this.state.animationDuration,
          tooltip: {
            position: 'top',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor },
            formatter: (param) => {
              const hour = ds.hours[param.data[0]];
              const day = ds.days[param.data[1]];
              const val = param.data[2];
              return `<b>${day} - ${hour}</b><br/>Chỉ số hoạt động: <span style="color:#f59e0b;font-weight:700">${val}</span>`;
            }
          },
          grid: {
            left: '4%',
            right: '12%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ds.hours,
            splitArea: { show: true },
            axisLabel: { color: textColor }
          },
          yAxis: {
            type: 'category',
            data: ds.days,
            splitArea: { show: true },
            axisLabel: { color: textColor }
          },
          visualMap: {
            min: 0,
            max: 120,
            calculable: true,
            orient: 'vertical',
            right: '1%',
            top: 'center',
            textStyle: { color: textColor },
            inRange: {
              color: isDark
                ? ['#0f172a', '#1e3a8a', '#3b82f6', '#06b6d4', '#10b981', '#fbbf24', '#ef4444']
                : ['#f1f5f9', '#bfdbfe', '#60a5fa', '#34d399', '#fde047', '#f87171']
            }
          },
          series: [
            {
              name: 'Mật độ hoạt động',
              type: 'heatmap',
              data: data,
              label: {
                show: this.state.showLabels,
                color: textColor,
                fontSize: 10
              },
              emphasis: {
                itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
              }
            }
          ]
        };
      }

      // -------------------------------------------------------------
      // 7. FORCE-DIRECTED NETWORK GRAPH OPTION
      // -------------------------------------------------------------
      case 'network': {
        const ds = (this.datasets.network.business);
        const categories = ds.categories.map((c, i) => ({
          name: c.name,
          itemStyle: { color: colors[i % colors.length] }
        }));

        return {
          animationDuration: this.state.animationDuration,
          tooltip: {
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor },
            formatter: (param) => {
              if (param.dataType === 'edge') {
                return `Liên kết: <b>${param.data.source}</b> ➜ <b>${param.data.target}</b><br/>Vai trò: ${param.data.value || 'Kết nối'}`;
              }
              return `<b>${param.data.name}</b><br/>Phân nhóm: ${ds.categories[param.data.category]?.name || 'N/A'}`;
            }
          },
          legend: [
            {
              data: categories.map(c => c.name),
              textStyle: { color: textColor },
              top: 5
            }
          ],
          series: [
            {
              type: 'graph',
              layout: 'force',
              data: ds.nodes,
              links: ds.links,
              categories: categories,
              roam: true,
              draggable: true,
              label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: textColor,
                fontSize: 11
              },
              labelLayout: { hideOverlap: true },
              lineStyle: {
                color: 'source',
                curveness: 0.2,
                width: 2
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: { width: 5 }
              },
              force: {
                repulsion: 380,
                edgeLength: [60, 140],
                gravity: 0.1
              }
            }
          ]
        };
      }

      // -------------------------------------------------------------
      // 8. CANDLESTICK (FINANCIAL K-LINE) OPTION
      // -------------------------------------------------------------
      case 'candlestick': {
        const ds = this.datasets.candlestick.business;
        const ma5 = this.calculateMA(5, ds.data);
        const ma10 = this.calculateMA(10, ds.data);
        const ma20 = this.calculateMA(20, ds.data);

        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor },
            formatter: (params) => {
              const p = params[0];
              const candle = p.data;
              let html = `<b>Ngày: ${p.name}</b><br/>`;
              html += `Mở cửa: <b style="font-family:monospace">${candle[1]}</b><br/>`;
              html += `Đóng cửa: <b style="font-family:monospace">${candle[2]}</b><br/>`;
              html += `Thấp nhất: <b style="font-family:monospace">${candle[3]}</b><br/>`;
              html += `Cao nhất: <b style="font-family:monospace">${candle[4]}</b>`;
              return html;
            }
          },
          legend: {
            data: ['K-Line Nến', 'MA5', 'MA10', 'MA20'],
            textStyle: { color: textColor },
            top: 5
          },
          grid: [
            { left: '4%', right: '4%', height: '55%', top: '12%' },
            { left: '4%', right: '4%', top: '72%', height: '16%' }
          ],
          xAxis: [
            {
              type: 'category',
              data: ds.dates,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false, lineStyle: { color: subtleColor } },
              splitLine: { show: false },
              axisLabel: { color: textColor }
            },
            {
              type: 'category',
              gridIndex: 1,
              data: ds.dates,
              boundaryGap: false,
              axisLine: { onZero: false, lineStyle: { color: subtleColor } },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false }
            }
          ],
          yAxis: [
            {
              scale: true,
              splitArea: { show: false },
              splitLine: { show: this.state.showGrid, lineStyle: { color: splitLineColor } },
              axisLabel: { color: textColor }
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            }
          ],
          dataZoom: [
            { type: 'inside', xAxisIndex: [0, 1], start: 30, end: 100 },
            { show: true, xAxisIndex: [0, 1], type: 'slider', bottom: 5, start: 30, end: 100, height: 20 }
          ],
          series: [
            {
              name: 'K-Line Nến',
              type: 'candlestick',
              data: ds.data,
              itemStyle: {
                color: '#ef4444',
                color0: '#10b981',
                borderColor: '#ef4444',
                borderColor0: '#10b981'
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: ma5,
              smooth: true,
              lineStyle: { opacity: 0.8, width: 2, color: '#f59e0b' }
            },
            {
              name: 'MA10',
              type: 'line',
              data: ma10,
              smooth: true,
              lineStyle: { opacity: 0.8, width: 2, color: '#3b82f6' }
            },
            {
              name: 'MA20',
              type: 'line',
              data: ma20,
              smooth: true,
              lineStyle: { opacity: 0.8, width: 2, color: '#8b5cf6' }
            },
            {
              name: 'Khối Lượng Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: ds.volumes,
              itemStyle: {
                color: (param) => {
                  const candle = ds.data[param.dataIndex];
                  return candle[1] > candle[0] ? '#ef4444' : '#10b981';
                }
              }
            }
          ]
        };
      }

      // -------------------------------------------------------------
      // 9. GAUGE / SPEEDOMETER OPTION
      // -------------------------------------------------------------
      case 'gauge': {
        const ds = this.datasets.gauge.business;
        return {
          animationDuration: this.state.animationDuration,
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: 'Hiệu Năng Server',
              type: 'gauge',
              center: ['50%', '55%'],
              radius: '85%',
              progress: { show: true, width: 18 },
              axisLine: {
                lineStyle: {
                  width: 18,
                  color: [
                    [0.6, '#10b981'],
                    [0.85, '#f59e0b'],
                    [1, '#ef4444']
                  ]
                }
              },
              pointer: { itemStyle: { color: 'auto' }, length: '65%' },
              axisTick: { distance: -24, length: 8, lineStyle: { color: '#fff', width: 2 } },
              splitLine: { distance: -28, length: 20, lineStyle: { color: '#fff', width: 3 } },
              axisLabel: { color: 'auto', distance: 30, fontSize: 13 },
              detail: {
                valueAnimation: true,
                formatter: '{value}%',
                color: textColor,
                fontSize: 28,
                offsetCenter: [0, '70%']
              },
              title: {
                offsetCenter: [0, '40%'],
                fontSize: 16,
                color: subtleColor
              },
              data: [{ value: ds.value, name: ds.titleName }]
            }
          ]
        };
      }

      // -------------------------------------------------------------
      // 10. FUNNEL CONVERSION OPTION
      // -------------------------------------------------------------
      case 'funnel': {
        const ds = this.datasets.funnel.business;
        return {
          animationDuration: this.state.animationDuration,
          color: colors,
          tooltip: {
            trigger: 'item',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            textStyle: { color: textColor },
            formatter: '{a} <br/>{b} : <b>{c}%</b>'
          },
          legend: {
            data: ds.data.map(d => d.name),
            textStyle: { color: textColor },
            top: 5
          },
          toolbox: {
            feature: { saveAsImage: {} }
          },
          series: [
            {
              name: 'Tỷ Lệ Phễu Chuyển Đổi',
              type: 'funnel',
              left: '10%',
              top: 50,
              bottom: 20,
              width: '80%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 4,
              label: {
                show: true,
                position: 'inside',
                formatter: '{b} ({c}%)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600
              },
              labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
              itemStyle: {
                borderColor: isDark ? '#111827' : '#fff',
                borderWidth: 2
              },
              emphasis: {
                label: { fontSize: 14 }
              },
              data: ds.data
            }
          ]
        };
      }

      default:
        return {};
    }
  }
};
