// File: api/leaderboard.js
import { Client } from 'pg';

// A function to get the top 10 winners based on a timeframe
async function getLeaderboardData(timeframe) {
    const client = new Client({
        connectionString: process.env.POSTGRES_URL,
    });
    await client.connect();

    let query = `
        SELECT fid, MAX(win_amount) as largest_win, win_type
        FROM high_scores
    `;
    let values = [];

    if (timeframe === 'weekly') {
        query += ` WHERE timestamp >= NOW() - INTERVAL '7 days'`;
    } else if (timeframe === 'monthly') {
        query += ` WHERE timestamp >= NOW() - INTERVAL '30 days'`;
    }

    query += `
        GROUP BY fid, win_type
        ORDER BY largest_win DESC
        LIMIT 10
    `;

    try {
        const result = await client.query(query, values);
        return result.rows;
    } finally {
        await client.end();
    }
}

// The main handler for the API endpoint
export default async function handler(req, res) {
    try {
        const { timeframe } = req.query; // Get the timeframe (weekly/monthly) from the URL
        const leaderboardData = await getLeaderboardData(timeframe);

        // Send a JSON response with the leaderboard data
        res.status(200).json({
            leaderboard: leaderboardData.map(row => ({
                fid: row.fid,
                win_amount: row.largest_win,
                win_type: row.win_type
            }))
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
}
