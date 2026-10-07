import http from 'http';
import 'dotenv/config';


const PORT = process.env.PORT;

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok', uptime: 'now' }))
        return
    }

    if (req.method === 'POST' && req.url === '/echo') {
        let body = ''

        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ data: parsed }))
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Invalid JSON' }))
            }
        })
        return
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Route not found' }))
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ✅`)
})
