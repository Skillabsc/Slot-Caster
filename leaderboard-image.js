// File: api/leaderboard-image.js
import { createCanvas } from 'canvas';
import { Client } from 'pg';

export default async function handler(req, res) {
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();
    
    const result = await client.query(`
        SELECT fid, MAX(win_amount) as largest_win
        FROM high_scores GROUP BY fid ORDER BY largest_win DESC LIMIT 10
    `);
    const leaderboardData = result.rows;

    const canvas = createCanvas(600, 600);
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 600, 600);
    
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.fillText('LEADERBOARD', 50, 50);
    
    leaderboardData.forEach((row, index) => {
        const text = `${index + 1}. FID ${row.fid}: ${row.largest_win} tokens`;
        ctx.fillText(text, 50, 100 + index * 40);
    });

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(canvas.toBuffer('image/png'));
}
