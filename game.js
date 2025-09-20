// File: api/game.js
import { FrameRequest } from '@farcaster/hub-nodejs';

export default async function handler(req, res) {
    const { name } = req.query; // Get the game name from the URL parameter

    // This is the initial frame for the chosen game
    let frameImage;
    let postUrl;
    let buttonText;

    switch (name) {
        case 'mahjong':
            frameImage = 'https://your-vercel-domain.com/images/mahjong/initial.png';
            postUrl = 'https://your-vercel-domain.com/api/spin?game=mahjong';
            buttonText = 'Spin Mahjong';
            break;
        case 'darkpool':
            frameImage = 'https://your-vercel-domain.com/images/darkpool/initial.png';
            postUrl = 'https://your-vercel-domain.com/api/spin?game=darkpool';
            buttonText = 'Spin The Dark Pool';
            break;
        case 'zeus':
            frameImage = 'https://your-vercel-domain.com/images/zeus/initial.png';
            postUrl = 'https://your-vercel-domain.com/api/spin?game=zeus';
            buttonText = 'Spin Zeus';
            break;
        default:
            // Fallback to a default image if no game is specified
            frameImage = 'https://your-vercel-domain.com/images/error.png';
            postUrl = 'https://your-vercel-domain.com/';
            buttonText = 'Back to menu';
            break;
    }

    res.status(200).send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Slot Caster - ${name}</title>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="${frameImage}" />
                <meta property="fc:frame:button:1" content="${buttonText}" />
                <meta property="fc:frame:post_url" content="${postUrl}" />
            </head>
        </html>
    `);
}