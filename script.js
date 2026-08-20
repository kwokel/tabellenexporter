(function () {
  const wrapper = document.getElementById('exportWrapper');
  const table = document.getElementById('dsTable');
  const colGroup = document.getElementById('colGroup');
  const headRow = document.getElementById('headRow');
  const bodyRows = document.getElementById('bodyRows');
  const statusMsg = document.getElementById('statusMsg');
  const captionEl = document.getElementById('captionEl');

  let savedRange = null;

  // remember the caret position within any contenteditable so badge-insert works reliably
  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const node = sel.anchorNode;
      if (node && wrapper.contains(node)) {
        savedRange = sel.getRangeAt(0).cloneRange();
      }
    }
  });

  function flash(msg) {
    statusMsg.textContent = msg;
    setTimeout(() => { statusMsg.textContent = ''; }, 2200);
  }

  // Custom confirm dialog — window.confirm()/alert() are blocked in many
  // sandboxed preview iframes, which made the import/reset buttons silently
  // do nothing. This overlay works in any environment.
  const confirmOverlay = document.getElementById('confirmOverlay');
  const confirmMessage = document.getElementById('confirmMessage');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');

  function showConfirm(message) {
    return new Promise((resolve) => {
      confirmMessage.textContent = message;
      confirmOverlay.classList.add('open');

      function cleanup(result) {
        confirmOverlay.classList.remove('open');
        confirmYes.removeEventListener('click', onYes);
        confirmNo.removeEventListener('click', onNo);
        resolve(result);
      }
      function onYes() { cleanup(true); }
      function onNo() { cleanup(false); }

      confirmYes.addEventListener('click', onYes);
      confirmNo.addEventListener('click', onNo);
    });
  }

  function colCount() {
    return headRow.children.length;
  }

  function rebuildRemoveHandlers() {
    headRow.querySelectorAll('.col-remove').forEach((btn, i) => {
      btn.dataset.col = i;
      btn.onclick = (e) => {
        e.stopPropagation();
        removeColumn(i);
      };
    });
    bodyRows.querySelectorAll('.row-remove').forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const tr = btn.closest('tr');
        if (bodyRows.children.length > 1) {
          tr.remove();
          renderLayoutControls();
        } else {
          flash('Mindestens eine Zeile muss bestehen bleiben.');
        }
      };
    });
  }

  // ---------- add / remove rows & columns ----------
  document.getElementById('addRow').onclick = () => {
    const n = colCount();
    const tr = document.createElement('tr');
    for (let i = 0; i < n; i++) {
      const td = document.createElement('td');
      td.contentEditable = 'true';
      td.textContent = 'Neuer Wert';
      tr.appendChild(td);
    }
    const removeCell = document.createElement('td');
    removeCell.className = 'row-remove-cell';
    removeCell.innerHTML = '<span class="row-remove">×</span>';
    tr.appendChild(removeCell);
    bodyRows.appendChild(tr);
    rebuildRemoveHandlers();
    renderLayoutControls();
  };

  document.getElementById('addCol').onclick = () => {
    const th = document.createElement('th');
    th.contentEditable = 'true';
    th.textContent = 'Neue Spalte';
    const removeSpan = document.createElement('span');
    removeSpan.className = 'col-remove';
    removeSpan.textContent = '×';
    th.appendChild(removeSpan);
    headRow.appendChild(th);
    const newCol = document.createElement('col');
    newCol.style.width = defaultColWidth() + 'px';
    colGroup.appendChild(newCol);

    [...bodyRows.children].forEach(tr => {
      const td = document.createElement('td');
      td.contentEditable = 'true';
      td.textContent = 'Wert';
      // insert before the row-remove cell
      const removeCell = tr.querySelector('.row-remove-cell');
      tr.insertBefore(td, removeCell);
    });
    rebuildRemoveHandlers();
    renderLayoutControls();
  };

  function removeColumn(index) {
    if (colCount() <= 1) { flash('Mindestens eine Spalte muss bestehen bleiben.'); return; }
    headRow.children[index].remove();
    if (colGroup.children[index]) colGroup.children[index].remove();
    [...bodyRows.children].forEach(tr => {
      // data cells only (skip the row-remove-cell, which is always last)
      const dataCells = [...tr.children].filter(c => !c.classList.contains('row-remove-cell'));
      if (dataCells[index]) dataCells[index].remove();
    });
    rebuildRemoveHandlers();
    renderLayoutControls();
  }

  // ---------- per-column width / per-row height controls ----------
  function renderColumnWidthControls() {
    const container = document.getElementById('colWidthControls');
    container.innerHTML = '';
    [...headRow.children].forEach((th, i) => {
      const clone = th.cloneNode(true);
      const rem = clone.querySelector('.col-remove');
      if (rem) rem.remove();
      let label = clone.textContent.trim() || ('Spalte ' + (i + 1));
      if (label.length > 16) label = label.slice(0, 14) + '…';

      const row = document.createElement('div');
      row.className = 'row';
      const lab = document.createElement('label');
      lab.textContent = 'Sp.' + (i + 1) + ': ' + label;
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '20';
      input.max = '1000';
      input.placeholder = 'auto';
      input.style.width = '64px';
      const col = colGroup.children[i];
      input.value = (col && col.style.width) ? parseInt(col.style.width, 10) : '';
      input.oninput = () => {
        const v = input.value;
        if (colGroup.children[i]) colGroup.children[i].style.width = v ? (v + 'px') : '';
      };
      row.appendChild(lab);
      row.appendChild(input);
      container.appendChild(row);
    });
  }

  function renderRowHeightControls() {
    const container = document.getElementById('rowHeightControls');
    container.innerHTML = '';
    [...bodyRows.children].forEach((tr, i) => {
      const firstTd = tr.children[0];
      let label = firstTd ? firstTd.textContent.trim() : '';
      if (label.length > 16) label = label.slice(0, 14) + '…';
      if (!label) label = 'Zeile ' + (i + 1);

      const row = document.createElement('div');
      row.className = 'row';
      const lab = document.createElement('label');
      lab.textContent = 'Z.' + (i + 1) + ': ' + label;
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '20';
      input.max = '500';
      input.placeholder = 'auto';
      input.style.width = '64px';
      input.value = tr.style.height ? parseInt(tr.style.height, 10) : '';
      input.oninput = () => {
        const v = input.value;
        const h = v ? (v + 'px') : '';
        tr.style.height = h;
        [...tr.children].forEach(td => { td.style.height = h; });
      };
      row.appendChild(lab);
      row.appendChild(input);
      container.appendChild(row);
    });
  }

  function renderLayoutControls() {
    renderColumnWidthControls();
    renderRowHeightControls();
  }

  // ---------- make column widths actually take effect ----------
  // table-layout:auto (the default) only treats <col style="width"> as a
  // loose hint — the browser can still widen a column past it whenever a
  // cell's content wants more room, which made the width inputs appear to
  // do nothing. Freezing the current natural widths into the colgroup and
  // then switching to table-layout:fixed makes them binding, while keeping
  // the initial look unchanged.
  function defaultColWidth() {
    const widths = [...colGroup.children]
      .map(c => parseInt(c.style.width, 10))
      .filter(n => !isNaN(n));
    if (widths.length === 0) return 150;
    return Math.round(widths.reduce((a, b) => a + b, 0) / widths.length);
  }

  function remeasureColumnsToFixed() {
    table.style.tableLayout = 'auto';
    [...colGroup.children].forEach(col => { col.style.width = ''; });
    void table.offsetWidth; // force reflow so getBoundingClientRect is accurate
    const widths = [...headRow.children].map(th => Math.max(20, Math.round(th.getBoundingClientRect().width)));
    widths.forEach((w, i) => {
      if (colGroup.children[i]) colGroup.children[i].style.width = w + 'px';
    });
    table.style.tableLayout = 'fixed';
  }

  function initColumnWidths() {
    remeasureColumnsToFixed();
    renderLayoutControls();
  }

  rebuildRemoveHandlers();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initColumnWidths).catch(initColumnWidths);
  } else {
    initColumnWidths();
  }

  // ---------- import ----------
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function mdInline(raw) {
    let s = escapeHtml((raw || '').trim());
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
    return s;
  }

  function splitPipeRow(line) {
    let l = line.trim();
    if (l.startsWith('|')) l = l.slice(1);
    if (l.endsWith('|')) l = l.slice(0, -1);
    return l.split('|').map(c => c.trim());
  }

  function parseImportText(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return null;

    const pipeCount = lines.filter(l => l.includes('|')).length;
    const tabCount = lines.filter(l => l.includes('\t')).length;

    let rows = [];
    let aligns = [];

    if (pipeCount >= lines.length * 0.5) {
      lines.forEach(line => {
        const cells = splitPipeRow(line);
        const isSeparator = cells.length > 0 && cells.every(c => /^:?-+:?$/.test(c.trim()));
        if (isSeparator) {
          aligns = cells.map(c => {
            const t = c.trim();
            if (/^:-+:$/.test(t)) return 'center';
            if (/^-+:$/.test(t)) return 'right';
            if (/^:-+$/.test(t)) return 'left';
            return '';
          });
        } else {
          rows.push(cells);
        }
      });
    } else if (tabCount >= lines.length * 0.5) {
      rows = lines.map(l => l.split('\t').map(c => c.trim()));
    } else {
      rows = lines.map(l => l.split(',').map(c => c.trim()));
    }

    return { rows, aligns };
  }

  function importTable() {
    let parsed;
    try {
      const text = document.getElementById('importText').value;
      parsed = parseImportText(text);
    } catch (err) {
      console.error(err);
      flash('Fehler beim Einlesen der Daten.');
      return;
    }

    if (!parsed || parsed.rows.length < 1) {
      flash('Konnte keine Tabelle erkennen. Bitte Markdown- oder tab-getrennte Daten einfügen.');
      return;
    }

    showConfirm('Aktuelle Tabelle durch die eingefügten Daten ersetzen?').then(ok => {
      if (!ok) return;
      try {
        const header = parsed.rows[0];
        const body = parsed.rows.slice(1);
        const aligns = parsed.aligns;

        headRow.innerHTML = '';
        bodyRows.innerHTML = '';
        colGroup.innerHTML = '';

        header.forEach((h, i) => {
          const th = document.createElement('th');
          th.contentEditable = 'true';
          th.innerHTML = mdInline(h) + '<span class="col-remove" data-col="' + i + '">×</span>';
          if (aligns[i] === 'right' || aligns[i] === 'center') th.style.textAlign = aligns[i];
          headRow.appendChild(th);
          colGroup.appendChild(document.createElement('col'));
        });

        if (body.length === 0) {
          body.push(header.map(() => ''));
        }

        body.forEach(r => {
          const tr = document.createElement('tr');
          header.forEach((_, i) => {
            const td = document.createElement('td');
            td.contentEditable = 'true';
            td.innerHTML = mdInline(r[i] || '');
            if (aligns[i] === 'right' || aligns[i] === 'center') td.style.textAlign = aligns[i];
            tr.appendChild(td);
          });
          const removeCell = document.createElement('td');
          removeCell.className = 'row-remove-cell';
          removeCell.innerHTML = '<span class="row-remove">×</span>';
          tr.appendChild(removeCell);
          bodyRows.appendChild(tr);
        });

        rebuildRemoveHandlers();
        remeasureColumnsToFixed();
        renderLayoutControls();
        flash('Tabelle importiert (' + header.length + ' Spalten, ' + body.length + ' Zeilen).');
      } catch (err) {
        console.error(err);
        flash('Fehler beim Einfügen der Tabelle.');
      }
    });
  }

  document.getElementById('importBtn').onclick = importTable;

  // ---------- caption ----------
  document.getElementById('showCaption').onchange = (e) => {
    captionEl.style.display = e.target.checked ? '' : 'none';
  };

  // ---------- badges ----------
  document.getElementById('insertBadge').onclick = () => {
    const type = document.getElementById('badgeType').value;
    const labelMap = { great: 'Sehr gut', good: 'Gut', warn: 'Eingeschränkt' };
    const span = document.createElement('span');
    span.className = 'ds-badge ds-badge--' + type;
    span.textContent = labelMap[type];

    const sel = window.getSelection();
    let range = savedRange;

    if (range && wrapper.contains(range.commonAncestorContainer)) {
      range.collapse(false);
      range.insertNode(span);
      range.setStartAfter(span);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      flash('Bitte zuerst in eine Zelle klicken.');
      return;
    }
    flash('Badge eingefügt.');
  };

  // ---------- style controls ----------
  const setVar = (name, val) => wrapper.style.setProperty(name, val);

  document.getElementById('colorPrimary').oninput = (e) => setVar('--color-primary', e.target.value);
  document.getElementById('colorRowAlt').oninput = (e) => setVar('--color-row-alt', e.target.value);
  document.getElementById('colorBadgeGreat').oninput = (e) => setVar('--color-badge-great-bg', e.target.value);
  document.getElementById('colorBadgeGood').oninput = (e) => setVar('--color-badge-good-bg', e.target.value);
  document.getElementById('colorBadgeWarn').oninput = (e) => setVar('--color-badge-warn-bg', e.target.value);

  // ---------- brand presets ----------
  // Colours are an interpretation of each brand's public marketing style
  // (logo blue for HD Hotels, ocean/dune tones for Dunas Hotels &
  // Resorts)
  const PRESETS = {
    hd: {
      primary: '#11263B',
      rowAlt: '#f0eded',
      badgeGreat: '#f2d9a0',
      badgeGood: '#e7dcc8',
      badgeWarn: '#f1c9c3',
      font: "'Poppins', sans-serif"
    },
    dunas: {
      primary: '#155263',
      rowAlt: '#f2ede1',
      badgeGreat: '#bfe0d9',
      badgeGood: '#e4dcc4',
      badgeWarn: '#f1d4c8',
      font: "'Nunito', sans-serif"
    }
  };

  document.getElementById('colorPreset').onchange = (e) => {
    const key = e.target.value;
    if (!key || !PRESETS[key]) return;
    const p = PRESETS[key];

    setVar('--color-primary', p.primary);
    setVar('--color-row-alt', p.rowAlt);
    setVar('--color-badge-great-bg', p.badgeGreat);
    setVar('--color-badge-good-bg', p.badgeGood);
    setVar('--color-badge-warn-bg', p.badgeWarn);
    setVar('--font-base', p.font);

    document.getElementById('colorPrimary').value = p.primary;
    document.getElementById('colorRowAlt').value = p.rowAlt;
    document.getElementById('colorBadgeGreat').value = p.badgeGreat;
    document.getElementById('colorBadgeGood').value = p.badgeGood;
    document.getElementById('colorBadgeWarn').value = p.badgeWarn;
    document.getElementById('fontFamily').value = p.font;

    flash('Preset angewendet — Farben bleiben einzeln änderbar.');
  };

  document.getElementById('fontFamily').onchange = (e) => setVar('--font-base', e.target.value);

  document.getElementById('fontSize').oninput = (e) => {
    setVar('--font-size-base', e.target.value + 'px');
    document.getElementById('fontSizeVal').textContent = e.target.value + 'px';
  };

  document.getElementById('radius').oninput = (e) => {
    setVar('--radius-lg', e.target.value + 'px');
    document.getElementById('radiusVal').textContent = e.target.value + 'px';
  };

  // ---------- reset ----------
  document.getElementById('resetAll').onclick = () => {
    showConfirm('Alle Design-Einstellungen zurücksetzen? (Inhalte bleiben erhalten)').then(ok => {
      if (!ok) return;
      const defaults = {
        '--color-primary': '#1a4d3a',
        '--color-row-alt': '#eaf5ec',
        '--color-badge-great-bg': '#c9edd4',
        '--color-badge-good-bg': '#d9f2df',
        '--color-badge-warn-bg': '#fbdede',
        '--font-base': "'Cabin', sans-serif",
        '--font-size-base': '16px',
        '--radius-lg': '10px'
      };
      Object.entries(defaults).forEach(([k, v]) => setVar(k, v));
      document.getElementById('colorPreset').value = '';
      document.getElementById('colorPrimary').value = '#1a4d3a';
      document.getElementById('colorRowAlt').value = '#eaf5ec';
      document.getElementById('colorBadgeGreat').value = '#c9edd4';
      document.getElementById('colorBadgeGood').value = '#d9f2df';
      document.getElementById('colorBadgeWarn').value = '#fbdede';
      document.getElementById('fontFamily').value = "'Cabin', sans-serif";
      document.getElementById('fontSize').value = 16;
      document.getElementById('fontSizeVal').textContent = '16px';
      document.getElementById('radius').value = 10;
      document.getElementById('radiusVal').textContent = '10px';
    });
  };

  // ---------- export helpers ----------
  function prepareForExport() {
    // hide edit-only affordances during capture
    document.querySelectorAll('.col-remove, .row-remove').forEach(el => el.style.visibility = 'hidden');
    document.querySelectorAll('.row-remove-cell').forEach(el => el.style.display = 'none');
  }
  function restoreAfterExport() {
    document.querySelectorAll('.col-remove, .row-remove').forEach(el => el.style.visibility = '');
    document.querySelectorAll('.row-remove-cell').forEach(el => el.style.display = '');
  }

  function captureCanvas() {
    const scale = parseInt(document.getElementById('exportScale').value, 10);
    prepareForExport();
    return html2canvas(wrapper, {
      backgroundColor: '#ffffff',
      scale: scale,
      useCORS: true
    }).finally(restoreAfterExport);
  }

  document.getElementById('exportPng').onclick = () => {
    flash('Erzeuge PNG…');
    captureCanvas().then(canvas => {
      const link = document.createElement('a');
      link.download = 'tabelle.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      flash('PNG heruntergeladen.');
    }).catch(err => {
      console.error(err);
      flash('Fehler beim PNG-Export.');
    });
  };

  document.getElementById('exportPdf').onclick = () => {
    flash('Erzeuge PDF…');
    captureCanvas().then(canvas => {
      const { jsPDF } = window.jspdf;
      const imgData = canvas.toDataURL('image/png');

      // convert px -> mm at 96dpi baseline, accounting for capture scale
      const scale = parseInt(document.getElementById('exportScale').value, 10);
      const widthMm = (canvas.width / scale) * 0.264583;
      const heightMm = (canvas.height / scale) * 0.264583;

      const orientation = widthMm > heightMm ? 'landscape' : 'portrait';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [widthMm, heightMm]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, widthMm, heightMm);
      pdf.save('tabelle.pdf');
      flash('PDF heruntergeladen.');
    }).catch(err => {
      console.error(err);
      flash('Fehler beim PDF-Export.');
    });
  };
})();
