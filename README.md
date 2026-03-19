# wa-api-notify

> A lightweight Node.js library for sending WhatsApp messages, images, and documents via the [waapi.fyas.my.id](https://waapi.fyas.my.id) API.

[![npm version](https://img.shields.io/npm/v/wa-api-notify.svg)](https://www.npmjs.com/package/wa-api-notify)
[![license](https://img.shields.io/npm/l/wa-api-notify.svg)](./LICENSE)
[![node](https://img.shields.io/node/v/wa-api-notify.svg)](https://nodejs.org)

---

## About

**wa-api-notify** is a simple Node.js wrapper for the WhatsApp API at [waapi.fyas.my.id](https://waapi.fyas.my.id). It lets you send text messages, images with captions, and document files to any WhatsApp number — with support for both CommonJS and ES Modules.

**Topics:** `whatsapp` `whatsapp-api` `nodejs` `notification` `messaging` `bot` `sender`

---

## Installation

```bash
npm install wa-api-notify
```

---

## Usage

## Configuration

This library requires an API key.

- Set the environment variable `WA_API_KEY`, or
- Pass `apiKey` via `createClient({ apiKey })`.

## Important Update

- Rate limit: `1 message per 30 seconds` per API key.
- If the limit is exceeded, requests are temporarily rejected.
- Keep your API key secret and only use it as needed.
- API endpoint: [https://waapi.fyas.my.id/](https://waapi.fyas.my.id/)

This rate limit applies to all send methods: `sendMessage`, `sendImage`, and `sendDocument`.

### CommonJS (`require`)

```js
const { sendMessage, sendImage, sendDocument, createClient } = require('wa-api-notify');

// Option A (recommended): create a client (OpenAI-style)
const client = createClient({
  apiKey: process.env.WA_API_KEY,
});

await client.sendMessage('628123456789', 'Hello from Node.js!');

// Option B: use top-level functions (requires WA_API_KEY env var)

// Send a text message
await sendMessage('628123456789', 'Hello from Node.js!');

// Send an image
await sendImage('628123456789', 'https://example.com/photo.jpg', 'Image caption');

// Send a document
await sendDocument('628123456789', 'https://example.com/file.pdf', 'report.pdf');
```

### ES Modules (`import`)

```js
import { sendMessage, sendImage, sendDocument, createClient } from 'wa-api-notify';

const client = createClient({
  apiKey: process.env.WA_API_KEY,
});

await client.sendMessage('628123456789', 'Hello from ESM!');

// Or, top-level functions (requires WA_API_KEY env var)

await sendMessage('628123456789', 'Hello from ESM!');
```

---

## API Reference

### `sendMessage(number, message)`

Send a text message to a WhatsApp number.

| Parameter | Type             | Description                              |
|-----------|------------------|------------------------------------------|
| `number`  | `string\|number` | Destination number (e.g. `628123456789`) |
| `message` | `string`         | Text message content                     |

**Returns:** `Promise<Object>` — API response with delivery details.

---

### `sendImage(number, imageUrl, caption?)`

Send an image to a WhatsApp number.

| Parameter  | Type             | Default | Description                        |
|------------|------------------|---------|------------------------------------|
| `number`   | `string\|number` | —       | Destination number                 |
| `imageUrl` | `string`         | —       | Image URL (JPG, PNG, etc.)         |
| `caption`  | `string`         | `''`    | Optional image caption             |

**Returns:** `Promise<Object>`

---

### `sendDocument(number, documentUrl, filename?)`

Send a document or file to a WhatsApp number.

| Parameter     | Type             | Default  | Description                        |
|---------------|------------------|----------|------------------------------------|
| `number`      | `string\|number` | —        | Destination number                 |
| `documentUrl` | `string`         | —        | Document URL (PDF, DOCX, etc.)     |
| `filename`    | `string`         | `'file'` | Display filename                   |

**Returns:** `Promise<Object>`

---

## Error Handling

All functions throw an `Error` on failure. Use `try/catch`:

When the rate limit is exceeded, the function also throws an `Error` immediately (temporary rejection), so always handle errors safely.

```js
try {
  const result = await sendMessage('628123456789', 'Test message');
  console.log('Success:', result);
} catch (err) {
  console.error('Failed:', err.message);
}
```

---

## Requirements

- Node.js >= 16

---

## Website

📦 npm: [https://www.npmjs.com/package/wa-api-notify](https://www.npmjs.com/package/wa-api-notify)  
🌐 API: [https://waapi.fyas.my.id](https://waapi.fyas.my.id)  
🐙 GitHub: [https://github.com/KiroFyzu/wa-api-notify](https://github.com/KiroFyzu/wa-api-notify)

---

## License

MIT

---

<details>
<summary>🇮🇩 Dokumentasi Bahasa Indonesia</summary>

## Instalasi

```bash
npm install wa-api-notify
```

## Penggunaan

```js
const { sendMessage, sendImage, sendDocument, createClient } = require('wa-api-notify');

// Opsi A (disarankan): buat client (gaya OpenAI)
const client = createClient({
  apiKey: process.env.WA_API_KEY,
});

await client.sendMessage('628123456789', 'Hello dari Node.js!');

// Opsi B: gunakan fungsi langsung (WA_API_KEY harus diset di env)

// Kirim pesan teks
await sendMessage('628123456789', 'Hello dari Node.js!');

// Kirim gambar
await sendImage('628123456789', 'https://example.com/foto.jpg', 'Caption gambar');

// Kirim dokumen
await sendDocument('628123456789', 'https://example.com/file.pdf', 'laporan.pdf');
```

## Pembaruan Penting

- Batas kirim: `1 pesan per 30 detik` untuk setiap API key.
- Jika melebihi batas, request akan ditolak sementara.
- Jaga kerahasiaan API key Anda dan gunakan seperlunya.
- Endpoint API: [https://waapi.fyas.my.id/](https://waapi.fyas.my.id/)

Aturan ini berlaku untuk semua metode kirim: `sendMessage`, `sendImage`, dan `sendDocument`.

## Error Handling

Semua fungsi akan `throw Error` jika terjadi kegagalan. Gunakan `try/catch`:

Jika batas kirim terlewati, fungsi juga akan melempar `Error` secara langsung (penolakan sementara), jadi pastikan selalu menangani error.

```js
try {
  const result = await sendMessage('628123456789', 'Test pesan');
  console.log('Sukses:', result);
} catch (err) {
  console.error('Gagal:', err.message);
}
```

</details>
