// server.js
import http from "http";
import axios from "axios";
import {URLSearchParams} from "url";

// Replace these with your actual Amadeus credentials
const AMADEUS_CLIENT_ID = "AR6LEfJsQ7LHKYy33vMEoGezJGIbKuoD";
const AMADEUS_CLIENT_SECRET = "GGoB2J8HiAVKGPGH";

const PORT = 3001;

const server = http.createServer(async (req, res) => {
    if (req.method === "POST" && req.url === "/api/amadeus-token") {
        try {
            const body = new URLSearchParams({
                grant_type: "client_credentials",
                client_id: AMADEUS_CLIENT_ID,
                client_secret: AMADEUS_CLIENT_SECRET,
            });

            const response = await axios.post(
                "https://test.api.amadeus.com/v1/security/oauth2/token",
                body.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // CORS headers so React can call this server
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");

            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(response.data));
        } catch (err) {
            console.error("Amadeus token error:", err.message);
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: err.message}));
        }
    } else if (req.method === "OPTIONS") {
        // Preflight for CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
