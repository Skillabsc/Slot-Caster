// File: api/spin.js
import { ethers } from 'ethers';
import { SLOT_CASTER_ABI, SLOT_CASTER_ADDRESS } from '../lib/constants';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const { game } = req.query; // Get the game name from the URL
        
        // Connect to the Base blockchain
        const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
        const slotCasterContract = new ethers.Contract(SLOT_CASTER_ADDRESS, SLOT_CASTER_ABI, provider);

        // Define a fixed bet amount for simplicity in this example.
        // In a real app, this might be a value chosen by the user.
        const betAmount = ethers.parseUnits("0.01", "ether"); 

        // Encode the function call for the 'spin' function in your smart contract
        const txData = slotCasterContract.interface.encodeFunctionData('spin', [betAmount]);
        
        // This is the object that tells Farcaster to initiate a transaction
        const responseBody = {
            transaction: {
                chainId: "eip155:8453", // The chain ID for Base Mainnet
                method: "eth_sendTransaction",
                params: {
                    abi: SLOT_CASTER_ABI,
                    to: SLOT_CASTER_ADDRESS,
                    data: txData,
                },
            },
        };
        
        return res.status(200).json(responseBody);

    } catch (error) {
        console.error("Error processing spin request:", error);
        return res.status(500).json({ error: "An error occurred during the spin." });
    }
}