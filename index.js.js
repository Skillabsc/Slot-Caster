// File: api/index.js
import { FrameRequest } from '@farcaster/hub-nodejs';

// Endpoint untuk melayani Frame awal
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        // Ini adalah tampilan awal Frame
        return res.status(200).send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Slot Caster</title>
                    <meta property="fc:frame" content="vNext" />
                    <meta property="fc:frame:image" content="https://your-vercel-domain.com/images/initial-screen.png" />
                    <meta property="fc:frame:button:1" content="Play Crypto Mahjong" />
                    <meta property="fc:frame:button:2" content="Play The Dark Pool" />
                    <meta property="fc:frame:button:3" content="Play Zeus of the Chain" />
                    <meta property="fc:frame:button:4" content="Leaderboard" />
                    <meta property="fc:frame:post_url" content="https://your-vercel-domain.com/api/start-game" />
                </head>
            </html>
        `);
    }

    // Bagian ini akan dieksekusi saat pemain menekan tombol
    const body = req.body;
    const { buttonIndex } = body.untrustedData;

    // Arahkan ke endpoint berikutnya berdasarkan tombol yang ditekan
    // Logika ini akan ditangani di file `api/start-game.js`
    res.status(302).setHeader('Location', 'https://your-vercel-domain.com/api/start-game?game=' + buttonIndex).end();
}