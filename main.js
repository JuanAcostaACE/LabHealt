const API = 'http://localhost:3000';

// ---------- Utilidades ----------
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function mostrar(seccion) {
  document.querySelectorAll('.seccion').forEach(s => s.classList.add('d-none'));
  $(seccion).classList.remove('d-none');
  document.querySelectorAll('[data-sec]').forEach(l => l.classList.toggle('active', l.dataset.sec === seccion));
}

document.querySelectorAll('[data-sec]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); mostrar(a.dataset.sec); });
});

// ---------- PACIENTES ----------
async function cargarPacientes() {
  const res = await fetch(`${API}/pacientes`);
  const pacientes = await res.json();
  const tbody = $('tbPacientes');
  tbody.innerHTML = '';
  const filtro = $('buscarPaciente').value.toLowerCase();
  pacientes.forEach(p => {
    if (filtro && !p.nombre.toLowerCase().includes(filtro)) return;
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${esc(p.nombre)}</td>
        <td>${esc(p.documento)}</td>
        <td>${esc(p.telefono)}</td>
        <td>${esc(p.email)}</td>
        <td>${esc(p.fechaNacimiento)}</td>
        <td>${esc(p.tipoSangre)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarPaciente(${p.id})">Eliminar</button>
        </td>
      </tr>`;
  });
}

$('buscarPaciente').addEventListener('input', cargarPacientes);

$('btnGuardarPaciente').addEventListener('click', async () => {
  const id = $('pacienteId').value;
  const payload = {
    nombre: $('pNombre').value,
    documento: $('pDocumento').value,
    telefono: $('pTelefono').value,
    email: $('pEmail').value,
    fechaNacimiento: $('pFechaNacimiento').value,
    tipoSangre: $('pTipoSangre').value,
    antecedentesClinicos: $('pAntecedentes').value,
  };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API}/pacientes/${id}` : `${API}/pacientes`;
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  bootstrap.Modal.getInstance($('modalPaciente')).hide();
  $('formPaciente').reset();
  $('pacienteId').value = '';
  cargarPacientes();
});

window.eliminarPaciente = async (id) => {
  if (!confirm('¿Eliminar este paciente?')) return;
  await fetch(`${API}/pacientes/${id}`, { method: 'DELETE' });
  cargarPacientes();
};

// ---------- DOCTORES ----------
async function cargarDoctores() {
  const res = await fetch(`${API}/doctores`);
  const doctores = await res.json();
  const tbody = $('tbDoctores');
  tbody.innerHTML = '';
  const filtro = $('buscarDoctor').value.toLowerCase();
  doctores.forEach(d => {
    if (filtro && !d.nombre.toLowerCase().includes(filtro)) return;
    tbody.innerHTML += `
      <tr>
        <td>${d.id}</td>
        <td>${esc(d.nombre)}</td>
        <td>${esc(d.especialidad)}</td>
        <td>${esc(d.licencia)}</td>
        <td>${esc(d.email)}</td>
        <td>${esc(d.telefono)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarDoctor(${d.id})">Eliminar</button>
        </td>
      </tr>`;
  });
}

$('buscarDoctor').addEventListener('input', cargarDoctores);

$('btnGuardarDoctor').addEventListener('click', async () => {
  const id = $('doctorId').value;
  const payload = {
    nombre: $('dNombre').value,
    especialidad: $('dEspecialidad').value,
    licencia: $('dLicencia').value,
    email: $('dEmail').value,
    telefono: $('dTelefono').value,
  };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API}/doctores/${id}` : `${API}/doctores`;
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  bootstrap.Modal.getInstance($('modalDoctor')).hide();
  $('formDoctor').reset();
  $('doctorId').value = '';
  cargarDoctores();
});

window.eliminarDoctor = async (id) => {
  if (!confirm('¿Eliminar este doctor?')) return;
  await fetch(`${API}/doctores/${id}`, { method: 'DELETE' });
  cargarDoctores();
};

// ---------- HISTORIAS CLÍNICAS ----------
async function cargarHistorias() {
  const res = await fetch(`${API}/historias-clinicas`);
  const historias = await res.json();
  const tbody = $('tbHistorias');
  tbody.innerHTML = '';
  historias.forEach(h => {
    tbody.innerHTML += `
      <tr>
        <td>${h.id}</td>
        <td>${esc(h.pacienteNombre ?? h.pacienteId)}</td>
        <td>${esc(h.doctorNombre ?? h.doctorId)}</td>
        <td>${esc(h.fecha)}</td>
        <td>${esc(h.diagnostico)}</td>
        <td>${esc(h.tratamiento)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarHistoria(${h.id})">Eliminar</button>
        </td>
      </tr>`;
  });
}

window.eliminarHistoria = async (id) => {
  if (!confirm('¿Eliminar esta historia clínica?')) return;
  await fetch(`${API}/historias-clinicas/${id}`, { method: 'DELETE' });
  cargarHistorias();
};

// Llenar selects de pacientes y doctores en el modal de historia
async function llenarSelectsHistoria() {
  const [pacRes, docRes] = await Promise.all([
    fetch(`${API}/pacientes`),
    fetch(`${API}/doctores`),
  ]);
  const pacientes = await pacRes.json();
  const doctores = await docRes.json();
  const selPac = $('hPacienteId');
  const selDoc = $('hDoctorId');
  selPac.innerHTML = pacientes.map(p => `<option value="${p.id}">${esc(p.nombre)}</option>`).join('');
  selDoc.innerHTML = doctores.map(d => `<option value="${d.id}">${esc(d.nombre)}</option>`).join('');
}

$('btnGuardarHistoria').addEventListener('click', async () => {
  const payload = {
    pacienteId: Number($('hPacienteId').value),
    doctorId: Number($('hDoctorId').value),
    fecha: $('hFecha').value,
    diagnostico: $('hDiagnostico').value,
    tratamiento: $('hTratamiento').value,
    observaciones: $('hObservaciones').value,
  };
  await fetch(`${API}/historias-clinicas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  bootstrap.Modal.getInstance($('modalHistoria')).hide();
  $('formHistoria').reset();
  cargarHistorias();
});

// ---------- Inicialización ----------
document.addEventListener('DOMContentLoaded', async () => {
  cargarPacientes();
  cargarDoctores();
  cargarHistorias();
  llenarSelectsHistoria();

  $('modalHistoria').addEventListener('show.bs.modal', llenarSelectsHistoria);
});
