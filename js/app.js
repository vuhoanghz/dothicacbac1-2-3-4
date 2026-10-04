/**
 * DataViz Studio - Main Application Orchestrator
 * Connects user interactions, themes, toolbar buttons, tabs, shortcuts, and initial render
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sub-systems
  window.chartManager.init();
  window.dataEditor.init();
  window.liveStream.init();

  // 2. Setup Sidebar Chart Switching
  const navItems = document.querySelectorAll('.chart-nav .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const chartType = item.getAttribute('data-chart');
      window.chartManager.renderChart(chartType);

      // On mobile screens, auto collapse sidebar after selection
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
      }
    });
  });

  // 3. Setup Sidebar Collapse / Expand Toggle
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('app-sidebar');
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Resize chart smoothly after layout transition
      setTimeout(() => {
        if (window.chartManager.chartInstance) {
          window.chartManager.chartInstance.resize();
        }
      }, 300);
    });
  }

  // 4. Setup Theme Switcher (Dark, Light, Cyberpunk, Emerald)
  const themeSelector = document.getElementById('theme-selector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      
      // Re-init chart instance with matching theme
      window.chartManager.setupInstance();
      window.chartManager.renderChart();

      window.dataEditor.showToast(`Đã chuyển sang giao diện ${e.target.options[e.target.selectedIndex].text}`, 'info');
    });
  }

  // 5. Setup Dataset Scenario Selector
  const scenarioSelector = document.getElementById('dataset-scenario-select');
  if (scenarioSelector) {
    scenarioSelector.addEventListener('change', (e) => {
      ChartConfigs.state.scenario = e.target.value;
      window.chartManager.renderChart();
      window.dataEditor.showToast(`Đã tải kịch bản: ${e.target.options[e.target.selectedIndex].text}`, 'info');
    });
  }

  // 6. Setup Stage Toolbar Buttons
  // 6.1 Toggle Stacked
  const btnStack = document.getElementById('ctrl-toggle-stack');
  if (btnStack) {
    btnStack.addEventListener('click', () => {
      ChartConfigs.state.isStacked = !ChartConfigs.state.isStacked;
      btnStack.classList.toggle('active', ChartConfigs.state.isStacked);
      window.chartManager.renderChart();
      window.dataEditor.showToast(ChartConfigs.state.isStacked ? 'Đã bật cột xếp chồng (Stacked)' : 'Đã tách thành cột riêng biệt', 'info');
    });
  }

  // 6.2 Toggle Smooth
  const btnSmooth = document.getElementById('ctrl-toggle-smooth');
  if (btnSmooth) {
    btnSmooth.addEventListener('click', () => {
      ChartConfigs.state.isSmooth = !ChartConfigs.state.isSmooth;
      btnSmooth.classList.toggle('active', ChartConfigs.state.isSmooth);
      window.chartManager.renderChart();
    });
  }

  // 6.3 Toggle Rose (Pie)
  const btnRose = document.getElementById('ctrl-toggle-rose');
  if (btnRose) {
    btnRose.addEventListener('click', () => {
      ChartConfigs.state.isRose = !ChartConfigs.state.isRose;
      btnRose.classList.toggle('active', ChartConfigs.state.isRose);
      window.chartManager.renderChart('pie');
      window.dataEditor.showToast(ChartConfigs.state.isRose ? 'Chuyển sang dạng Biểu đồ Hoa hồng Nightingale' : 'Chuyển về dạng Vành khuyên Donut', 'info');
    });
  }

  // 6.4 Sort Ascending / Descending
  const btnSortAsc = document.getElementById('ctrl-sort-asc');
  const btnSortDesc = document.getElementById('ctrl-sort-desc');
  if (btnSortAsc) {
    btnSortAsc.addEventListener('click', () => {
      ChartConfigs.state.sortOrder = (ChartConfigs.state.sortOrder === 'asc') ? 'none' : 'asc';
      btnSortAsc.classList.toggle('active', ChartConfigs.state.sortOrder === 'asc');
      if (btnSortDesc) btnSortDesc.classList.remove('active');
      window.chartManager.renderChart();
    });
  }
  if (btnSortDesc) {
    btnSortDesc.addEventListener('click', () => {
      ChartConfigs.state.sortOrder = (ChartConfigs.state.sortOrder === 'desc') ? 'none' : 'desc';
      btnSortDesc.classList.toggle('active', ChartConfigs.state.sortOrder === 'desc');
      if (btnSortAsc) btnSortAsc.classList.remove('active');
      window.chartManager.renderChart();
    });
  }

  // 6.5 Toggle Data Labels
  const btnLabels = document.getElementById('ctrl-toggle-labels');
  if (btnLabels) {
    btnLabels.addEventListener('click', () => {
      ChartConfigs.state.showLabels = !ChartConfigs.state.showLabels;
      btnLabels.classList.toggle('active', ChartConfigs.state.showLabels);
      window.chartManager.renderChart();
    });
  }

  // 6.6 Randomize Data
  const btnRandom = document.getElementById('ctrl-randomize');
  if (btnRandom) {
    btnRandom.addEventListener('click', () => {
      window.chartManager.randomizeCurrentData();
      window.dataEditor.showToast('🎲 Đã sinh bộ số liệu ngẫu nhiên mới!', 'info');
    });
  }

  // 6.7 Reset Zoom
  const btnReset = document.getElementById('ctrl-reset-zoom');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      window.chartManager.resetZoom();
      window.dataEditor.showToast('Đã đặt lại góc nhìn ban đầu', 'info');
    });
  }

  // 7. Setup Visual Customizer Inputs (Tab 3)
  const barWidthInput = document.getElementById('param-bar-width');
  const barWidthVal = document.getElementById('param-bar-width-val');
  if (barWidthInput && barWidthVal) {
    barWidthInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      barWidthVal.innerText = `${val}px`;
      ChartConfigs.state.barWidth = val;
      window.chartManager.renderChart();
    });
  }

  const lineTensionInput = document.getElementById('param-line-tension');
  const lineTensionVal = document.getElementById('param-line-tension-val');
  if (lineTensionInput && lineTensionVal) {
    lineTensionInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) / 100;
      lineTensionVal.innerText = val.toFixed(2);
      ChartConfigs.state.lineTension = val;
      window.chartManager.renderChart();
    });
  }

  const areaOpacityInput = document.getElementById('param-area-opacity');
  const areaOpacityVal = document.getElementById('param-area-opacity-val');
  if (areaOpacityInput && areaOpacityVal) {
    areaOpacityInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) / 100;
      areaOpacityVal.innerText = `${Math.round(val * 100)}%`;
      ChartConfigs.state.areaOpacity = val;
      window.chartManager.renderChart();
    });
  }

  const animDurationInput = document.getElementById('param-anim-duration');
  const animDurationVal = document.getElementById('param-anim-duration-val');
  if (animDurationInput && animDurationVal) {
    animDurationInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      animDurationVal.innerText = `${val}ms`;
      ChartConfigs.state.animationDuration = val;
    });
  }

  const paletteSelect = document.getElementById('param-palette-select');
  if (paletteSelect) {
    paletteSelect.addEventListener('change', (e) => {
      ChartConfigs.state.palette = e.target.value;
      window.chartManager.renderChart();
    });
  }

  const toggleGridCheck = document.getElementById('param-toggle-grid');
  if (toggleGridCheck) {
    toggleGridCheck.addEventListener('change', (e) => {
      ChartConfigs.state.showGrid = e.target.checked;
      window.chartManager.renderChart();
    });
  }

  const toggleCrosshairCheck = document.getElementById('param-toggle-crosshair');
  if (toggleCrosshairCheck) {
    toggleCrosshairCheck.addEventListener('change', (e) => {
      ChartConfigs.state.showCrosshair = e.target.checked;
      window.chartManager.renderChart();
    });
  }

  // 8. Setup Tabs Switching
  const tabBtns = document.querySelectorAll('.panel-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 9. Setup Export Dropdown
  const exportDropdownBtn = document.getElementById('export-dropdown-btn');
  const exportMenu = document.getElementById('export-menu');
  if (exportDropdownBtn && exportMenu) {
    exportDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exportMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      exportMenu.classList.remove('show');
    });

    document.getElementById('export-png-btn')?.addEventListener('click', () => {
      window.chartManager.exportPNG();
      window.dataEditor.showToast('Đang tải ảnh PNG độ nét cao...', 'success');
    });

    document.getElementById('export-svg-btn')?.addEventListener('click', () => {
      window.chartManager.exportSVG();
      window.dataEditor.showToast('Đang tải file SVG Vector...', 'success');
    });

    document.getElementById('export-json-btn')?.addEventListener('click', () => {
      window.chartManager.exportJSON();
      window.dataEditor.showToast('Đang tải dữ liệu JSON...', 'success');
    });
  }

  // 10. Setup Fullscreen Mode
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Could not enter fullscreen:', err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // 11. Setup Help Modal
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const closeHelpBtn = document.getElementById('close-help-modal');
  const gotItBtn = document.getElementById('got-it-btn');

  const openHelp = () => helpModal?.classList.remove('hidden');
  const closeHelp = () => helpModal?.classList.add('hidden');

  if (helpBtn) helpBtn.addEventListener('click', openHelp);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  if (gotItBtn) gotItBtn.addEventListener('click', closeHelp);
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // 12. Keyboard Shortcuts Handler
  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing inside an input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      window.liveStream.toggleStream();
    } else if (e.key === 'r' || e.key === 'R') {
      window.chartManager.randomizeCurrentData();
    } else if (e.key === 't' || e.key === 'T') {
      // Toggle dark / light
      const current = document.documentElement.getAttribute('data-theme');
      const next = (current === 'light') ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      if (themeSelector) themeSelector.value = next;
      window.chartManager.setupInstance();
      window.chartManager.renderChart();
    } else if (e.key === 'f' || e.key === 'F') {
      if (fullscreenBtn) fullscreenBtn.click();
    } else if (e.key === 'Escape') {
      closeHelp();
    }
  });

  // 13. Initial Render (Bar chart)
  window.chartManager.renderChart('bar');
  window.dataEditor.showToast('Chào mừng bạn đến với DataViz Studio!', 'info');
});
