// ---------- UI-Übersetzungen (DE / EN / ES) ----------
// HTML-Elemente mit data-i18n="key" bekommen den Text, data-i18n-placeholder den Platzhalter.
// Im Script: t('key', { n: 3 }) ersetzt {n} im Text.
(function () {
  const translations = {
    de: {
      themeToggle: 'Hell/Dunkel umschalten',
      designTitle: 'Design',
      cloudSaving: 'Speichere…',
      cloudTitle: 'Gespeicherte Tabellen',
      cloudEmailPh: 'E-Mail-Adresse',
      cloudLogin: 'Login-Link senden',
      cloudLoginHint: 'Du bekommst einen Anmeldelink per E-Mail. Nur eingeladene Teammitglieder können sich anmelden.',
      cloudLogout: 'Abmelden',
      cloudNamePh: 'Name der Tabelle',
      cloudSave: 'Speichern',
      cloudSaveNew: 'Als neue speichern',
      cloudNew: 'Neue Tabelle beginnen',
      cloudEmpty: 'Noch keine gespeicherten Tabellen.',
      cloudDelete: 'Löschen',
      cloudError: 'Fehler bei der Verbindung zur Datenbank.',
      cloudOpened: 'Tabelle geöffnet.',
      cloudUntitled: 'Unbenannte Tabelle',
      cloudSaved: 'Tabelle gespeichert.',
      cloudConfirmDelete: '„{name}“ endgültig löschen?',
      cloudDeleted: 'Tabelle gelöscht.',
      cloudLoginError: 'Anmeldung nicht möglich. Bist du eingeladen?',
      cloudLinkSent: 'Login-Link verschickt – bitte E-Mails prüfen.',
      badge_green: 'Grün',
      badge_yellow: 'Gelb',
      badge_orange: 'Orange',
      badge_red: 'Rot',
      badge_blue: 'Blau',
      badge_violet: 'Violett',
      badge_gray: 'Grau',
      appTitle: 'Tabellen Export Tool',
      appSub: 'Tabelle bearbeiten, Design anpassen, als PNG oder PDF exportieren.',
      importTitle: 'Tabelle importieren',
      importPlaceholder: 'Markdown-Tabelle oder aus Excel/Sheets kopierte Zellen hier einfügen…',
      importBtn: 'Tabelle einfügen (ersetzt aktuelle)',
      importHint: 'Erkennt Markdown-Tabellen (inkl. **fett** und Ausrichtung über die Trennzeile) sowie tab-getrennte Daten. Ersetzt die komplette aktuelle Tabelle.',
      contentTitle: 'Inhalt',
      showCaption: 'Tabellentitel anzeigen',
      addRow: '+ Zeile',
      addCol: '+ Spalte',
      contentHint: 'Zum Bearbeiten in eine Zelle klicken. + fügt eine Zeile bzw. Spalte hinzu, × (beim Hover) entfernt sie. Für ein Badge den Cursor in die Zelle setzen und oben das Badge anklicken.',
      badgeLabel: 'Badge einfügen:',
      badgeTitle: 'Badge einfügen',
      insertBadge: 'In Zelle einfügen',
      badgeHint: 'Cursor zuerst in die Zielzelle setzen, dann klicken.',
      colorsTitle: 'Farben',
      preset: 'Preset',
      presetCustom: 'Benutzerdefiniert',
      colorPrimary: 'Primärfarbe (Header/Rahmen)',
      colorRowAlt: 'Zebra-Zeile',
      typoTitle: 'Typografie',
      fontFamily: 'Schriftart',
      fontSize: 'Schriftgröße',
      shapeTitle: 'Form',
      radius: 'Eckenradius',
      colWidthTitle: 'Spaltenbreite',
      colWidthHint: 'Wert in px pro Spalte, leer = automatische Breite.',
      rowHeightTitle: 'Zeilenhöhe',
      rowHeightHint: 'Wert in px pro Zeile, leer = automatische Höhe (passt sich dem Inhalt an).',
      exportTitle: 'Export',
      exportScale: 'Auflösung',
      scale1: '1× (Bildschirm)',
      scale2: '2× (Druck/Retina)',
      scale3: '3× (hochauflösend)',
      exportPng: 'Als PNG exportieren',
      exportPdf: 'Als PDF exportieren',
      resetAll: 'Alles zurücksetzen',
      previewTitle: 'Vorschau — wird 1:1 exportiert',
      confirmDefault: 'Aktion bestätigen?',
      confirmNo: 'Abbrechen',
      confirmYes: 'Ja, fortfahren',
      // Script-Meldungen
      minRow: 'Mindestens eine Zeile muss bestehen bleiben.',
      minCol: 'Mindestens eine Spalte muss bestehen bleiben.',
      newValue: 'Neuer Wert',
      newColumn: 'Neue Spalte',
      value: 'Wert',
      columnN: 'Spalte {n}',
      colShort: 'Sp.{n}',
      rowN: 'Zeile {n}',
      rowShort: 'Z.{n}',
      parseError: 'Fehler beim Einlesen der Daten.',
      noTable: 'Konnte keine Tabelle erkennen. Bitte Markdown- oder tab-getrennte Daten einfügen.',
      confirmImport: 'Aktuelle Tabelle durch die eingefügten Daten ersetzen?',
      imported: 'Tabelle importiert ({cols} Spalten, {rows} Zeilen).',
      importError: 'Fehler beim Einfügen der Tabelle.',
      clickCellFirst: 'Bitte zuerst in eine Zelle klicken.',
      badgeInserted: 'Badge eingefügt.',
      presetApplied: 'Preset angewendet — Farben bleiben einzeln änderbar.',
      confirmReset: 'Alle Design-Einstellungen zurücksetzen? (Inhalte bleiben erhalten)',
      makingPng: 'Erzeuge PNG…',
      pngDone: 'PNG heruntergeladen.',
      pngError: 'Fehler beim PNG-Export.',
      makingPdf: 'Erzeuge PDF…',
      pdfDone: 'PDF heruntergeladen.',
      pdfError: 'Fehler beim PDF-Export.',
      fileName: 'tabelle'
    },
    en: {
      themeToggle: 'Toggle light/dark',
      designTitle: 'Design',
      cloudSaving: 'Saving…',
      cloudTitle: 'Saved tables',
      cloudEmailPh: 'Email address',
      cloudLogin: 'Send login link',
      cloudLoginHint: 'You will receive a sign-in link by email. Only invited team members can sign in.',
      cloudLogout: 'Sign out',
      cloudNamePh: 'Table name',
      cloudSave: 'Save',
      cloudSaveNew: 'Save as new',
      cloudNew: 'Start new table',
      cloudEmpty: 'No saved tables yet.',
      cloudDelete: 'Delete',
      cloudError: 'Error connecting to the database.',
      cloudOpened: 'Table opened.',
      cloudUntitled: 'Untitled table',
      cloudSaved: 'Table saved.',
      cloudConfirmDelete: 'Permanently delete “{name}”?',
      cloudDeleted: 'Table deleted.',
      cloudLoginError: 'Sign-in not possible. Have you been invited?',
      cloudLinkSent: 'Login link sent – please check your email.',
      badge_green: 'Green',
      badge_yellow: 'Yellow',
      badge_orange: 'Orange',
      badge_red: 'Red',
      badge_blue: 'Blue',
      badge_violet: 'Violet',
      badge_gray: 'Gray',
      appTitle: 'Table Export Tool',
      appSub: 'Edit your table, adjust the design, export as PNG or PDF.',
      importTitle: 'Import table',
      importPlaceholder: 'Paste a Markdown table or cells copied from Excel/Sheets here…',
      importBtn: 'Insert table (replaces current)',
      importHint: 'Detects Markdown tables (incl. **bold** and alignment via the separator row) as well as tab-separated data. Replaces the entire current table.',
      contentTitle: 'Content',
      showCaption: 'Show table title',
      addRow: '+ Row',
      addCol: '+ Column',
      contentHint: 'Click a cell to edit it. + adds a row or column, × (on hover) removes it. For a badge, place the cursor in the cell and click the badge above.',
      badgeLabel: 'Insert badge:',
      badgeTitle: 'Insert badge',
      insertBadge: 'Insert into cell',
      badgeHint: 'Place the cursor in the target cell first, then click.',
      colorsTitle: 'Colors',
      preset: 'Preset',
      presetCustom: 'Custom',
      colorPrimary: 'Primary color (header/border)',
      colorRowAlt: 'Zebra row',
      typoTitle: 'Typography',
      fontFamily: 'Font',
      fontSize: 'Font size',
      shapeTitle: 'Shape',
      radius: 'Corner radius',
      colWidthTitle: 'Column width',
      colWidthHint: 'Value in px per column, empty = automatic width.',
      rowHeightTitle: 'Row height',
      rowHeightHint: 'Value in px per row, empty = automatic height (fits the content).',
      exportTitle: 'Export',
      exportScale: 'Resolution',
      scale1: '1× (screen)',
      scale2: '2× (print/Retina)',
      scale3: '3× (high resolution)',
      exportPng: 'Export as PNG',
      exportPdf: 'Export as PDF',
      resetAll: 'Reset everything',
      previewTitle: 'Preview — exported 1:1',
      confirmDefault: 'Confirm action?',
      confirmNo: 'Cancel',
      confirmYes: 'Yes, continue',
      minRow: 'At least one row must remain.',
      minCol: 'At least one column must remain.',
      newValue: 'New value',
      newColumn: 'New column',
      value: 'Value',
      columnN: 'Column {n}',
      colShort: 'Col.{n}',
      rowN: 'Row {n}',
      rowShort: 'R.{n}',
      parseError: 'Error while reading the data.',
      noTable: 'Could not detect a table. Please paste Markdown or tab-separated data.',
      confirmImport: 'Replace the current table with the pasted data?',
      imported: 'Table imported ({cols} columns, {rows} rows).',
      importError: 'Error while inserting the table.',
      clickCellFirst: 'Please click into a cell first.',
      badgeInserted: 'Badge inserted.',
      presetApplied: 'Preset applied — colors can still be changed individually.',
      confirmReset: 'Reset all design settings? (Content is kept)',
      makingPng: 'Creating PNG…',
      pngDone: 'PNG downloaded.',
      pngError: 'Error during PNG export.',
      makingPdf: 'Creating PDF…',
      pdfDone: 'PDF downloaded.',
      pdfError: 'Error during PDF export.',
      fileName: 'table'
    },
    es: {
      themeToggle: 'Cambiar claro/oscuro',
      designTitle: 'Diseño',
      cloudSaving: 'Guardando…',
      cloudTitle: 'Tablas guardadas',
      cloudEmailPh: 'Correo electrónico',
      cloudLogin: 'Enviar enlace de acceso',
      cloudLoginHint: 'Recibirás un enlace de acceso por correo. Solo pueden entrar los miembros del equipo invitados.',
      cloudLogout: 'Cerrar sesión',
      cloudNamePh: 'Nombre de la tabla',
      cloudSave: 'Guardar',
      cloudSaveNew: 'Guardar como nueva',
      cloudNew: 'Empezar tabla nueva',
      cloudEmpty: 'Todavía no hay tablas guardadas.',
      cloudDelete: 'Eliminar',
      cloudError: 'Error de conexión con la base de datos.',
      cloudOpened: 'Tabla abierta.',
      cloudUntitled: 'Tabla sin nombre',
      cloudSaved: 'Tabla guardada.',
      cloudConfirmDelete: '¿Eliminar «{name}» definitivamente?',
      cloudDeleted: 'Tabla eliminada.',
      cloudLoginError: 'No se ha podido iniciar sesión. ¿Has sido invitado?',
      cloudLinkSent: 'Enlace enviado – revisa tu correo.',
      badge_green: 'Verde',
      badge_yellow: 'Amarillo',
      badge_orange: 'Naranja',
      badge_red: 'Rojo',
      badge_blue: 'Azul',
      badge_violet: 'Violeta',
      badge_gray: 'Gris',
      appTitle: 'Exportador de tablas',
      appSub: 'Edita la tabla, ajusta el diseño y exporta como PNG o PDF.',
      importTitle: 'Importar tabla',
      importPlaceholder: 'Pega aquí una tabla Markdown o celdas copiadas de Excel/Sheets…',
      importBtn: 'Insertar tabla (reemplaza la actual)',
      importHint: 'Reconoce tablas Markdown (incl. **negrita** y alineación mediante la fila separadora) y datos separados por tabuladores. Reemplaza toda la tabla actual.',
      contentTitle: 'Contenido',
      showCaption: 'Mostrar título de la tabla',
      addRow: '+ Fila',
      addCol: '+ Columna',
      contentHint: 'Haz clic en una celda para editarla. + añade una fila o columna, × (al pasar el ratón) la elimina. Para una etiqueta, coloca el cursor en la celda y haz clic en la etiqueta de arriba.',
      badgeLabel: 'Insertar etiqueta:',
      badgeTitle: 'Insertar etiqueta',
      insertBadge: 'Insertar en la celda',
      badgeHint: 'Coloca primero el cursor en la celda de destino y luego haz clic.',
      colorsTitle: 'Colores',
      preset: 'Preajuste',
      presetCustom: 'Personalizado',
      colorPrimary: 'Color principal (encabezado/borde)',
      colorRowAlt: 'Fila alterna',
      typoTitle: 'Tipografía',
      fontFamily: 'Fuente',
      fontSize: 'Tamaño de fuente',
      shapeTitle: 'Forma',
      radius: 'Radio de esquina',
      colWidthTitle: 'Ancho de columna',
      colWidthHint: 'Valor en px por columna, vacío = ancho automático.',
      rowHeightTitle: 'Alto de fila',
      rowHeightHint: 'Valor en px por fila, vacío = alto automático (se ajusta al contenido).',
      exportTitle: 'Exportar',
      exportScale: 'Resolución',
      scale1: '1× (pantalla)',
      scale2: '2× (impresión/Retina)',
      scale3: '3× (alta resolución)',
      exportPng: 'Exportar como PNG',
      exportPdf: 'Exportar como PDF',
      resetAll: 'Restablecer todo',
      previewTitle: 'Vista previa — se exporta 1:1',
      confirmDefault: '¿Confirmar acción?',
      confirmNo: 'Cancelar',
      confirmYes: 'Sí, continuar',
      minRow: 'Debe quedar al menos una fila.',
      minCol: 'Debe quedar al menos una columna.',
      newValue: 'Nuevo valor',
      newColumn: 'Nueva columna',
      value: 'Valor',
      columnN: 'Columna {n}',
      colShort: 'Col.{n}',
      rowN: 'Fila {n}',
      rowShort: 'F.{n}',
      parseError: 'Error al leer los datos.',
      noTable: 'No se ha podido reconocer ninguna tabla. Pega datos en Markdown o separados por tabuladores.',
      confirmImport: '¿Reemplazar la tabla actual por los datos pegados?',
      imported: 'Tabla importada ({cols} columnas, {rows} filas).',
      importError: 'Error al insertar la tabla.',
      clickCellFirst: 'Haz clic primero en una celda.',
      badgeInserted: 'Etiqueta insertada.',
      presetApplied: 'Preajuste aplicado — los colores se pueden seguir cambiando por separado.',
      confirmReset: '¿Restablecer todos los ajustes de diseño? (El contenido se conserva)',
      makingPng: 'Generando PNG…',
      pngDone: 'PNG descargado.',
      pngError: 'Error al exportar el PNG.',
      makingPdf: 'Generando PDF…',
      pdfDone: 'PDF descargado.',
      pdfError: 'Error al exportar el PDF.',
      fileName: 'tabla'
    }
  };

  const SUPPORTED = Object.keys(translations);
  const STORAGE_KEY = 'tabellenexporter-lang';

  function detectLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* localStorage nicht verfügbar */ }
    const nav = (navigator.language || 'de').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : 'de';
  }

  let current = detectLang();

  function t(key, vars) {
    let s = (translations[current] && translations[current][key]) ?? translations.de[key] ?? key;
    if (vars) Object.keys(vars).forEach(k => { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }

  function applyTranslations() {
    document.documentElement.lang = current;
    document.title = t('appTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === current);
      b.setAttribute('aria-pressed', b.dataset.lang === current);
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignorieren */ }
    applyTranslations();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  window.t = t;
  window.setLang = setLang;

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('tabellenexporter-theme', next); } catch (e) { /* ignorieren */ }
    });
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });
    applyTranslations();
  });
})();
