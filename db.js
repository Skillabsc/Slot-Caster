// File: lib/db.js
import { Client } from 'pg';

export async function saveWin(fid, walletAddress, winAmount, betAmount, winType) {
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();
    const query = `
        INSERT INTO high_scores (fid, wallet_address, win_amount, bet_amount, win_type)
        VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [fid, walletAddress, winAmount, betAmount, winType];
    await client.query(query, values);
    await client.end();
}
