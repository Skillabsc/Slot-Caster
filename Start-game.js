// File: api/start-game.js

import { FrameRequest } from '@farcaster/hub-nodejs';

// Endpoint untuk mengarahkan pemain ke game yang mereka pilih
export default async function handler(req, res) {
    // Ambil data dari permintaan Farcaster
    const body = req.body;
    const { buttonIndex } = body.untrustedData;

    // Tentukan URL Frame game berdasarkan tombol yang ditekan
    let frameUrl;
    switch (buttonIndex) {
        case 1: // Crypto Mahjong
            frameUrl = 'https://your-vercel-domain.com/api/game?name=mahjong';
            break;
        case 2: // The Dark Pool
            frameUrl = 'https://your-vercel-domain.com/api/game?name=darkpool';
            break;
        case 3: // Zeus of the Chain
            frameUrl = 'https://your-vercel-domain.com/api/game?name=zeus';
            break;
        case 4: // Leaderboard
            frameUrl = 'https://your-vercel-domain.com/api/leaderboard';
            break;
        default:
            // Arahkan kembali ke halaman awal jika tombol tidak valid
            frameUrl = 'https://your-vercel-domain.com/';
            break;
    }

    // Kirim respons 302 (Redirect) ke Frame yang benar
    res.status(302).setHeader('Location', frameUrl).end();
}