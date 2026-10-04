/**
 * MathViz Lab - Interactive Mathematical Polynomial Exploration Engine
 * Calculates derivatives, variation tables, critical points, tangent lines, and real-world models.
 */

class MathApp {
  constructor() {
    this.currentDegree = '3'; // Default to degree 3 (richest variation)
    this.chart = null;
    this.x0 = 1.0; // Current tangent touch point

    // Default coefficients per degree
    this.coefficients = {
      '1': { a: 1.0, b: 2.0 },
      '2': { a: 1.0, b: -2.0, c: -3.0 },
      '3': { a: 1.0, b: -3.0, c: 0.0, d: 2.0 },
      '4-biquadratic': { a: 1.0, b: -4.0, c: 3.0 },
      '4-general': { a: 0.5, b: -1.0, c: -2.0, d: 2.0, e: 1.0 }
    };

    // Quick presets
    this.presets = {
      '1': [
        { name: 'Đồng biến (a > 0)', vals: { a: 1.5, b: 1.0 } },
        { name: 'Nghịch biến (a < 0)', vals: { a: -2.0, b: 3.0 } },
        { name: 'Qua gốc O (b = 0)', vals: { a: 2.0, b: 0.0 } },
        { name: 'Hàm hằng (a = 0)', vals: { a: 0.0, b: 2.5 } }
      ],
      '2': [
        { name: '2 Nghiệm phân biệt (Δ > 0)', vals: { a: 1.0, b: -2.0, c: -3.0 } },
        { name: 'Nghiệm kép (Δ = 0)', vals: { a: 1.0, b: -4.0, c: 4.0 } },
        { name: 'Vô nghiệm (Δ < 0)', vals: { a: 1.0, b: 2.0, c: 3.0 } },
        { name: 'Bề lõm quay xuống (a < 0)', vals: { a: -1.0, b: 2.0, c: 1.0 } }
      ],
      '3': [
        { name: '2 Cực trị (a > 0)', vals: { a: 1.0, b: -3.0, c: 0.0, d: 2.0 } },
        { name: '2 Cực trị (a < 0)', vals: { a: -1.0, b: 3.0, c: 0.0, d: -1.0 } },
        { name: 'Không cực trị (Đơn điệu)', vals: { a: 1.0, b: 0.0, c: 3.0, d: 0.0 } },
        { name: 'Điểm uốn tại gốc O', vals: { a: 1.0, b: 0.0, c: -3.0, d: 0.0 } }
      ],
      '4-biquadratic': [
        { name: '3 Cực trị hình W (ab < 0, a > 0)', vals: { a: 1.0, b: -4.0, c: 3.0 } },
        { name: '3 Cực trị hình M (ab < 0, a < 0)', vals: { a: -1.0, b: 4.0, c: -1.0 } },
        { name: '1 Cực trị (ab ≥ 0, a > 0)', vals: { a: 1.0, b: 2.0, c: 1.0 } },
        { name: '1 Cực trị (ab ≥ 0, a < 0)', vals: { a: -1.0, b: -2.0, c: 2.0 } }
      ],
      '4-general': [
        { name: '3 Cực trị bất đối xứng', vals: { a: 0.5, b: -1.0, c: -2.0, d: 2.0, e: 1.0 } },
        { name: 'Dốc nghiêng 1 hố sâu', vals: { a: 0.4, b: 1.2, c: 0.5, d: -3.0, e: 0.0 } },
        { name: 'Uốn lượn đa sóng', vals: { a: 0.3, b: -0.5, c: -3.0, d: 1.5, e: 2.0 } }
      ]
    };

    // Toggles state
    this.showDerivative = true;
    this.showTangent = true;
    this.showCriticalPoints = true;
    this.showIntegralArea = false;
  }

  init() {
    this.initChart();
    this.setupEventListeners();
    this.renderDegreeUI(this.currentDegree);
    this.update();
  }

  initChart() {
    const container = document.getElementById('math-echart');
    if (!container) return;

    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    this.chart = echarts.init(container, theme);

    window.addEventListener('resize', () => {
      if (this.chart) this.chart.resize();
    });

    // Cursor coordinates readout
    this.chart.getZr().on('mousemove', (params) => {
      const pointInPixel = [params.offsetX, params.offsetY];
      const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);
      if (pointInGrid) {
        const x = pointInGrid[0].toFixed(2);
        const y = pointInGrid[1].toFixed(2);
        const el = document.getElementById('cursor-coords');
        if (el) el.innerText = `x: ${x} , y: ${y}`;
      }
    });
  }

  setupEventListeners() {
    // Degree tabs switching
    const degreeTabs = document.querySelectorAll('.degree-tab-btn');
    degreeTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        degreeTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const deg = btn.getAttribute('data-degree');
        this.currentDegree = deg;
        this.renderDegreeUI(deg);
        this.update();
      });
    });

    // Theme selector
    const themeSelect = document.getElementById('math-theme-selector');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        const t = e.target.value;
        document.documentElement.setAttribute('data-theme', t);
        if (this.chart) {
          this.chart.dispose();
          this.initChart();
          this.update();
        }
      });
    }

    // Canvas Toggles
    document.getElementById('toggle-derivative')?.addEventListener('change', (e) => {
      this.showDerivative = e.target.checked;
      this.updateChart();
    });
    document.getElementById('toggle-tangent')?.addEventListener('change', (e) => {
      this.showTangent = e.target.checked;
      this.updateChart();
    });
    document.getElementById('toggle-critical-points')?.addEventListener('change', (e) => {
      this.showCriticalPoints = e.target.checked;
      this.updateChart();
    });
    document.getElementById('toggle-integral-area')?.addEventListener('change', (e) => {
      this.showIntegralArea = e.target.checked;
      this.updateChart();
    });

    // Reset zoom
    document.getElementById('math-reset-zoom-btn')?.addEventListener('click', () => {
      this.update();
    });

    // Export PNG
    document.getElementById('math-export-png-btn')?.addEventListener('click', () => {
      if (!this.chart) return;
      const url = this.chart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: document.documentElement.getAttribute('data-theme') === 'light' ? '#ffffff' : '#0b0f19'
      });
      const a = document.createElement('a');
      a.href = url;
      a.download = `MathViz_Bac_${this.currentDegree}_${Date.now()}.png`;
      a.click();
    });

    // Tangent point slider x0
    const sliderX0 = document.getElementById('slider-x0');
    if (sliderX0) {
      sliderX0.addEventListener('input', (e) => {
        this.x0 = parseFloat(e.target.value);
        document.getElementById('val-x0').innerText = `x₀ = ${this.x0.toFixed(2)}`;
        this.updateChart();
      });
    }

    // Right Panel Tabs
    const mathTabs = document.querySelectorAll('.math-tab-btn');
    const mathPanes = document.querySelectorAll('.math-tab-pane');
    mathTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        mathTabs.forEach(b => b.classList.remove('active'));
        mathPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId)?.classList.add('active');
      });
    });
  }

  // Render Sliders & Presets based on selected degree
  renderDegreeUI(degree) {
    const badgeMap = {
      '1': 'Hàm Bậc 1 (Tuyến Tính: y = ax + b)',
      '2': 'Hàm Bậc 2 (Parabol: y = ax² + bx + c)',
      '3': 'Hàm Bậc 3 (Cubic: y = ax³ + bx² + cx + d)',
      '4-biquadratic': 'Hàm Bậc 4 Trùng Phương: y = ax⁴ + bx² + c',
      '4-general': 'Hàm Bậc 4 Tổng Quát: y = ax⁴ + bx³ + cx² + dx + e'
    };
    document.getElementById('function-type-badge').innerText = badgeMap[degree] || 'Hàm Số Đa Thức';

    // 1. Render Presets
    const presetsWrap = document.getElementById('preset-pills');
    presetsWrap.innerHTML = '';
    const presetList = this.presets[degree] || [];
    presetList.forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.className = `preset-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerText = p.name;
      btn.addEventListener('click', () => {
        presetsWrap.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.coefficients[degree] = { ...p.vals };
        this.syncSliderInputs();
        this.update();
      });
      presetsWrap.appendChild(btn);
    });

    // 2. Render Sliders Grid
    const slidersGrid = document.getElementById('sliders-grid');
    slidersGrid.innerHTML = '';
    const currentCoeffs = this.coefficients[degree];

    const labels = {
      a: { label: 'Hệ số a (Hệ số bậc cao nhất)', desc: 'Quyết định bề lõm, chiều hướng vô cực và độ dốc' },
      b: { label: 'Hệ số b', desc: 'Ảnh hưởng đến vị trí đỉnh, trục đối xứng hoặc độ nghiêng' },
      c: { label: 'Hệ số c', desc: 'Điều khiển tung độ gốc giao với Oy hoặc độ cong' },
      d: { label: 'Hệ số d', desc: 'Tung độ gốc giao điểm với trục tung Oy' },
      e: { label: 'Hệ số e', desc: 'Tịnh tiến toàn bộ đồ thị theo phương thẳng đứng' }
    };

    Object.keys(currentCoeffs).forEach(key => {
      const val = currentCoeffs[key];
      const meta = labels[key] || { label: `Hệ số ${key}`, desc: '' };

      const minVal = (key === 'a') ? -3 : -5;
      const maxVal = (key === 'a') ? 3 : 5;

      const item = document.createElement('div');
      item.className = 'slider-item';
      item.innerHTML = `
        <div class="slider-label-row">
          <span class="param-name">${meta.label}</span>
          <span class="param-value" id="val-${key}">${key} = ${val.toFixed(1)}</span>
        </div>
        <div class="slider-track-wrap">
          <input type="range" id="slider-${key}" min="${minVal}" max="${maxVal}" step="0.1" value="${val}">
        </div>
        <span class="slider-desc">${meta.desc}</span>
      `;

      slidersGrid.appendChild(item);

      const sliderEl = item.querySelector(`#slider-${key}`);
      sliderEl.addEventListener('input', (e) => {
        const newVal = parseFloat(e.target.value);
        // Avoid a = 0 for polynomials of higher degree to preserve degree structure
        if (key === 'a' && degree !== '1' && Math.abs(newVal) < 0.05) {
          return;
        }
        currentCoeffs[key] = newVal;
        document.getElementById(`val-${key}`).innerText = `${key} = ${newVal.toFixed(1)}`;
        this.update();
      });
    });

    // Render Educational Context Tabs
    this.renderRealWorldApplications(degree);
    this.renderExamTips(degree);
  }

  syncSliderInputs() {
    const currentCoeffs = this.coefficients[this.currentDegree];
    Object.keys(currentCoeffs).forEach(key => {
      const slider = document.getElementById(`slider-${key}`);
      const valBadge = document.getElementById(`val-${key}`);
      if (slider && valBadge) {
        slider.value = currentCoeffs[key];
        valBadge.innerText = `${key} = ${currentCoeffs[key].toFixed(1)}`;
      }
    });
  }

  // Core Math Calculation Functions
  evaluateF(x) {
    const c = this.coefficients[this.currentDegree];
    switch (this.currentDegree) {
      case '1':
        return c.a * x + c.b;
      case '2':
        return c.a * x * x + c.b * x + c.c;
      case '3':
        return c.a * Math.pow(x, 3) + c.b * Math.pow(x, 2) + c.c * x + c.d;
      case '4-biquadratic':
        return c.a * Math.pow(x, 4) + c.b * Math.pow(x, 2) + c.c;
      case '4-general':
        return c.a * Math.pow(x, 4) + c.b * Math.pow(x, 3) + c.c * Math.pow(x, 2) + c.d * x + c.e;
      default:
        return 0;
    }
  }

  evaluateFPrime(x) {
    const c = this.coefficients[this.currentDegree];
    switch (this.currentDegree) {
      case '1':
        return c.a;
      case '2':
        return 2 * c.a * x + c.b;
      case '3':
        return 3 * c.a * x * x + 2 * c.b * x + c.c;
      case '4-biquadratic':
        return 4 * c.a * Math.pow(x, 3) + 2 * c.b * x;
      case '4-general':
        return 4 * c.a * Math.pow(x, 3) + 3 * c.b * Math.pow(x, 2) + 2 * c.c * x + c.d;
      default:
        return 0;
    }
  }

  evaluateFDoublePrime(x) {
    const c = this.coefficients[this.currentDegree];
    switch (this.currentDegree) {
      case '1':
        return 0;
      case '2':
        return 2 * c.a;
      case '3':
        return 6 * c.a * x + 2 * c.b;
      case '4-biquadratic':
        return 12 * c.a * Math.pow(x, 2) + 2 * c.b;
      case '4-general':
        return 12 * c.a * Math.pow(x, 2) + 6 * c.b * x + 2 * c.c;
      default:
        return 0;
    }
  }

  // Master update
  update() {
    this.updateFormulaHeaders();
    this.updateChart();
    this.updateSurveyTab();
    this.updateVariationTable();
  }

  // Update hero formula text
  updateFormulaHeaders() {
    const c = this.coefficients[this.currentDegree];
    let fText = '';
    let fPrimeText = '';

    const formatTerm = (coef, term, isFirst = false) => {
      if (coef === 0) return '';
      const sign = coef > 0 ? (isFirst ? '' : ' + ') : (isFirst ? '-' : ' - ');
      const absVal = Math.abs(coef);
      const valStr = (absVal === 1 && term !== '') ? '' : absVal.toFixed(1);
      return `${sign}${valStr}${term}`;
    };

    switch (this.currentDegree) {
      case '1':
        fText = `y = ${c.a.toFixed(1)}x ${c.b >= 0 ? '+ ' + c.b.toFixed(1) : '- ' + Math.abs(c.b).toFixed(1)}`;
        fPrimeText = `Đạo hàm: y' = ${c.a.toFixed(1)}`;
        break;
      case '2':
        fText = `y = ${c.a.toFixed(1)}x² ${c.b >= 0 ? '+ ' + c.b.toFixed(1) : '- ' + Math.abs(c.b).toFixed(1)}x ${c.c >= 0 ? '+ ' + c.c.toFixed(1) : '- ' + Math.abs(c.c).toFixed(1)}`;
        fPrimeText = `Đạo hàm: y' = ${(2 * c.a).toFixed(1)}x ${c.b >= 0 ? '+ ' + c.b.toFixed(1) : '- ' + Math.abs(c.b).toFixed(1)}`;
        break;
      case '3':
        fText = `y = ${c.a.toFixed(1)}x³ ${c.b >= 0 ? '+ ' + c.b.toFixed(1) : '- ' + Math.abs(c.b).toFixed(1)}x² ${c.c >= 0 ? '+ ' + c.c.toFixed(1) : '- ' + Math.abs(c.c).toFixed(1)}x ${c.d >= 0 ? '+ ' + c.d.toFixed(1) : '- ' + Math.abs(c.d).toFixed(1)}`;
        fPrimeText = `Đạo hàm: y' = ${(3 * c.a).toFixed(1)}x² ${c.b >= 0 ? '+ ' + (2 * c.b).toFixed(1) : '- ' + Math.abs(2 * c.b).toFixed(1)}x ${c.c >= 0 ? '+ ' + c.c.toFixed(1) : '- ' + Math.abs(c.c).toFixed(1)}`;
        break;
      case '4-biquadratic':
        fText = `y = ${c.a.toFixed(1)}x⁴ ${c.b >= 0 ? '+ ' + c.b.toFixed(1) : '- ' + Math.abs(c.b).toFixed(1)}x² ${c.c >= 0 ? '+ ' + c.c.toFixed(1) : '- ' + Math.abs(c.c).toFixed(1)}`;
        fPrimeText = `Đạo hàm: y' = ${(4 * c.a).toFixed(1)}x³ ${c.b >= 0 ? '+ ' + (2 * c.b).toFixed(1) : '- ' + Math.abs(2 * c.b).toFixed(1)}x`;
        break;
      case '4-general':
        fText = `y = ${c.a.toFixed(1)}x⁴ + ${c.b.toFixed(1)}x³ + ${c.c.toFixed(1)}x² + ${c.d.toFixed(1)}x + ${c.e.toFixed(1)}`;
        fPrimeText = `Đạo hàm: y' = ${(4 * c.a).toFixed(1)}x³ + ${(3 * c.b).toFixed(1)}x² + ${(2 * c.c).toFixed(1)}x + ${c.d.toFixed(1)}`;
        break;
    }

    document.getElementById('formula-primary').innerText = fText;
    document.getElementById('formula-derivative').innerText = fPrimeText;
  }

  // Update ECharts Coordinate Canvas
  updateChart() {
    if (!this.chart) return;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const textColor = isDark ? '#e2e8f0' : '#1e293b';
    const axisColor = isDark ? '#64748b' : '#94a3b8';
    const splitLineColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

    // Domain bounds
    const xMin = -6;
    const xMax = 6;
    const step = 0.05;

    const fxData = [];
    const fPrimeData = [];

    for (let x = xMin; x <= xMax; x += step) {
      const y = this.evaluateF(x);
      const dy = this.evaluateFPrime(x);
      // Clamp to prevent extreme infinite lines breaking the chart canvas
      if (Math.abs(y) <= 30) fxData.push([parseFloat(x.toFixed(2)), parseFloat(y.toFixed(2))]);
      if (Math.abs(dy) <= 30) fPrimeData.push([parseFloat(x.toFixed(2)), parseFloat(dy.toFixed(2))]);
    }

    // Tangent line calculation at this.x0
    const y0 = this.evaluateF(this.x0);
    const k = this.evaluateFPrime(this.x0);
    const tangentPoints = [];
    const tanSpan = 2.5;
    const tX1 = this.x0 - tanSpan;
    const tX2 = this.x0 + tanSpan;
    tangentPoints.push([tX1, k * (tX1 - this.x0) + y0]);
    tangentPoints.push([tX2, k * (tX2 - this.x0) + y0]);

        // Update floating tangent box if present
    const tanX0El = document.getElementById('tan-x0');
    if (tanX0El) {
      const m = (y0 - k * this.x0);
      tanX0El.innerText = this.x0.toFixed(2);
      const tanY0El = document.getElementById('tan-y0');
      if (tanY0El) tanY0El.innerText = y0.toFixed(2);
      const tanKEl = document.getElementById('tan-k');
      if (tanKEl) tanKEl.innerText = k.toFixed(2);
      const tanEqEl = document.getElementById('tan-equation');
      if (tanEqEl) tanEqEl.innerText = `y = ${k.toFixed(2)}x ${m >= 0 ? '+ ' + m.toFixed(2) : '- ' + Math.abs(m).toFixed(2)}`;
    }

    // Key points (Extrema & Inflection points)
    const markPoints = [];
    const keyPoints = this.calculateKeyPoints();

    if (this.showCriticalPoints) {
      keyPoints.extrema.forEach(pt => {
        markPoints.push({
          name: pt.type,
          coord: [pt.x, pt.y],
          value: pt.type,
          itemStyle: { color: pt.type === 'Cực Đại' ? '#ef4444' : '#10b981' }
        });
      });
      keyPoints.inflections.forEach(pt => {
        markPoints.push({
          name: 'Điểm Uốn',
          coord: [pt.x, pt.y],
          value: 'Điểm Uốn',
          itemStyle: { color: '#8b5cf6' }
        });
      });
    }

    // Assemble Series
    const series = [
      // 1. Primary f(x)
      {
        name: 'f(x)',
        type: 'line',
        data: fxData,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 3.5, color: '#3b82f6' },
        areaStyle: this.showIntegralArea ? {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.02)' }
          ])
        } : undefined,
        markPoint: {
          data: markPoints,
          symbolSize: 45,
          label: { fontSize: 10, color: '#fff' }
        }
      }
    ];

    // 2. Derivative y'(x)
    if (this.showDerivative) {
      series.push({
        name: "y'(x)",
        type: 'line',
        data: fPrimeData,
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 2, color: '#ef4444', type: 'dashed' }
      });
    }

    // 3. Tangent Line
    if (this.showTangent) {
      series.push({
        name: 'Tiếp tuyến',
        type: 'line',
        data: tangentPoints,
        showSymbol: false,
        lineStyle: { width: 2.5, color: '#f59e0b' },
        markPoint: {
          data: [{ name: 'Điểm M', coord: [this.x0, y0], itemStyle: { color: '#f59e0b' }, symbolSize: 18 }]
        }
      });
    }

    // ECharts Option
    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: { color: textColor },
        formatter: (params) => {
          let html = `<b>Tọa độ x = ${params[0].axisValue}</b><br/>`;
          params.forEach(p => {
            html += `${p.marker} ${p.seriesName}: <b>${p.data[1]}</b><br/>`;
          });
          return html;
        }
      },
      legend: {
        data: ['f(x)', ...(this.showDerivative ? ["y'(x)"] : []), ...(this.showTangent ? ['Tiếp tuyến'] : [])],
        textStyle: { color: textColor },
        top: 6
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '8%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: -6,
        max: 6,
        axisLine: { onZero: true, lineStyle: { color: axisColor, width: 2 } },
        splitLine: { show: true, lineStyle: { color: splitLineColor } },
        axisLabel: { color: textColor }
      },
      yAxis: {
        type: 'value',
        min: -15,
        max: 15,
        axisLine: { onZero: true, lineStyle: { color: axisColor, width: 2 } },
        splitLine: { show: true, lineStyle: { color: splitLineColor } },
        axisLabel: { color: textColor }
      },
      series
    };

    this.chart.setOption(option, true);

    // Update Trait tags
    const symmetryEl = document.getElementById('trait-symmetry');
    const extremaEl = document.getElementById('trait-extrema');
    if (symmetryEl && extremaEl) {
      if (this.currentDegree === '2') {
        const c = this.coefficients['2'];
        const symX = (-c.b / (2 * c.a)).toFixed(2);
        symmetryEl.innerText = `Trục đối xứng: x = ${symX}`;
      } else if (this.currentDegree === '4-biquadratic') {
        symmetryEl.innerText = 'Trục đối xứng: Trục Oy (x = 0)';
      } else if (this.currentDegree === '3') {
        const c = this.coefficients['3'];
        const inflX = (-c.b / (3 * c.a)).toFixed(2);
        symmetryEl.innerText = `Tâm đối xứng (Điểm uốn): x = ${inflX}`;
      } else {
        symmetryEl.innerText = 'Đối xứng: Không';
      }

      extremaEl.innerText = `Số cực trị: ${keyPoints.extrema.length}`;
    }
  }

  // Calculate Critical Points, Extrema & Inflections
  calculateKeyPoints() {
    const deg = this.currentDegree;
    const c = this.coefficients[deg];
    const extrema = [];
    const inflections = [];

    if (deg === '1') {
      // Degree 1 has no extrema or inflection points
    } else if (deg === '2') {
      // Degree 2 has 1 extremum at x = -b / (2a)
      const xExt = -c.b / (2 * c.a);
      const yExt = this.evaluateF(xExt);
      extrema.push({
        x: parseFloat(xExt.toFixed(2)),
        y: parseFloat(yExt.toFixed(2)),
        type: c.a > 0 ? 'Cực Tiểu' : 'Cực Đại'
      });
    } else if (deg === '3') {
      // y' = 3ax^2 + 2bx + c = 0
      // Delta' = b^2 - 3ac
      const deltaPrime = Math.pow(c.b, 2) - 3 * c.a * c.c;
      if (deltaPrime > 0) {
        const sqrtDelta = Math.sqrt(deltaPrime);
        const x1 = (-c.b - sqrtDelta) / (3 * c.a);
        const x2 = (-c.b + sqrtDelta) / (3 * c.a);
        const pts = [x1, x2].sort((p, q) => p - q);

        extrema.push({
          x: parseFloat(pts[0].toFixed(2)),
          y: parseFloat(this.evaluateF(pts[0]).toFixed(2)),
          type: c.a > 0 ? 'Cực Đại' : 'Cực Tiểu'
        });
        extrema.push({
          x: parseFloat(pts[1].toFixed(2)),
          y: parseFloat(this.evaluateF(pts[1]).toFixed(2)),
          type: c.a > 0 ? 'Cực Tiểu' : 'Cực Đại'
        });
      }

      // Inflection point: y'' = 6ax + 2b = 0 => x = -b / (3a)
      const xInfl = -c.b / (3 * c.a);
      inflections.push({
        x: parseFloat(xInfl.toFixed(2)),
        y: parseFloat(this.evaluateF(xInfl).toFixed(2))
      });
    } else if (deg === '4-biquadratic') {
      // y' = 4ax^3 + 2bx = 2x(2ax^2 + b) = 0
      // Always x = 0
      const x0 = 0;
      const y0 = this.evaluateF(x0);

      // Check if -b / (2a) > 0
      const condition = -c.b / (2 * c.a);
      if (condition > 0) {
        const x1 = -Math.sqrt(condition);
        const x2 = Math.sqrt(condition);

        if (c.a > 0) {
          extrema.push({ x: parseFloat(x1.toFixed(2)), y: parseFloat(this.evaluateF(x1).toFixed(2)), type: 'Cực Tiểu' });
          extrema.push({ x: parseFloat(x0.toFixed(2)), y: parseFloat(y0.toFixed(2)), type: 'Cực Đại' });
          extrema.push({ x: parseFloat(x2.toFixed(2)), y: parseFloat(this.evaluateF(x2).toFixed(2)), type: 'Cực Tiểu' });
        } else {
          extrema.push({ x: parseFloat(x1.toFixed(2)), y: parseFloat(this.evaluateF(x1).toFixed(2)), type: 'Cực Đại' });
          extrema.push({ x: parseFloat(x0.toFixed(2)), y: parseFloat(y0.toFixed(2)), type: 'Cực Tiểu' });
          extrema.push({ x: parseFloat(x2.toFixed(2)), y: parseFloat(this.evaluateF(x2).toFixed(2)), type: 'Cực Đại' });
        }

        // Inflections: y'' = 12ax^2 + 2b = 0 => x^2 = -b / (6a)
        const inflCond = -c.b / (6 * c.a);
        if (inflCond > 0) {
          const ix1 = -Math.sqrt(inflCond);
          const ix2 = Math.sqrt(inflCond);
          inflections.push({ x: parseFloat(ix1.toFixed(2)), y: parseFloat(this.evaluateF(ix1).toFixed(2)) });
          inflections.push({ x: parseFloat(ix2.toFixed(2)), y: parseFloat(this.evaluateF(ix2).toFixed(2)) });
        }
      } else {
        // Only 1 extremum at x = 0
        extrema.push({
          x: parseFloat(x0.toFixed(2)),
          y: parseFloat(y0.toFixed(2)),
          type: c.a > 0 ? 'Cực Tiểu' : 'Cực Đại'
        });
      }
    } else if (deg === '4-general') {
      // Numerical root finding for general quartic derivative
      // Sample critical points where y' changes sign
      for (let x = -5.8; x <= 5.8; x += 0.05) {
        const dy1 = this.evaluateFPrime(x);
        const dy2 = this.evaluateFPrime(x + 0.05);
        if (dy1 * dy2 <= 0) {
          const rootX = x + 0.025;
          const rootY = this.evaluateF(rootX);
          const d2y = this.evaluateFDoublePrime(rootX);
          extrema.push({
            x: parseFloat(rootX.toFixed(2)),
            y: parseFloat(rootY.toFixed(2)),
            type: d2y > 0 ? 'Cực Tiểu' : 'Cực Đại'
          });
        }
      }
    }

    return { extrema, inflections };
  }

  // Update Survey Tab Content
  updateSurveyTab() {
    const deg = this.currentDegree;
    const c = this.coefficients[deg];
    const keyPoints = this.calculateKeyPoints();

    // 1. Derivative display
    const derivBox = document.getElementById('step-derivative-calc');
    const varBullets = document.getElementById('step-variation-bullets');
    if (derivBox && varBullets) {
      if (deg === '1') {
        derivBox.innerHTML = `y' = ${c.a.toFixed(1)} (Hằng số với mọi x ∈ ℝ).`;
        varBullets.innerHTML = c.a > 0
          ? `<li>Vì <strong>a = ${c.a.toFixed(1)} > 0</strong> nên <strong>y' > 0</strong> với mọi x ∈ ℝ ➔ Hàm số <strong>đồng biến</strong> trên toàn bộ ℝ.</li>`
          : c.a < 0
          ? `<li>Vì <strong>a = ${c.a.toFixed(1)} < 0</strong> nên <strong>y' < 0</strong> với mọi x ∈ ℝ ➔ Hàm số <strong>nghịch biến</strong> trên toàn bộ ℝ.</li>`
          : `<li>Vì <strong>a = 0</strong> ➔ Hàm số là hàm hằng (đường thẳng nằm ngang song song trục Ox).</li>`;
      } else if (deg === '2') {
        const xExt = (-c.b / (2 * c.a)).toFixed(2);
        derivBox.innerHTML = `y' = ${(2 * c.a).toFixed(1)}x ${c.b >= 0 ? '+ ' + c.b.toFixed(1) : '- ' + Math.abs(c.b).toFixed(1)}<br/>y' = 0 ⟺ x = ${xExt}`;
        varBullets.innerHTML = c.a > 0
          ? `<li>Nghịch biến trên khoảng <strong>(-∞ ; ${xExt})</strong> vì y' < 0.</li><li>Đồng biến trên khoảng <strong>(${xExt} ; +∞)</strong> vì y' > 0.</li>`
          : `<li>Đồng biến trên khoảng <strong>(-∞ ; ${xExt})</strong> vì y' > 0.</li><li>Nghịch biến trên khoảng <strong>(${xExt} ; +∞)</strong> vì y' < 0.</li>`;
      } else if (deg === '3') {
        const deltaPrime = Math.pow(c.b, 2) - 3 * c.a * c.c;
        derivBox.innerHTML = `y' = ${(3 * c.a).toFixed(1)}x² ${c.b >= 0 ? '+ ' + (2 * c.b).toFixed(1) : '- ' + Math.abs(2 * c.b).toFixed(1)}x ${c.c >= 0 ? '+ ' + c.c.toFixed(1) : '- ' + Math.abs(c.c).toFixed(1)}<br/>Biệt thức: Δ' = b² - 3ac = <strong>${deltaPrime.toFixed(2)}</strong>`;
        if (deltaPrime > 0) {
          const x1 = keyPoints.extrema[0]?.x;
          const x2 = keyPoints.extrema[1]?.x;
          varBullets.innerHTML = c.a > 0
            ? `<li>Đồng biến trên <strong>(-∞ ; ${x1})</strong> và <strong>(${x2} ; +∞)</strong>.</li><li>Nghịch biến trên khoảng giữa <strong>(${x1} ; ${x2})</strong>.</li>`
            : `<li>Nghịch biến trên <strong>(-∞ ; ${x1})</strong> và <strong>(${x2} ; +∞)</strong>.</li><li>Đồng biến trên khoảng giữa <strong>(${x1} ; ${x2})</strong>.</li>`;
        } else {
          varBullets.innerHTML = c.a > 0
            ? `<li>Vì Δ' ≤ 0 và a > 0 nên y' ≥ 0 với mọi x ➔ Hàm số <strong>đồng biến trên toàn bộ ℝ</strong> (không có cực trị).</li>`
            : `<li>Vì Δ' ≤ 0 và a < 0 nên y' ≤ 0 với mọi x ➔ Hàm số <strong>nghịch biến trên toàn bộ ℝ</strong> (không có cực trị).</li>`;
        }
      } else if (deg === '4-biquadratic') {
        const cond = -c.b / (2 * c.a);
        derivBox.innerHTML = `y' = 4ax³ + 2bx = 2x(2ax² + b)<br/>Xét tích: a·b = ${(c.a * c.b).toFixed(2)}`;
        if (c.a * c.b < 0) {
          varBullets.innerHTML = `<li>Vì <strong>a·b < 0</strong> ➔ Phương trình y' = 0 có <strong>3 nghiệm phân biệt</strong>. Hàm số có 3 điểm cực trị (dạng đồ thị chữ ${c.a > 0 ? 'W' : 'M'}).</li>`;
        } else {
          varBullets.innerHTML = `<li>Vì <strong>a·b ≥ 0</strong> ➔ Phương trình y' = 0 chỉ có duy nhất <strong>1 nghiệm x = 0</strong>. Đồ thị có 1 điểm cực trị dạng parabol uốn.</li>`;
        }
      } else {
        derivBox.innerHTML = `y' = 4ax³ + 3bx² + 2cx + d (Đa thức bậc 3 có tối đa 3 nghiệm thực).`;
        varBullets.innerHTML = `<li>Hàm số có <strong>${keyPoints.extrema.length} điểm cực trị</strong> trên miền khảo sát.</li>`;
      }
    }

    // 2. Extrema & Limits
    const extremaSummary = document.getElementById('step-extrema-summary');
    const limitsBox = document.getElementById('step-limits');
    if (extremaSummary && limitsBox) {
      if (keyPoints.extrema.length > 0) {
        extremaSummary.innerHTML = keyPoints.extrema.map(e => `<div>● Điểm <strong>${e.type}</strong>: (${e.x} ; ${e.y})</div>`).join('');
      } else {
        extremaSummary.innerHTML = `<em>Hàm số không có điểm cực trị nào.</em>`;
      }

      if (deg === '1' || deg === '3') {
        const sign = c.a > 0 ? 1 : -1;
        limitsBox.innerHTML = `
          lim(x ➔ -∞) y = ${sign > 0 ? '-∞' : '+∞'}&nbsp;&nbsp;|&nbsp;&nbsp;
          lim(x ➔ +∞) y = ${sign > 0 ? '+∞' : '-∞'}
        `;
      } else {
        // Even degrees 2 and 4
        const target = c.a > 0 ? '+∞' : '-∞';
        limitsBox.innerHTML = `lim(x ➔ -∞) y = <strong>${target}</strong>&nbsp;&nbsp;|&nbsp;&nbsp;lim(x ➔ +∞) y = <strong>${target}</strong>`;
      }
    }

    // 3. Symmetry & Inflection
    const symmBox = document.getElementById('step-symmetry-inflection');
    if (symmBox) {
      if (deg === '2') {
        const xExt = (-c.b / (2 * c.a)).toFixed(2);
        symmBox.innerHTML = `<p>Đồ thị là đường Parabol có <strong>trục đối xứng là đường thẳng x = ${xExt}</strong> và đỉnh I(${xExt} ; ${this.evaluateF(parseFloat(xExt)).toFixed(2)}).</p>`;
      } else if (deg === '3') {
        const xU = (-c.b / (3 * c.a)).toFixed(2);
        const yU = this.evaluateF(parseFloat(xU)).toFixed(2);
        symmBox.innerHTML = `<p>Đồ thị luôn nhận <strong>điểm uốn U(${xU} ; ${yU})</strong> làm <strong>tâm đối xứng</strong> (nghiệm của phương trình đạo hàm cấp hai y'' = 6ax + 2b = 0).</p>`;
      } else if (deg === '4-biquadratic') {
        symmBox.innerHTML = `<p>Vì f(-x) = f(x) (hàm số chẵn) nên đồ thị luôn nhận <strong>trục tung Oy (đường thẳng x = 0) làm trục đối xứng</strong>.</p>`;
      } else {
        symmBox.innerHTML = `<p>Hàm số bậc 1 là đường thẳng; hàm bậc 4 tổng quát có thể không đối xứng qua trục cố định.</p>`;
      }
    }

    // 4. Special Points Table
    const ptsBody = document.getElementById('special-points-body');
    if (ptsBody) {
      ptsBody.innerHTML = '';
      // Giao Oy
      const yInter = this.evaluateF(0);
      ptsBody.innerHTML += `<tr><td>Giao trục tung (Oy)</td><td>0.00</td><td>${yInter.toFixed(2)}</td><td>Tọa độ gốc khi x = 0</td></tr>`;

      keyPoints.extrema.forEach(pt => {
        ptsBody.innerHTML += `<tr><td>${pt.type}</td><td>${pt.x}</td><td>${pt.y}</td><td>Điểm uốn chuyển hướng tiếp tuyến k = 0</td></tr>`;
      });

      keyPoints.inflections.forEach(pt => {
        ptsBody.innerHTML += `<tr><td>Điểm Uốn</td><td>${pt.x}</td><td>${pt.y}</td><td>Tâm đối xứng / Điểm đổi độ lồi lõm (y'' = 0)</td></tr>`;
      });
    }
  }

  // Update Dynamic Variation Table (Bảng Biến Thiên)
  updateVariationTable() {
    const tableWrap = document.getElementById('sign-table-wrapper');
    const notesWrap = document.getElementById('sign-table-notes');
    if (!tableWrap) return;

    const deg = this.currentDegree;
    const c = this.coefficients[deg];
    const keyPoints = this.calculateKeyPoints();
    const extrema = keyPoints.extrema;

    let xCells = '<th>x</th><td>-∞</td>';
    let yPrimeCells = '<th>y\'</th>';
    let yCells = '<th>y</th>';

    if (deg === '1') {
      const signClass = c.a > 0 ? 'sign-plus' : 'sign-minus';
      const signSym = c.a > 0 ? '+' : '-';
      const arrow = c.a > 0 ? '<span class="arrow-up">↗</span>' : '<span class="arrow-down">↘</span>';

      xCells += '<td>+∞</td>';
      yPrimeCells += `<td colspan="2" class="${signClass}">${signSym}</td>`;
      yCells += `<td>${c.a > 0 ? '-∞' : '+∞'}</td><td>${arrow}</td><td>${c.a > 0 ? '+∞' : '-∞'}</td>`;

      if (notesWrap) {
        notesWrap.innerHTML = `<strong>Nhận xét:</strong> Hàm số bậc 1 có đạo hàm là hằng số. Đồ thị là một đường thẳng đơn điệu trên toàn bộ tập xác định ℝ.`;
      }

    } else if (deg === '2') {
      const xExt = extrema[0]?.x || 0;
      const yExt = extrema[0]?.y || 0;

      xCells += `<td>${xExt}</td><td>+∞</td>`;

      if (c.a > 0) {
        yPrimeCells += `<td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td>`;
        yCells += `<td>+∞</td><td><span class="arrow-down">↘</span></td><td class="val-node">${yExt} (CT)</td><td><span class="arrow-up">↗</span></td><td>+∞</td>`;
      } else {
        yPrimeCells += `<td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td>`;
        yCells += `<td>-∞</td><td><span class="arrow-up">↗</span></td><td class="val-node">${yExt} (CĐ)</td><td><span class="arrow-down">↘</span></td><td>-∞</td>`;
      }

      if (notesWrap) {
        notesWrap.innerHTML = `<strong>Quy tắc xét dấu Parabol:</strong> Đạo hàm nhị thức bậc nhất y' = 2ax + b đổi dấu một lần qua nghiệm x = -b/(2a).`;
      }

    } else if (deg === '3') {
      if (extrema.length === 2) {
        const [p1, p2] = extrema;
        xCells += `<td>${p1.x}</td><td></td><td>${p2.x}</td><td>+∞</td>`;

        if (c.a > 0) {
          yPrimeCells += `<td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td>`;
          yCells += `
            <td>-∞</td>
            <td><span class="arrow-up">↗</span></td>
            <td class="val-node">${p1.y} (CĐ)</td>
            <td><span class="arrow-down">↘</span></td>
            <td class="val-node">${p2.y} (CT)</td>
            <td><span class="arrow-up">↗</span></td>
            <td>+∞</td>
          `;
        } else {
          yPrimeCells += `<td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td>`;
          yCells += `
            <td>+∞</td>
            <td><span class="arrow-down">↘</span></td>
            <td class="val-node">${p1.y} (CT)</td>
            <td><span class="arrow-up">↗</span></td>
            <td class="val-node">${p2.y} (CĐ)</td>
            <td><span class="arrow-down">↘</span></td>
            <td>-∞</td>
          `;
        }
      } else {
        // No extrema
        const signSym = c.a > 0 ? '+' : '-';
        const signClass = c.a > 0 ? 'sign-plus' : 'sign-minus';
        const arrow = c.a > 0 ? '<span class="arrow-up">↗</span>' : '<span class="arrow-down">↘</span>';

        xCells += `<td>+∞</td>`;
        yPrimeCells += `<td class="${signClass}">${signSym}</td>`;
        yCells += `<td>${c.a > 0 ? '-∞' : '+∞'}</td><td>${arrow}</td><td>${c.a > 0 ? '+∞' : '-∞'}</td>`;
      }

      if (notesWrap) {
        notesWrap.innerHTML = `<strong>Quy tắc xét dấu Tam thức bậc hai y':</strong> <em>"Trong trái, ngoài cùng"</em> - Dấu của y' bên ngoài hai nghiệm cùng dấu với a, bên trong hai nghiệm trái dấu với a.`;
      }

    } else if (deg === '4-biquadratic') {
      if (extrema.length === 3) {
        const [p1, p2, p3] = extrema;
        xCells += `<td>${p1.x}</td><td></td><td>${p2.x}</td><td></td><td>${p3.x}</td><td>+∞</td>`;

        if (c.a > 0) {
          // W-shape
          yPrimeCells += `<td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td>`;
          yCells += `
            <td>+∞</td>
            <td><span class="arrow-down">↘</span></td>
            <td class="val-node">${p1.y} (CT)</td>
            <td><span class="arrow-up">↗</span></td>
            <td class="val-node">${p2.y} (CĐ)</td>
            <td><span class="arrow-down">↘</span></td>
            <td class="val-node">${p3.y} (CT)</td>
            <td><span class="arrow-up">↗</span></td>
            <td>+∞</td>
          `;
        } else {
          // M-shape
          yPrimeCells += `<td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td>`;
          yCells += `
            <td>-∞</td>
            <td><span class="arrow-up">↗</span></td>
            <td class="val-node">${p1.y} (CĐ)</td>
            <td><span class="arrow-down">↘</span></td>
            <td class="val-node">${p2.y} (CT)</td>
            <td><span class="arrow-up">↗</span></td>
            <td class="val-node">${p3.y} (CĐ)</td>
            <td><span class="arrow-down">↘</span></td>
            <td>-∞</td>
          `;
        }
      } else {
        // 1 extremum
        const p = extrema[0];
        xCells += `<td>${p?.x || 0}</td><td>+∞</td>`;
        if (c.a > 0) {
          yPrimeCells += `<td class="sign-minus">-</td><td class="sign-zero">0</td><td class="sign-plus">+</td>`;
          yCells += `<td>+∞</td><td><span class="arrow-down">↘</span></td><td class="val-node">${p?.y || 0} (CT)</td><td><span class="arrow-up">↗</span></td><td>+∞</td>`;
        } else {
          yPrimeCells += `<td class="sign-plus">+</td><td class="sign-zero">0</td><td class="sign-minus">-</td>`;
          yCells += `<td>-∞</td><td><span class="arrow-up">↗</span></td><td class="val-node">${p?.y || 0} (CĐ)</td><td><span class="arrow-down">↘</span></td><td>-∞</td>`;
        }
      }

      if (notesWrap) {
        notesWrap.innerHTML = `<strong>Quy tắc nhận diện hàm trùng phương:</strong> Nếu <em>ab &lt; 0</em> có 3 điểm cực trị (2 cực tiểu 1 cực đại khi a &gt; 0, hoặc 2 cực đại 1 cực tiểu khi a &lt; 0). Nếu <em>ab ≥ 0</em> chỉ có đúng 1 điểm cực trị tại gốc x = 0.`;
      }
    } else {
      // General quartic
      xCells += `<td>...</td><td>+∞</td>`;
      yPrimeCells += `<td colspan="2">Biến thiên theo ${extrema.length} nghiệm</td>`;
      yCells += `<td>Tọa độ đa cực trị</td>`;
    }

    tableWrap.innerHTML = `
      <table class="sign-table">
        <tr>${xCells}</tr>
        <tr>${yPrimeCells}</tr>
        <tr>${yCells}</tr>
      </table>
    `;
  }

  // Render Real-World Explanations Tab
  renderRealWorldApplications(degree) {
    const wrap = document.getElementById('realworld-container');
    if (!wrap) return;

    const data = {
      '1': [
        {
          icon: '🚗',
          title: 'Vận Tốc & Quãng Đường Chuyển Động Thẳng Đều',
          desc: 'Trong cơ học cổ điển, quãng đường s đi được của một vật chuyển động với vận tốc không đổi v theo thời gian t là một hàm số bậc nhất.',
          formula: 's(t) = v·t + s₀  (với a = v là hệ số góc, b = s₀ là vị trí ban đầu)'
        },
        {
          icon: '⚡',
          title: 'Định Luật Ohm Trong Kỹ Thuật Điện Tử',
          desc: 'Hiệu điện thế U trên hai đầu điện trở thuần tỷ lệ thuận bậc nhất với cường độ dòng điện I chạy qua nó.',
          formula: 'U = R·I  (với a = R là điện trở, b = 0)'
        },
        {
          icon: '💰',
          title: 'Kinh Tế Học: Mô Hình Chi Phí Doanh Nghiệp',
          desc: 'Tổng chi phí sản xuất gồm Chi phí cố định F (mặt bằng, máy móc) và Chi phí biến đổi trên mỗi đơn vị sản phẩm c.',
          formula: 'Total Cost C(x) = c·x + F'
        }
      ],
      '2': [
        {
          icon: '🏀',
          title: 'Quỹ Đạo Ném Xiên Trong Vật Lý & Thể Thao',
          desc: 'Khi ném một quả bóng rổ, bắn đạn pháo hoặc phóng tên lửa dưới tác dụng của trọng trường g, quỹ đạo bay trong không gian luôn là một đường Parabol có bề lõm quay xuống (a < 0). Điểm cực đại chính là độ cao tối đa (tầm bay cao).',
          formula: 'y(x) = - (g / (2·v₀²·cos²α))·x² + (tan α)·x + y₀'
        },
        {
          icon: '📡',
          title: 'Ăng-ten Chảo & Gương Phản Xạ Parabol',
          desc: 'Mọi tia sóng song song chiếu vào lòng chảo parabol đều phản xạ hội tụ chính xác tại 1 điểm duy nhất (tiêu điểm F). Ứng dụng để thu tín hiệu vệ tinh vũ trụ, đèn pha ô tô và kính thiên văn không gian James Webb.',
          formula: 'y = (1 / 4f)·x²'
        },
        {
          icon: '📈',
          title: 'Kinh Doanh: Tối Đa Hóa Lợi Nhuận Biên',
          desc: 'Hàm doanh thu thường tăng lúc đầu khi hạ giá để tăng số lượng bán, nhưng nếu hạ quá nhiều doanh thu sẽ giảm. Đỉnh Parabol cho ta mức giá tối ưu để thu về lợi nhuận cao nhất.',
          formula: 'Profit P(x) = -a·x² + b·x - c  (Cực đại tại x = b / 2a)'
        }
      ],
      '3': [
        {
          icon: '🏎️',
          title: 'Thiết Kế Đường Cong Chuyển Tiếp (Cao Tốc & Tàu Siêu Tốc)',
          desc: 'Khi xe chạy từ đoạn đường thẳng sang khúc cua tròn, nếu bẻ lái đột ngột lực ly tâm sẽ làm xe lật. Các kỹ sư giao thông sử dụng đường cong bậc 3 (Clothoid / Cubic Transition Curve) để bán kính cong biến thiên tuyến tính, giúp hành khách êm ái khi vào cua.',
          formula: 'y = (1 / 6R·L)·x³'
        },
        {
          icon: '🎨',
          title: 'Đồ Họa Máy Tính: Đường Cong Bezier & Font Chữ Vector',
          desc: 'Mọi font chữ đẹp trên máy tính (TrueType, OpenType) và đường cong mượt mà trong Photoshop/Figma đều được dựng từ đường cong tham số bậc 3 (Cubic Bezier Spline) với 4 điểm điều khiển.',
          formula: 'B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃'
        },
        {
          icon: '🌡️',
          title: 'Nhiệt Động Lực Học: Phương Trình Trạng Thái Van der Waals',
          desc: 'Mô tả quá trình hóa lỏng của chất khí thực. Điểm uốn trên đường đẳng nhiệt bậc 3 tương ứng với trạng thái tới hạn (Critical Point) nơi ranh giới giữa thể khí và thể lỏng biến mất.',
          formula: 'P = RT / (V - b) - a / V²  (Triệt tiêu đạo hàm bậc 1 và 2 tại điểm tới hạn)'
        }
      ],
      '4-biquadratic': [
        {
          icon: '⚛️',
          title: 'Cơ Học Lượng Tử: Giếng Thế Hai Hố (Double-Well Potential)',
          desc: 'Mô hình hóa hạt lượng tử dao động giữa hai trạng thái cân bằng bền (2 cực tiểu) ngăn cách bởi một hàng rào thế năng (1 cực đại). Là nền tảng của bóng bán dẫn lượng tử và đồng hồ nguyên tử phân tử amoniac (NH3).',
          formula: 'V(x) = a·x⁴ - b·x²  (với a > 0, b > 0 tạo nên dạng chữ W)'
        },
        {
          icon: '🧲',
          title: 'Vật Lý Chất Rắn: Lý Thuyết Chuyển Pha Ginzburg-Landau',
          desc: 'Giải thích hiện tượng sắt từ hóa và siêu dẫn nhiệt độ thấp. Khi nhiệt độ giảm qua ngưỡng tới hạn Tc, hệ số b đổi dấu khiến trạng thái từ 1 cực tiểu tách thành 2 cực tiểu (tự phá vỡ đối xứng - Spontaneous Symmetry Breaking).',
          formula: 'Free Energy F(m) = a(T - Tc)·m² + b·m⁴'
        },
        {
          icon: '🏗️',
          title: 'Cơ Học Xây Dựng: Hiện Tượng Mất Ổn Định Uốn Cột (Buckling)',
          desc: 'Khi một cột trụ chịu tải trọng nén vượt tải tới hạn Euler, trục cột sẽ bị biến dạng uốn cong sang một trong hai bên cân bằng mới, mô hình hóa chính xác bằng hàm bậc 4 đối xứng.',
          formula: 'Energy E(w) = c₁·w⁴ - c₂·w²'
        }
      ],
      '4-general': [
        {
          icon: '🧬',
          title: 'Sinh Học Cấu Trúc: Gấp Nếp Phân Tử Protein',
          desc: 'Mặt thế năng bất đối xứng mô tả các trạng thái cấu hình không gian bền và bán bền của chuỗi axit amin khi cuộn gập.',
          formula: 'V(x) = ax⁴ + bx³ + cx² + dx + e'
        },
        {
          icon: '🛰️',
          title: 'Hàng Không Vũ Trụ: Lực Hút Trọng Trường Đa Vật Thể',
          desc: 'Thế năng hấp dẫn hiệu dụng quanh các điểm Lagrange L1, L2 trong hệ Trái Đất - Mặt Trăng được xấp xỉ bằng chuỗi đa thức Taylor bậc 4.',
          formula: 'U_eff(r) ≈ a·r⁴ + b·r³ + c·r² + d·r'
        }
      ]
    };

    const apps = data[degree] || [];
    wrap.innerHTML = apps.map(app => `
      <div class="app-card">
        <div class="app-card-header">
          <span class="app-card-icon">${app.icon}</span>
          <h5>${app.title}</h5>
        </div>
        <p class="app-card-body">${app.desc}</p>
        <div><span class="app-formula-pill">${app.formula}</span></div>
      </div>
    `).join('');
  }

  // Render Exam Tips Tab
  renderExamTips(degree) {
    const wrap = document.getElementById('exam-tips-container');
    if (!wrap) return;

    const data = {
      '1': [
        {
          title: 'Quy tắc nhận diện đồ thị Bậc 1 trong 3 giây',
          tips: [
            '<strong>Đồ thị là đường thẳng:</strong> Không có điểm uốn lượn hay cực trị.',
            '<strong>Dấu của a:</strong> Đường thẳng đi lên từ trái qua phải ➔ <em>a > 0</em>; đi xuống ➔ <em>a < 0</em>.',
            '<strong>Giao trục tung Oy:</strong> Tọa độ <em>(0, b)</em>. Cắt Oy ở phía trên gốc O ➔ <em>b > 0</em>; cắt phía dưới ➔ <em>b < 0</em>.'
          ]
        }
      ],
      '2': [
        {
          title: 'Bộ bí kíp nhận diện Parabol (Bậc 2)',
          tips: [
            '<strong>Bề lõm Parabol:</strong> Bề lõm quay lên (hình chữ U) ➔ <em>a > 0</em>; bề lõm quay xuống (hình chữ ∩) ➔ <em>a < 0</em>.',
            '<strong>Giao trục tung Oy:</strong> Tung độ giao điểm chính là hệ số <em>c</em>.',
            '<strong>Hoành độ đỉnh x = -b / (2a):</strong> Đỉnh nằm bên phải trục Oy ➔ <em>-b/2a > 0 ➔ a, b trái dấu</em>. Đỉnh nằm bên trái trục Oy ➔ <em>a, b cùng dấu</em>.',
            '<strong>Số giao điểm với trục hoành Ox:</strong> Cắt tại 2 điểm ➔ <em>Δ > 0</em>; tiếp xúc tại 1 điểm ➔ <em>Δ = 0</em>; không cắt ➔ <em>Δ < 0</em>.'
          ]
        }
      ],
      '3': [
        {
          title: 'Chiến thuật nhận diện đồ thị Bậc 3 trong đề thi THPT',
          tips: [
            '<strong>Nhìn nhánh ngoài cùng bên phải (x ➔ +∞):</strong> Nhánh cuối đi lên ➔ <em>a > 0</em>; nhánh cuối cắm xuống ➔ <em>a < 0</em>.',
            '<strong>Đếm số điểm cực trị:</strong> Có 2 cực trị ➔ <em>b² - 3ac > 0</em>; Không có cực trị (đường uốn đơn điệu) ➔ <em>b² - 3ac ≤ 0</em>.',
            '<strong>Giao điểm với trục tung Oy:</strong> Cắt Oy tại điểm có tung độ <em>y = d</em>.',
            '<strong>Dấu của hệ số b qua tâm đối xứng:</strong> Hoành độ điểm uốn <em>x_U = -b / (3a)</em>. Nếu điểm uốn nằm bên phải Oy thì <em>a, b trái dấu</em>.'
          ]
        }
      ],
      '4-biquadratic': [
        {
          title: 'Mẹo nhận diện Hàm Trùng Phương (Bậc 4)',
          tips: [
            '<strong>Tính đối xứng:</strong> Đồ thị luôn đối xứng tuyệt đối qua trục tung Oy (vì x chỉ mang lũy thừa chẵn 4 và 2).',
            '<strong>Nhánh vô cực bên phải:</strong> Đi lên ➔ <em>a > 0</em>; đi xuống ➔ <em>a < 0</em>.',
            '<strong>Nhận biết số cực trị bằng tích a·b:</strong>',
            '• Có <strong>3 điểm cực trị</strong> (hình W hoặc M) ➔ <strong>a·b < 0</strong> (a và b trái dấu).',
            '• Chỉ có <strong>1 điểm cực trị</strong> (dạng Parabol) ➔ <strong>a·b ≥ 0</strong> (a và b cùng dấu hoặc b = 0).',
            '<strong>Giao trục Oy:</strong> Luôn tại điểm <em>(0, c)</em> cũng chính là 1 trong các điểm cực trị của hàm số.'
          ]
        }
      ],
      '4-general': [
        {
          title: 'Quy tắc đồ thị đa thức Bậc 4 Tổng Quát',
          tips: [
            'Có tối đa 3 điểm cực trị và 2 điểm uốn.',
            'Hai nhánh ở vô cực luôn cùng hướng (cùng lên nếu a > 0, cùng xuống nếu a < 0).',
            'Cắt trục hoành tối đa tại 4 điểm phân biệt.'
          ]
        }
      ]
    };

    const tips = data[degree] || [];
    wrap.innerHTML = tips.map(t => `
      <div class="tip-box">
        <div class="tip-header">💡 ${t.title}</div>
        <ul class="tip-list">
          ${t.tips.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }
}

// Instantiate and launch
document.addEventListener('DOMContentLoaded', () => {
  window.mathApp = new MathApp();
  window.mathApp.init();
});
