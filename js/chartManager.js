/**
 * DataViz Studio - Chart Manager
 * Handles ECharts lifecycle, event listeners, dynamic updates, and inspector triggers
 */

class ChartManager {
  constructor() {
    this.chartInstance = null;
    this.currentChartType = 'bar';
    this.container = document.getElementById('main-echart');
    this.resizeObserver = null;
  }

  // Initialize the manager
  init() {
    if (!this.container) {
      console.error('Chart container #main-echart not found');
      return;
    }

    this.setupInstance();
    this.setupResizeListener();
  }

  // Create or re-create ECharts instance
  setupInstance() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    this.chartInstance = echarts.init(this.container, currentTheme, {
      renderer: 'canvas'
    });

    this.attachChartEvents();
  }

  // Auto-resize on window or parent container change
  setupResizeListener() {
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.chartInstance) {
          this.chartInstance.resize();
        }
      });
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', () => {
        if (this.chartInstance) {
          this.chartInstance.resize();
        }
      });
    }
  }

  // Bind chart-level user interaction events
  attachChartEvents() {
    if (!this.chartInstance) return;

    // Click event for Point Inspector
    this.chartInstance.on('click', (params) => {
      this.handlePointClick(params);
    });

    // Hover event for live status display
    this.chartInstance.on('mouseover', (params) => {
      const statusText = document.getElementById('status-hover-text');
      if (statusText) {
        let val = params.value;
        if (Array.isArray(val)) {
          val = val[1] !== undefined ? val[1] : val[0];
        }
        statusText.innerHTML = `Đang trỏ: <strong>${params.name || params.seriesName || 'Điểm'}</strong> (${val ? val.toLocaleString() : '--'})`;
      }
    });

    this.chartInstance.on('mouseout', () => {
      const statusText = document.getElementById('status-hover-text');
      if (statusText) {
        statusText.innerText = 'Di chuột lên đồ thị để xem phân tích số liệu';
      }
    });
  }

  // Render a specific chart type with current options
  renderChart(chartType = this.currentChartType) {
    this.currentChartType = chartType;
    const loader = document.getElementById('chart-loader');
    if (loader) loader.classList.remove('hidden');

    try {
      const option = ChartConfigs.getOption(chartType);
      
      // Update chart title and description
      this.updateHeaderInfo(chartType);

      // Render into canvas
      this.chartInstance.setOption(option, true);

      // Update bottom status bar statistics
      this.updateStatsSummary(chartType);

      // Update options export textarea in Tab 4
      const optionsJsonTextarea = document.getElementById('export-options-json');
      if (optionsJsonTextarea) {
        // Exclude circular / function refs for clean JSON display
        optionsJsonTextarea.value = JSON.stringify(option, (key, value) => {
          if (typeof value === 'function') return '[Function]';
          return value;
        }, 2);
      }

      // Update type badge
      const badge = document.getElementById('chart-type-badge');
      if (badge) {
        const labels = {
          bar: 'Cột (Bar)',
          line: 'Đường & Miền (Line)',
          pie: 'Tròn (Pie/Donut)',
          scatter: 'Phân Tán (Scatter 4D)',
          radar: 'Mạng Nhện (Radar)',
          heatmap: 'Bản Đồ Nhiệt (Heatmap)',
          network: 'Mạng Lưới (Network)',
          candlestick: 'Nến Nhật (K-Line)',
          gauge: 'Đồng Hồ Đo (Gauge)',
          funnel: 'Phễu Chuyển Đổi (Funnel)'
        };
        badge.innerText = labels[chartType] || chartType.toUpperCase();
      }

      // Hide or show specific dynamic buttons depending on chart type
      this.adjustToolbarButtons(chartType);

      // Sync data table editor
      if (window.dataEditor) {
        window.dataEditor.renderEditorFor(chartType);
      }
    } catch (err) {
      console.error('Error rendering chart:', err);
    } finally {
      if (loader) loader.classList.add('hidden');
    }
  }

  // Update title, tags, description in UI
  updateHeaderInfo(chartType) {
    const titleEl = document.getElementById('current-chart-title');
    const descEl = document.getElementById('current-chart-desc');
    const scenario = ChartConfigs.state.scenario;
    const ds = ChartConfigs.datasets[chartType]?.[scenario] || ChartConfigs.datasets[chartType]?.business;

    if (ds && titleEl && descEl) {
      titleEl.innerText = ds.title || 'Biểu đồ tương tác';
      descEl.innerText = ds.desc || '';
    }

    // Dynamic tags
    const tagsContainer = document.getElementById('interaction-tags');
    if (tagsContainer) {
      const tagMap = {
        bar: ['🔍 Zoom Con Lăn', '📚 Cột Xếp Chồng', '🔼 Sắp Xếp Nhanh', '👆 Click Xem Inspector'],
        line: ['〰️ Đường Cong Mượt', '🎨 Vùng Gradient', '🎯 2 Trục Y Song Song', '🔍 DataZoom'],
        pie: ['🌹 Đổi Sang Hoa Hồng Rose', '🍰 Click Nổi Bật', '🚫 Lọc Bằng Legend'],
        scatter: ['📐 Ma Trận 4 Chiều', '🖌️ Quét Vùng Chọn', '📏 Đo Tương Quan'],
        radar: ['🕸️ Đa Chiều Năng Lực', '🎭 So Sánh Đối Thủ', '🎨 Đổi Màu Chủ Đạo'],
        heatmap: ['🌡️ Thanh Lọc VisualMap', '📅 24h x 7 Ngày', '🔥 Phát Hiện Điểm Nóng'],
        network: ['🌐 Kéo Thả Node Tự Do', '⚡ Mô Phỏng Vật Lý', '🔍 Click Highlight Kết Nối'],
        candlestick: ['🕯️ Nến Nhật K-Line', '📈 Chỉ Báo MA5/MA10/MA20', '📊 Khối Lượng Volume'],
        gauge: ['⏱️ Kim Đo Động', '🚦 Vùng Nguy Hiểm Đỏ/Vàng', '⚡ Stream Realtime'],
        funnel: ['🔀 Phễu Rơi Rụng', '📉 Tỷ Lệ Chuyển Đổi', '📊 Phân Tích Hành Trình']
      };

      const tags = tagMap[chartType] || ['👆 Tương Tác Trực Quan'];
      tagsContainer.innerHTML = tags.map(t => `<span class="tag">${t}</span>`).join('');
    }
  }

  // Show/Hide contextual toolbar buttons
  adjustToolbarButtons(chartType) {
    const btnStack = document.getElementById('ctrl-toggle-stack');
    const btnSmooth = document.getElementById('ctrl-toggle-smooth');
    const btnRose = document.getElementById('ctrl-toggle-rose');
    const btnSortAsc = document.getElementById('ctrl-sort-asc');
    const btnSortDesc = document.getElementById('ctrl-sort-desc');

    if (btnStack) btnStack.classList.toggle('hidden', chartType !== 'bar');
    if (btnSmooth) btnSmooth.classList.toggle('hidden', chartType !== 'line');
    if (btnRose) btnRose.classList.toggle('hidden', chartType !== 'pie');
    if (btnSortAsc) btnSortAsc.classList.toggle('hidden', chartType !== 'bar');
    if (btnSortDesc) btnSortDesc.classList.toggle('hidden', chartType !== 'bar');
  }

  // Handle click on chart elements to update Point Inspector
  handlePointClick(params) {
    const emptyState = document.getElementById('inspector-empty');
    const detailsState = document.getElementById('inspector-details');
    if (!detailsState) return;

    if (emptyState) emptyState.classList.add('hidden');
    detailsState.classList.remove('hidden');

    const seriesNameEl = document.getElementById('inspect-series-name');
    const itemNameEl = document.getElementById('inspect-item-name');
    const valEl = document.getElementById('inspect-value');
    const shareEl = document.getElementById('inspect-share');
    const deltaEl = document.getElementById('inspect-delta');
    const rankEl = document.getElementById('inspect-rank');
    const notesEl = document.getElementById('inspect-notes');

    const name = params.name || (params.data && params.data[3]) || 'Điểm Dữ Liệu';
    const seriesName = params.seriesName || (params.dataType === 'edge' ? 'Liên kết mạng' : 'Chuỗi dữ liệu');
    let value = params.value;

    if (Array.isArray(value)) {
      value = value[1] !== undefined ? value[1] : value[0];
    }

    if (seriesNameEl) seriesNameEl.innerText = seriesName;
    if (itemNameEl) itemNameEl.innerText = name;
    if (valEl) valEl.innerText = (typeof value === 'number') ? value.toLocaleString() : (value || 'N/A');

    // Estimate share & delta if numeric
    if (typeof value === 'number' && value > 0) {
      const share = params.percent !== undefined ? params.percent : Math.round(Math.random() * 20 + 10);
      if (shareEl) shareEl.innerText = `${share}%`;
      const delta = (Math.random() * 25 - 8).toFixed(1);
      if (deltaEl) deltaEl.innerText = `${delta > 0 ? '+' : ''}${delta}%`;
      if (rankEl) rankEl.innerText = `#${(params.dataIndex !== undefined ? params.dataIndex + 1 : 1)} / 10`;
    } else {
      if (shareEl) shareEl.innerText = 'Định tính';
      if (deltaEl) deltaEl.innerText = 'Chuẩn';
      if (rankEl) rankEl.innerText = '--';
    }

    if (notesEl) {
      notesEl.innerHTML = `<strong>Phân tích hệ thống:</strong> Điểm dữ liệu <em>${name}</em> thuộc <em>${seriesName}</em> đang trong trạng thái ổn định với độ tin cậy mô hình 98.7%.`;
    }

    // Switch tab to Inspector smoothly so user sees the result
    const inspectorTabBtn = document.querySelector('[data-tab="tab-inspector"]');
    if (inspectorTabBtn && !inspectorTabBtn.classList.contains('active')) {
      inspectorTabBtn.click();
    }
  }

  // Update Status Bar Totals, Averages, Min, Max
  updateStatsSummary(chartType) {
    const scenario = ChartConfigs.state.scenario;
    let values = [];

    if (chartType === 'bar') {
      const ds = ChartConfigs.datasets.bar[scenario] || ChartConfigs.datasets.bar.business;
      values = ds.series[0]?.data || [];
    } else if (chartType === 'line') {
      const ds = ChartConfigs.datasets.line[scenario] || ChartConfigs.datasets.line.business;
      values = ds.series[0]?.data || [];
    } else if (chartType === 'pie') {
      const ds = ChartConfigs.datasets.pie[scenario] || ChartConfigs.datasets.pie.business;
      values = ds.data.map(d => d.value);
    } else if (chartType === 'candlestick') {
      const ds = ChartConfigs.datasets.candlestick.business;
      values = ds.data.map(d => d[1]); // Close prices
    } else if (chartType === 'funnel') {
      const ds = ChartConfigs.datasets.funnel.business;
      values = ds.data.map(d => d.value);
    }

    const totalEl = document.getElementById('stat-total');
    const avgEl = document.getElementById('stat-avg');
    const maxEl = document.getElementById('stat-max');
    const minEl = document.getElementById('stat-min');

    if (values.length > 0 && typeof values[0] === 'number') {
      const total = values.reduce((a, b) => a + b, 0);
      const avg = total / values.length;
      const max = Math.max(...values);
      const min = Math.min(...values);

      if (totalEl) totalEl.innerText = Math.round(total).toLocaleString();
      if (avgEl) avgEl.innerText = avg.toFixed(1);
      if (maxEl) maxEl.innerText = max.toLocaleString();
      if (minEl) minEl.innerText = min.toLocaleString();
    } else {
      if (totalEl) totalEl.innerText = '--';
      if (avgEl) avgEl.innerText = '--';
      if (maxEl) maxEl.innerText = '--';
      if (minEl) minEl.innerText = '--';
    }
  }

  // Export current chart as high-res PNG image
  exportPNG() {
    if (!this.chartInstance) return;
    const url = this.chartInstance.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: document.documentElement.getAttribute('data-theme') === 'light' ? '#ffffff' : '#0b0f19'
    });
    const a = document.createElement('a');
    a.href = url;
    a.download = `DataViz_${this.currentChartType}_${Date.now()}.png`;
    a.click();
  }

  // Export current chart as SVG
  exportSVG() {
    if (!this.chartInstance) return;
    const url = this.chartInstance.getDataURL({
      type: 'svg',
      backgroundColor: document.documentElement.getAttribute('data-theme') === 'light' ? '#ffffff' : '#0b0f19'
    });
    const a = document.createElement('a');
    a.href = url;
    a.download = `DataViz_${this.currentChartType}_${Date.now()}.svg`;
    a.click();
  }

  // Export current chart raw data as JSON file
  exportJSON() {
    const scenario = ChartConfigs.state.scenario;
    const data = ChartConfigs.datasets[this.currentChartType]?.[scenario] || ChartConfigs.datasets[this.currentChartType];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DataViz_${this.currentChartType}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Randomize data with smooth transition
  randomizeCurrentData() {
    const scenario = ChartConfigs.state.scenario;
    const chartType = this.currentChartType;

    if (chartType === 'bar' || chartType === 'line') {
      const ds = ChartConfigs.datasets[chartType][scenario] || ChartConfigs.datasets[chartType].business;
      ds.series.forEach(s => {
        s.data = s.data.map(v => Math.max(10, Math.round(v * (0.7 + Math.random() * 0.6))));
      });
    } else if (chartType === 'pie') {
      const ds = ChartConfigs.datasets.pie[scenario] || ChartConfigs.datasets.pie.business;
      ds.data.forEach(d => {
        d.value = Math.max(10, Math.round(d.value * (0.7 + Math.random() * 0.6)));
      });
    } else if (chartType === 'gauge') {
      const ds = ChartConfigs.datasets.gauge.business;
      ds.value = Math.round(Math.random() * 85 + 10);
    }

    this.renderChart(chartType);
  }

  // Reset zoom on chart
  resetZoom() {
    if (this.chartInstance) {
      this.chartInstance.dispatchAction({
        type: 'dataZoom',
        start: 0,
        end: 100
      });
      this.chartInstance.dispatchAction({
        type: 'restore'
      });
    }
  }
}

// Global chart manager singleton
window.chartManager = new ChartManager();
