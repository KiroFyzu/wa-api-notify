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

### CommonJS (`require`)

```js
const { sendMessage, sendImage, sendDocument } = require('wa-api-notify');

// Send a text message
await sendMessage('628123456789', 'Hello from Node.js!');

// Send an image
await sendImage('628123456789', 'https://example.com/photo.jpg', 'Image caption');

// Send a document
await sendDocument('628123456789', 'https://example.com/file.pdf', 'report.pdf');
```

### ES Modules (`import`)

```js
import { sendMessage, sendImage, sendDocument } from 'wa-api-notify';

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
const { sendMessage, sendImage, sendDocument } = require('wa-api-notify');

// Kirim pesan teks
await sendMessage('628123456789', 'Hello dari Node.js!');

// Kirim gambar
await sendImage('628123456789', 'https://example.com/foto.jpg', 'Caption gambar');

// Kirim dokumen
await sendDocument('628123456789', 'https://example.com/file.pdf', 'laporan.pdf');
```

## Error Handling

Semua fungsi akan `throw Error` jika terjadi kegagalan. Gunakan `try/catch`:

```js
try {
  const result = await sendMessage('628123456789', 'Test pesan');
  console.log('Sukses:', result);
} catch (err) {
  console.error('Gagal:', err.message);
}
```

</details>
