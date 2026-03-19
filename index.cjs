'use strict';

const axios = require('axios');

// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE_URL = 'https://waapi.fyas.my.id/i';
const RATE_LIMIT_MS = 30 * 1000;
const lastSendAtByApiKey = new Map();

// ── Auth / Client ─────────────────────────────────────────────────────────────
function resolveApiKey(explicitApiKey) {
  const candidate =
    explicitApiKey != null && String(explicitApiKey).trim() !== ''
      ? String(explicitApiKey).trim()
      : (process.env.WA_API_KEY || '').trim();

  if (!candidate) {
    throw new Error(
      'API key belum diset. Set env WA_API_KEY atau gunakan createClient({ apiKey }).'
    );
  }

  return candidate;
}

function createApiClient({ apiKey, baseUrl } = {}) {
  const resolvedKey = resolveApiKey(apiKey);
  const client = axios.create({
    baseURL: baseUrl || API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': resolvedKey
    }
  });

  client.__waApiKey = resolvedKey;
  return client;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalizeNumber(number) {
  // Strip non-digit chars, ensure it starts with country code (no leading +)
  return String(number).replace(/\D/g, '');
}

function enforceRateLimit(api) {
  const apiKey = (api && api.__waApiKey) || resolveApiKey();
  const now = Date.now();
  const lastSendAt = lastSendAtByApiKey.get(apiKey);

  if (typeof lastSendAt === 'number') {
    const elapsed = now - lastSendAt;
    if (elapsed < RATE_LIMIT_MS) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
      throw new Error(
        `Rate limit: maksimal 1 pesan per 30 detik per API key. Coba lagi dalam ${waitSeconds} detik.`
      );
    }
  }

  lastSendAtByApiKey.set(apiKey, now);
}

// ── sendMessage ───────────────────────────────────────────────────────────────
/**
 * Kirim pesan teks ke nomor WhatsApp.
 * @param {string|number} number  - Nomor tujuan (format: 628xxx atau 08xxx)
 * @param {string}        message - Isi pesan teks
 * @returns {Promise<Object|null>} Response data dari API, atau null jika gagal
 */
async function sendMessageWithApi(api, number, message) {
  if (!number || !message) {
    throw new Error('Parameter "number" dan "message" wajib diisi.');
  }
  enforceRateLimit(api);

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

async function sendMessage(number, message) {
  return sendMessageWithApi(createApiClient(), number, message);
}

// ── sendImage ─────────────────────────────────────────────────────────────────
/**
 * Kirim gambar ke nomor WhatsApp.
 * @param {string|number} number  - Nomor tujuan
 * @param {string}        imageUrl - URL gambar yang akan dikirim
 * @param {string}        [caption=''] - Caption gambar (opsional)
 * @returns {Promise<Object|null>}
 */
async function sendImageWithApi(api, number, imageUrl, caption = '') {
  if (!number || !imageUrl) {
    throw new Error('Parameter "number" dan "imageUrl" wajib diisi.');
  }
  enforceRateLimit(api);

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

async function sendImage(number, imageUrl, caption = '') {
  return sendImageWithApi(createApiClient(), number, imageUrl, caption);
}

// ── sendDocument ──────────────────────────────────────────────────────────────
/**
 * Kirim dokumen/file ke nomor WhatsApp.
 * @param {string|number} number      - Nomor tujuan
 * @param {string}        documentUrl - URL dokumen yang akan dikirim
 * @param {string}        [filename='file'] - Nama file (opsional)
 * @returns {Promise<Object|null>}
 */
async function sendDocumentWithApi(api, number, documentUrl, filename = 'file') {
  if (!number || !documentUrl) {
    throw new Error('Parameter "number" dan "documentUrl" wajib diisi.');
  }
  enforceRateLimit(api);

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

async function sendDocument(number, documentUrl, filename = 'file') {
  return sendDocumentWithApi(createApiClient(), number, documentUrl, filename);
}

// ── createClient ──────────────────────────────────────────────────────────────
function createClient(config = {}) {
  const api = createApiClient(config);
  return {
    sendMessage: (number, message) => sendMessageWithApi(api, number, message),
    sendImage: (number, imageUrl, caption = '') =>
      sendImageWithApi(api, number, imageUrl, caption),
    sendDocument: (number, documentUrl, filename = 'file') =>
      sendDocumentWithApi(api, number, documentUrl, filename)
  };
}

// ── Exports ───────────────────────────────────────────────────────────────────
module.exports = {
  createClient,
  sendMessage,
  sendImage,
  sendDocument
};
