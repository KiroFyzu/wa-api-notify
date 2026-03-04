import axios from 'axios';

// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE_URL = 'https://waapi.fyas.my.id/i';
const API_KEY = 'wapi_3ac13d1d940643a5c5312671f077a35b5c1716235af8540797c22d592d6d99a2';

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  }
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalizeNumber(number) {
  return String(number).replace(/\D/g, '');
}

// ── sendMessage ───────────────────────────────────────────────────────────────
/**
 * Kirim pesan teks ke nomor WhatsApp.
 * @param {string|number} number  - Nomor tujuan (format: 628xxx atau 08xxx)
 * @param {string}        message - Isi pesan teks
 * @returns {Promise<Object>} Response data dari API
 */
export async function sendMessage(number, message) {
  if (!number || !message) {
    throw new Error('Parameter "number" dan "message" wajib diisi.');
  }
  try {
    const response = await api.post('/whatsapp/send-message', {
      number: normalizeNumber(number),
      message: String(message)
    });

    if (response.data && response.data.success) {
      return response.data;
    }

    const errMsg = (response.data && response.data.error) || 'Unknown API error';
    throw new Error(errMsg);
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

// ── sendImage ─────────────────────────────────────────────────────────────────
/**
 * Kirim gambar ke nomor WhatsApp.
 * @param {string|number} number   - Nomor tujuan
 * @param {string}        imageUrl - URL gambar yang akan dikirim
 * @param {string}        [caption=''] - Caption gambar (opsional)
 * @returns {Promise<Object>}
 */
export async function sendImage(number, imageUrl, caption = '') {
  if (!number || !imageUrl) {
    throw new Error('Parameter "number" dan "imageUrl" wajib diisi.');
  }
  try {
    const response = await api.post('/whatsapp/send-image', {
      number: normalizeNumber(number),
      image: String(imageUrl),
      caption: String(caption)
    });

    if (response.data && response.data.success) {
      return response.data;
    }

    const errMsg = (response.data && response.data.error) || 'Unknown API error';
    throw new Error(errMsg);
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

// ── sendDocument ──────────────────────────────────────────────────────────────
/**
 * Kirim dokumen/file ke nomor WhatsApp.
 * @param {string|number} number      - Nomor tujuan
 * @param {string}        documentUrl - URL dokumen yang akan dikirim
 * @param {string}        [filename='file'] - Nama file (opsional)
 * @returns {Promise<Object>}
 */
export async function sendDocument(number, documentUrl, filename = 'file') {
  if (!number || !documentUrl) {
    throw new Error('Parameter "number" dan "documentUrl" wajib diisi.');
  }
  try {
    const response = await api.post('/whatsapp/send-document', {
      number: normalizeNumber(number),
      document: String(documentUrl),
      filename: String(filename)
    });

    if (response.data && response.data.success) {
      return response.data;
    }

    const errMsg = (response.data && response.data.error) || 'Unknown API error';
    throw new Error(errMsg);
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}
