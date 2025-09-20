// File: api/image.js
import { createCanvas } from 'canvas';

export default async function handler(req, res) {
    const canvas = createCanvas(600, 600);
    const ctx = canvas.getContext('2d');
    
    // Logika menggambar gambar (latar belakang, simbol, teks)
    // Berdasarkan parameter dari URL, contoh: ?state=win&amount=...
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 600, 600);
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.fillText('WINNER!', 300, 300);

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(canvas.toBuffer('image/png'));
}
