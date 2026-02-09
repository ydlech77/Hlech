const API_URL = "http://127.0.0.1:8000/api";

/* ================= HELPERS ================= */
function getToken() {
  return localStorage.getItem("token");
}

async function handleResponse(res) {
  const text = await res.text();

  try {
    const data = JSON.parse(text);
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    if (!res.ok) throw new Error(text || "Request failed");
    return text;
  }
}

/* ================= DRUGS ================= */
export async function getDrugs() {
  const res = await fetch(`${API_URL}/drugs/`);
  return handleResponse(res);
}

export async function addDrug(formData) {
  const res = await fetch(`${API_URL}/drugs/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });
  return handleResponse(res);
}

export async function updateDrug(id, data) {
  const res = await fetch(`${API_URL}/drugs/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteDrug(id) {
  const res = await fetch(`${API_URL}/drugs/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.ok;
}

/* ================= SALES ================= */
export async function getSales(sheetId = null) {
  let url = `${API_URL}/sales/`;
  if (sheetId) url += `?sheet=${sheetId}`;

  const res = await fetch(url);
  return handleResponse(res);
}

export async function addSale(data) {
  const res = await fetch(`${API_URL}/sales/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

/* ================= SHEETS (ADMIN ONLY) ================= */
export async function getSheets() {
  const res = await fetch(`${API_URL}/sheets/`);
  return handleResponse(res);
}

export async function addSheet(data) {
  const res = await fetch(`${API_URL}/sheets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteSheet(id) {
  const res = await fetch(`${API_URL}/sheets/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.ok;
}
