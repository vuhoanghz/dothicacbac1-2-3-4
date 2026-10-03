/**
 * DataViz Studio - Real-Time Live Streaming Simulation
 * Simulates high-frequency IoT / Financial market streaming updates into active charts
 */

class LiveStreamSimulator {
  constructor() {
    this.timerId = null;
    this.isStreaming = false;
    this.speedMs = 1000;
    this.streamBtn = document.getElementById('live-stream-btn');
    this.streamText = document.getElementById('stream-btn-text');
    this.speedSelect = document.getElementById('stream-speed-select');
    this.streamPill = document.getElementById('stream-control-pill');
  }

  init() {
    if (this.streamBtn) {
      this.streamBtn.addEventListener('click', () => this.toggleStream());
    }

    if (this.speedSelect) {
      this.speedSelect.addEventListener('change', (e) => {
        this.speedMs = parseInt(e.target.value, 10) || 1000;
        if (this.isStreaming) {
          this.stop();
          this.start();
        }
      });
    }
  }

  toggleStream() {
    if (this.isStreaming) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.isStreaming = true;
    if (this.streamBtn) this.streamBtn.classList.add('streaming');
    if (this.streamText) this.streamText.innerText = 'Đang Stream...';

    window.dataEditor.showToast('🚀 Đã kích hoạt dòng dữ liệu thời gian thực!', 'success');

    this.timerId = setInterval(() => {
      this.tick();
    }, this.speedMs);
  }

  stop() {
    this.isStreaming = false;
    if (this.streamBtn) this.streamBtn.classList.remove('streaming');
    if (this.streamText) this.streamText.innerText = 'Dữ liệu tĩnh';

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    window.dataEditor.showToast('Tạm dừng stream dữ liệu', 'warning');
  }

  // Periodic tick executing real-time data push
  tick() {
    const chartType = window.chartManager.currentChartType;
    const scenario = ChartConfigs.state.scenario;

    if (chartType === 'line') {
      const ds = ChartConfigs.datasets.line[scenario] || ChartConfigs.datasets.line.business;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      // Shift out oldest, push newest
      if (ds.categories.length > 15) {
        ds.categories.shift();
        ds.series.forEach(s => s.data.shift());
      }

      ds.categories.push(timeStr);
      ds.series.forEach((s, idx) => {
        const lastVal = s.data[s.data.length - 1] || 50;
        const delta = (Math.random() - 0.48) * (idx === 0 ? 80 : 0.8);
        const newVal = Math.max(1, parseFloat((lastVal + delta).toFixed(1)));
        s.data.push(newVal);
      });

      window.chartManager.renderChart('line');

    } else if (chartType === 'gauge') {
      const ds = ChartConfigs.datasets.gauge.business;
      const fluctuation = (Math.random() - 0.5) * 16;
      ds.value = Math.min(100, Math.max(15, parseFloat((ds.value + fluctuation).toFixed(1))));

      if (window.chartManager.chartInstance) {
        window.chartManager.chartInstance.setOption({
          series: [{ data: [{ value: ds.value, name: ds.titleName }] }]
        });
        window.chartManager.updateStatsSummary('gauge');
      }

    } else if (chartType === 'bar') {
      const ds = ChartConfigs.datasets.bar[scenario] || ChartConfigs.datasets.bar.business;
      // Slight fluctuation on random bar
      const targetSeries = ds.series[Math.floor(Math.random() * ds.series.length)];
      if (targetSeries && targetSeries.data.length > 0) {
        const rIdx = Math.floor(Math.random() * targetSeries.data.length);
        const delta = Math.round((Math.random() - 0.45) * 50);
        targetSeries.data[rIdx] = Math.max(10, targetSeries.data[rIdx] + delta);
        window.chartManager.renderChart('bar');
      }

    } else if (chartType === 'candlestick') {
      const ds = ChartConfigs.datasets.candlestick.business;
      const lastCandle = ds.data[ds.data.length - 1];
      const open = lastCandle[1]; // Next open is previous close
      const delta = (Math.random() - 0.48) * 1.5;
      const close = parseFloat((open + delta).toFixed(2));
      const high = parseFloat((Math.max(open, close) + Math.random() * 0.8).toFixed(2));
      const low = parseFloat((Math.min(open, close) - Math.random() * 0.8).toFixed(2));

      const now = new Date();
      const dateStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      if (ds.dates.length > 25) {
        ds.dates.shift();
        ds.data.shift();
        ds.volumes.shift();
      }

      ds.dates.push(dateStr);
      ds.data.push([open, close, low, high]);
      ds.volumes.push(Math.round(1500 + Math.random() * 3000));

      window.chartManager.renderChart('candlestick');
    }
  }
}

// Global live stream simulator singleton
window.liveStream = new LiveStreamSimulator();
