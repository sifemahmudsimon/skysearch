// api/amadeus-token.js
import axios from "axios";
import {URLSearchParams} from "url";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const body = new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AMADEUS_CLIENT_ID,
                client_secret: process.env.AMADEUS_CLIENT_SECRET,
            });

            const response = await axios.post(
                "https://test.api.amadeus.com/v1/security/oauth2/token",
                body.toString(),
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
            );

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");

            res.status(200).json(response.data);
        } catch (err) {
            console.error("Amadeus token error:", err.message);
            res.status(500).json({error: err.message});
        }
    } else if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.status(204).end();
    } else {
        res.status(404).send("Not found");
    }
}
// api/amadeus-token.js
import axios from "axios";
import {URLSearchParams} from "url";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const body = new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AMADEUS_CLIENT_ID,
                client_secret: process.env.AMADEUS_CLIENT_SECRET,
            });

            const response = await axios.post(
                "https://test.api.amadeus.com/v1/security/oauth2/token",
                body.toString(),
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
            );

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");

            res.status(200).json(response.data);
        } catch (err) {
            console.error("Amadeus token error:", err.message);
            res.status(500).json({error: err.message});
        }
    } else if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.status(204).end();
    } else {
        res.status(404).send("Not found");
    }
}
