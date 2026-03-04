# wa-api-notify

> WhatsApp API wrapper — kirim pesan teks, gambar, dan dokumen dengan mudah via Node.js.

[![npm version](https://img.shields.io/npm/v/wa-api-notify.svg)](https://www.npmjs.com/package/wa-api-notify)
[![license](https://img.shields.io/npm/l/wa-api-notify.svg)](./LICENSE)

---

## Instalasi

```bash
npm install wa-api-notify
```

---

## Penggunaan

### CommonJS (`require`)

```js
const { sendMessage, sendImage, sendDocument } = require('wa-api-notify');

// Kirim pesan teks
await sendMessage('628123456789', 'Hello dari Node.js!');

// Kirim gambar
await sendImage('628123456789', 'https://example.com/foto.jpg', 'Caption gambar');

// Kirim dokumen
await sendDocument('628123456789', 'https://example.com/file.pdf', 'laporan.pdf');
```

### ESM (`import`)

```js
import { sendMessage, sendImage, sendDocument } from 'wa-api-notify';

await sendMessage('628123456789', 'Hello dari ESM!');
```

---

## API Reference

### `sendMessage(number, message)`

Kirim pesan teks ke nomor WhatsApp.

| Parameter | Tipe             | Keterangan                         |
|-----------|------------------|------------------------------------|
| `number`  | `string\|number` | Nomor tujuan (contoh: `628123456789`) |
| `message` | `string`         | Isi pesan teks                     |

**Returns:** `Promise<Object>` — response dari API berisi detail pengiriman.

---

### `sendImage(number, imageUrl, caption?)`

Kirim gambar ke nomor WhatsApp.

| Parameter  | Tipe             | Default | Keterangan                   |
|------------|------------------|---------|------------------------------|
| `number`   | `string\|number` | —       | Nomor tujuan                 |
| `imageUrl` | `string`         | —       | URL gambar (JPG, PNG, dll.)  |
| `caption`  | `string`         | `''`    | Caption gambar (opsional)    |

**Returns:** `Promise<Object>`

---

### `sendDocument(number, documentUrl, filename?)`

Kirim dokumen/file ke nomor WhatsApp.

| Parameter     | Tipe             | Default  | Keterangan                     |
|---------------|------------------|----------|--------------------------------|
| `number`      | `string\|number` | —        | Nomor tujuan                   |
| `documentUrl` | `string`         | —        | URL dokumen (PDF, DOCX, dll.)  |
| `filename`    | `string`         | `'file'` | Nama file yang ditampilkan     |

**Returns:** `Promise<Object>`

---

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

---

## Requirements

- Node.js >= 16

---

## License

MIT
