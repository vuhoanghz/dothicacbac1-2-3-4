/**
 * DataViz Studio - Live Data Grid Editor & CSV Importer
 * Enables live in-browser table editing of chart values and dynamic re-rendering
 */

class DataEditor {
  constructor() {
    this.tableHead = document.getElementById('data-table-head');
    this.tableBody = document.getElementById('data-table-body');
    this.originalStateBackup = null;
  }

  init() {
    this.setupListeners();
  }

  setupListeners() {
    // Apply changes button
    const applyBtn = document.getElementById('apply-data-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => this.applyTableChanges());
    }

    // Reset data button
    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.chartManager.renderChart();
        this.showToast('Đã phục hồi dữ liệu gốc!', 'success');
      });
    }

    // Add row button
    const addRowBtn = document.getElementById('add-row-btn');
    if (addRowBtn) {
      addRowBtn.addEventListener('click', () => this.addNewRow());
    }

    // CSV Import Button
    const importBtn = document.getElementById('import-btn');
    if (importBtn) {
      importBtn.addEventListener('click', () => this.handleCsvImport());
    }

    // Load sample CSV button
    const sampleCsvBtn = document.getElementById('load-sample-csv-btn');
    if (sampleCsvBtn) {
      sampleCsvBtn.addEventListener('click', () => {
        const textarea = document.getElementById('import-data-text');
        if (textarea) {
          textarea.value = `Thang,DoanhThu,ChiPhi,LoiNhuan\nTháng 1,1200,800,400\nTháng 2,1450,920,530\nTháng 3,1800,1100,700\nTháng 4,2100,1250,850\nTháng 5,2600,1400,1200\nTháng 6,2900,1500,1400`;
        }
      });
    }

    // Copy Options JSON button
    const copyBtn = document.getElementById('copy-options-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textarea = document.getElementById('export-options-json');
        if (textarea && textarea.value) {
          navigator.clipboard.writeText(textarea.value).then(() => {
            this.showToast('Đã sao chép cấu hình JSON vào Clipboard!', 'success');
          });
        }
      });
    }

    // Download CSV button
    const dlCsvBtn = document.getElementById('download-csv-btn');
    if (dlCsvBtn) {
      dlCsvBtn.addEventListener('click', () => this.downloadCurrentAsCsv());
    }
  }

  // Render editable table matching the active chart structure
  renderEditorFor(chartType) {
    if (!this.tableHead || !this.tableBody) return;

    this.tableHead.innerHTML = '';
    this.tableBody.innerHTML = '';

    const scenario = ChartConfigs.state.scenario;

    if (chartType === 'bar' || chartType === 'line') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      const categories = ds.categories || [];
      const seriesList = ds.series || [];

      // Create Head
      let headHtml = `<tr>
        <th style="width: 50px">STT</th>
        <th>Tên Nhãn / Danh Mục</th>`;
      seriesList.forEach(s => {
        headHtml += `<th>${s.name}</th>`;
      });
      headHtml += `<th style="width: 70px; text-align: center">Thao tác</th></tr>`;
      this.tableHead.innerHTML = headHtml;

      // Create Rows
      categories.forEach((cat, rIdx) => {
        let rowHtml = `<tr data-row-index="${rIdx}">
          <td style="color:var(--text-subtle);">${rIdx + 1}</td>
          <td><input type="text" class="cell-input col-category" value="${cat}"></td>`;
        seriesList.forEach((s, sIdx) => {
          const val = s.data[rIdx] !== undefined ? s.data[rIdx] : 0;
          rowHtml += `<td><input type="number" class="cell-input col-series" data-series-idx="${sIdx}" value="${val}"></td>`;
        });
        rowHtml += `<td style="text-align: center">
          <button class="delete-row-btn" title="Xóa dòng này" onclick="window.dataEditor.deleteRow(this)">✕</button>
        </td></tr>`;
        this.tableBody.insertAdjacentHTML('beforeend', rowHtml);
      });

    } else if (chartType === 'pie' || chartType === 'funnel') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      const dataItems = ds.data || [];

      this.tableHead.innerHTML = `<tr>
        <th style="width: 50px">STT</th>
        <th>Tên Phân Khúc</th>
        <th>Giá Trị / Số Lượng</th>
        <th style="width: 70px; text-align: center">Thao tác</th>
      </tr>`;

      dataItems.forEach((item, rIdx) => {
        const rowHtml = `<tr>
          <td style="color:var(--text-subtle);">${rIdx + 1}</td>
          <td><input type="text" class="cell-input col-pie-name" value="${item.name}"></td>
          <td><input type="number" class="cell-input col-pie-value" value="${item.value}"></td>
          <td style="text-align: center">
            <button class="delete-row-btn" title="Xóa dòng này" onclick="window.dataEditor.deleteRow(this)">✕</button>
          </td>
        </tr>`;
        this.tableBody.insertAdjacentHTML('beforeend', rowHtml);
      });

    } else {
      // General notice for complex graphs (network, heatmap, candlestick)
      this.tableHead.innerHTML = `<tr><th>Cấu Trúc</th><th>Mô Tả Bộ Dữ Liệu Đang Kích Hoạt</th></tr>`;
      this.tableBody.innerHTML = `<tr>
        <td><strong>${chartType.toUpperCase()}</strong></td>
        <td>Dạng đồ thị này sử dụng ma trận tọa độ chuyên biệt. Bạn có thể sử dụng tab <em>"Nhập Dữ Liệu CSV / JSON"</em> hoặc tùy chỉnh thông số tại thanh công cụ phía trên.</td>
      </tr>`;
    }
  }

  // Delete row in table
  deleteRow(btn) {
    const row = btn.closest('tr');
    if (row) {
      row.remove();
      this.showToast('Đã xóa 1 hàng dữ liệu', 'warning');
    }
  }

  // Add new empty row to current table
  addNewRow() {
    const chartType = window.chartManager.currentChartType;
    if (chartType === 'bar' || chartType === 'line') {
      const seriesCount = this.tableHead.querySelectorAll('th').length - 3;
      let newRowHtml = `<tr>
        <td style="color:var(--text-subtle);">${this.tableBody.children.length + 1}</td>
        <td><input type="text" class="cell-input col-category" value="Mục mới ${this.tableBody.children.length + 1}"></td>`;
      for (let i = 0; i < seriesCount; i++) {
        newRowHtml += `<td><input type="number" class="cell-input col-series" data-series-idx="${i}" value="500"></td>`;
      }
      newRowHtml += `<td style="text-align: center"><button class="delete-row-btn" onclick="window.dataEditor.deleteRow(this)">✕</button></td></tr>`;
      this.tableBody.insertAdjacentHTML('beforeend', newRowHtml);
    } else if (chartType === 'pie' || chartType === 'funnel') {
      const newRowHtml = `<tr>
        <td style="color:var(--text-subtle);">${this.tableBody.children.length + 1}</td>
        <td><input type="text" class="cell-input col-pie-name" value="Phân khúc mới"></td>
        <td><input type="number" class="cell-input col-pie-value" value="1000"></td>
        <td style="text-align: center"><button class="delete-row-btn" onclick="window.dataEditor.deleteRow(this)">✕</button></td>
      </tr>`;
      this.tableBody.insertAdjacentHTML('beforeend', newRowHtml);
    }
  }

  // Apply table changes directly to active chart dataset
  applyTableChanges() {
    const chartType = window.chartManager.currentChartType;
    const scenario = ChartConfigs.state.scenario;

    if (chartType === 'bar' || chartType === 'line') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      const rows = this.tableBody.querySelectorAll('tr');
      const newCategories = [];
      const newSeriesData = ds.series.map(() => []);

      rows.forEach(r => {
        const catInput = r.querySelector('.col-category');
        if (catInput && catInput.value.trim()) {
          newCategories.push(catInput.value.trim());
          const seriesInputs = r.querySelectorAll('.col-series');
          seriesInputs.forEach((inp, sIdx) => {
            const val = parseFloat(inp.value) || 0;
            if (newSeriesData[sIdx]) {
              newSeriesData[sIdx].push(val);
            }
          });
        }
      });

      if (newCategories.length > 0) {
        ds.categories = newCategories;
        ds.series.forEach((s, idx) => {
          s.data = newSeriesData[idx] || [];
        });
        window.chartManager.renderChart(chartType);
        this.showToast('✅ Đã cập nhật đồ thị từ bảng dữ liệu!', 'success');
      }

    } else if (chartType === 'pie' || chartType === 'funnel') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      const rows = this.tableBody.querySelectorAll('tr');
      const newData = [];

      rows.forEach(r => {
        const nameInp = r.querySelector('.col-pie-name');
        const valInp = r.querySelector('.col-pie-value');
        if (nameInp && valInp) {
          newData.push({
            name: nameInp.value.trim(),
            value: parseFloat(valInp.value) || 0
          });
        }
      });

      if (newData.length > 0) {
        ds.data = newData;
        window.chartManager.renderChart(chartType);
        this.showToast('✅ Đã cập nhật đồ thị tròn / phễu!', 'success');
      }
    } else {
      this.showToast('Đồ thị hiện tại không hỗ trợ sửa trực tiếp qua bảng này', 'warning');
    }
  }

  // Handle CSV Import
  handleCsvImport() {
    const textarea = document.getElementById('import-data-text');
    if (!textarea || !textarea.value.trim()) {
      this.showToast('Vui lòng nhập hoặc dán nội dung CSV trước!', 'warning');
      return;
    }

    try {
      const text = textarea.value.trim();
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length < 2) {
        throw new Error('CSV cần ít nhất 1 dòng tiêu đề và 1 dòng dữ liệu.');
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const categories = [];
      const seriesList = [];

      for (let h = 1; h < headers.length; h++) {
        seriesList.push({ name: headers[h], data: [] });
      }

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        categories.push(parts[0]);
        for (let j = 1; j < parts.length; j++) {
          if (seriesList[j - 1]) {
            seriesList[j - 1].data.push(parseFloat(parts[j]) || 0);
          }
        }
      }

      // Inject into bar dataset custom slot
      const scenario = ChartConfigs.state.scenario;
      ChartConfigs.datasets.bar[scenario] = {
        title: `Biểu đồ Tùy Chỉnh từ File CSV (${headers[0]})`,
        desc: `Dữ liệu do bạn nạp vào với ${categories.length} danh mục và ${seriesList.length} chuỗi số liệu.`,
        categories,
        series: seriesList
      };

      // Switch to bar and render
      const navItemBar = document.querySelector('[data-chart="bar"]');
      if (navItemBar) navItemBar.click();
      window.chartManager.renderChart('bar');

      this.showToast(`🎉 Nạp thành công ${categories.length} bản ghi CSV!`, 'success');
    } catch (err) {
      console.error(err);
      this.showToast(`Lỗi định dạng CSV: ${err.message}`, 'danger');
    }
  }

  // Download current data as CSV file
  downloadCurrentAsCsv() {
    const chartType = window.chartManager.currentChartType;
    const scenario = ChartConfigs.state.scenario;
    let csvContent = '';

    if (chartType === 'bar' || chartType === 'line') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      const headers = ['DanhMuc', ...ds.series.map(s => s.name)];
      csvContent += headers.join(',') + '\n';

      ds.categories.forEach((cat, idx) => {
        const row = [cat, ...ds.series.map(s => s.data[idx] || 0)];
        csvContent += row.join(',') + '\n';
      });
    } else if (chartType === 'pie' || chartType === 'funnel') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      csvContent += 'PhanKhuc,GiaTri\n';
      ds.data.forEach(d => {
        csvContent += `${d.name},${d.value}\n`;
      });
    } else {
      this.showToast('Vui lòng chọn Biểu đồ Cột, Đường hoặc Tròn để xuất CSV', 'warning');
      return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DataViz_${chartType}_export.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Đã tải xuống file CSV!', 'success');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Global data editor singleton
window.dataEditor = new DataEditor();
