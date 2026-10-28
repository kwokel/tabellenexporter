// ---------- Login & Online-Speichern (Supabase) ----------
(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const box = document.getElementById('cloudSection');
  const $ = id => document.getElementById(id);
  // Meldungen direkt im Speicherbereich anzeigen (die allgemeine Statuszeile liegt weit unten)
  function flash(msg, isError) {
    const el = document.getElementById('cloudStatus');
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
    clearTimeout(flash._t);
    if (!isError) flash._t = setTimeout(() => { el.textContent = ''; }, 3000);
  }
  function fail(error) {
    console.error(error);
    flash(t('cloudError') + ' ' + (error && (error.message || error.code) || ''), true);
  }

  if (!window.supabase || !cfg.url || cfg.url.includes('DEIN-PROJEKT')) {
    box.style.display = 'none';
    return;
  }

  const sb = window.supabase.createClient(cfg.url, cfg.key);
  let user = null;
  let currentId = null;      // ID der geöffneten gespeicherten Tabelle
  let tables = [];

  function render() {
    $('cloudLoggedOut').style.display = user ? 'none' : '';
    $('cloudLoggedIn').style.display = user ? '' : 'none';
    if (user) $('cloudUser').textContent = user.email;
    renderList();
  }

  function fmtDate(iso) {
    const lang = document.documentElement.lang || 'de';
    return new Date(iso).toLocaleString(lang, { dateStyle: 'short', timeStyle: 'short' });
  }

  function renderList() {
    const list = $('cloudList');
    list.innerHTML = '';
    if (!user) return;
    if (tables.length === 0) {
      const p = document.createElement('p');
      p.className = 'hint';
      p.textContent = t('cloudEmpty');
      list.appendChild(p);
      return;
    }
    tables.forEach(row => {
      const item = document.createElement('div');
      item.className = 'cloud-item' + (row.id === currentId ? ' active' : '');
      const info = document.createElement('div');
      info.className = 'cloud-item-info';
      const name = document.createElement('strong');
      name.textContent = row.name;
      const meta = document.createElement('span');
      meta.textContent = fmtDate(row.updated_at) + ' · ' + (row.updated_by_email || row.created_by_email || '');
      info.append(name, meta);
      info.onclick = () => openTable(row.id);
      item.appendChild(info);
      if (row.created_by === user.id) {
        const del = document.createElement('button');
        del.className = 'cloud-del';
        del.title = t('cloudDelete');
        del.textContent = '×';
        del.onclick = (e) => { e.stopPropagation(); deleteTable(row); };
        item.appendChild(del);
      }
      list.appendChild(item);
    });
  }

  async function loadList() {
    const { data, error } = await sb.from('saved_tables')
      .select('id, name, created_by, created_by_email, updated_by_email, updated_at')
      .order('updated_at', { ascending: false });
    if (error) { fail(error); return; }
    tables = data;
    renderList();
  }

  async function openTable(id) {
    const { data, error } = await sb.from('saved_tables').select('id, name, data').eq('id', id).single();
    if (error) { fail(error); return; }
    window.tableApp.setState(data.data);
    currentId = data.id;
    $('cloudName').value = data.name;
    renderList();
    flash(t('cloudOpened'));
  }

  async function save(asNew) {
    flash(t('cloudSaving'));
    try {
    const name = $('cloudName').value.trim() || t('cloudUntitled');
    const payload = { name, data: window.tableApp.getState() };
    let res;
    if (currentId && !asNew) {
      res = await sb.from('saved_tables').update(payload).eq('id', currentId).select('id').single();
    } else {
      res = await sb.from('saved_tables').insert(payload).select('id').single();
    }
    if (res.error) { fail(res.error); return; }
    currentId = res.data.id;
    $('cloudName').value = name;
    flash(t('cloudSaved'));
    loadList();
    } catch (e) { fail(e); }
  }

  async function deleteTable(row) {
    const ok = await window.tableApp.confirm(t('cloudConfirmDelete', { name: row.name }));
    if (!ok) return;
    const { error } = await sb.from('saved_tables').delete().eq('id', row.id);
    if (error) { fail(error); return; }
    if (currentId === row.id) currentId = null;
    flash(t('cloudDeleted'));
    loadList();
  }

  $('cloudLoginBtn').onclick = async () => {
    const email = $('cloudEmail').value.trim();
    if (!email) return;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: location.origin + location.pathname }
    });
    if (error) { console.error(error); flash(t('cloudLoginError') + ' ' + error.message, true); return; }
    flash(t('cloudLinkSent'));
  };
  $('cloudLogoutBtn').onclick = (e) => { e.preventDefault(); sb.auth.signOut(); };
  $('cloudSaveBtn').onclick = () => save(false);
  $('cloudSaveNewBtn').onclick = () => save(true);
  $('cloudNewBtn').onclick = () => { currentId = null; $('cloudName').value = ''; renderList(); };

  sb.auth.onAuthStateChange((_event, session) => {
    const newUser = session ? session.user : null;
    const changed = (newUser && newUser.id) !== (user && user.id);
    user = newUser;
    render();
    if (changed && user) loadList();
    if (!user) { tables = []; currentId = null; }
  });

  document.addEventListener('langchange', renderList);
})();
