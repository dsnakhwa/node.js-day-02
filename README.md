# Node.js Core Concepts — Day 02

A hands-on exploration of Node.js fundamentals covering Streams, bare HTTP servers, and the Event Loop.

---

## 📁 Project Structure

```
day-02/
├── src/
│   ├── api/
│   │   └── fetchUrls.js          # Task 0 — Sequential vs Parallel fetching
│   ├── utils/
│   │   └── baseApi.js            # Axios wrapper
│   ├── streams.js                # Task A — File streaming with Transform
│   ├── generateFile.js           # Task A — 500MB file generator
│   ├── server.js                 # Task B — Bare HTTP server
│   └── eventloop.js              # Task C — Event Loop prediction
```

---

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18.0.0
npm >= 8.0.0
```

### Install Dependencies
```bash
npm install axios
```

---

## Task A — Streams 📁

Copy a 500MB+ file using Node.js `pipeline` with a `Transform` stream.

### Concepts Covered
- `createReadStream` / `createWriteStream`
- `Transform` stream — uppercase text or count lines
- `pipeline` vs `pipe` — why pipeline is safer

### Run

**Step 1 — Generate the 500MB file**
```bash
node src/generateFile.js
```

**Step 2 — Copy with Transform**
```bash
node src/streams.js
```

### Key Takeaway
```
pipe()      → memory leaks on error, no cleanup      ❌
pipeline()  → auto cleans up all streams on error    ✅
```

---

## Task B — Bare HTTP Server 🌐

A Node.js HTTP server built without Express supporting two routes with manual JSON body parsing.

### Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/health` | Returns server status and uptime |
| POST | `/echo` | Echoes back the JSON body |

### Run
```bash
node src/server.js
```

### Test With curl
```bash
# GET /health
curl http://localhost:3000/health

# POST /echo
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'
```

### Expected Responses
```json
// GET /health
{ "status": "ok", "uptime": 12.345 }

// POST /echo
{ "echo": { "message": "hello" } }
```

### Key Takeaway
```
HTTP body comes in as chunks via req.on('data')
Must manually collect and JSON.parse() — no Express magic here!
```

---

## Task C — Event Loop 🔄

Predict and verify the output order of mixed async operations.

### The Snippet
```js
console.log('1 - start')
setTimeout(() => console.log('2 - setTimeout'), 0)
setImmediate(() => console.log('3 - setImmediate'))
Promise.resolve().then(() => console.log('4 - Promise.then'))
process.nextTick(() => console.log('5 - nextTick'))
console.log('6 - end')
```

### Run
```bash
node src/eventloop.js
```

### Output
```
1 - start
6 - end
5 - nextTick
4 - Promise.then
2 - setTimeout
3 - setImmediate
```

### Priority Ladder

| Priority | API | Queue |
|----------|-----|-------|
| 🥇 1st | `console.log` | Synchronous |
| 🥈 2nd | `process.nextTick()` | nextTick queue |
| 🥉 3rd | `Promise.then()` | Microtask queue |
| 4th | `setTimeout(fn, 0)` | Timers phase |
| 5th | `setImmediate()` | Check phase |

### Key Takeaway
```
nextTick   → runs before EVERYTHING async, even Promises
Promise    → microtask queue, before event loop phases
setTimeout → macrotask, timers phase
setImmediate → macrotask, check phase (always after setTimeout)
```

---

## 📚 Concepts Summary

| Task | Concept | Key Learning |
|------|---------|--------------|
| A | Streams | Use `pipeline`, Transform streams don't buffer whole file |
| B | HTTP | Body comes in chunks, must collect manually |
| C | Event Loop | nextTick > Promise > setTimeout > setImmediate |

---

## 📝 Notes

- All tasks use ES Modules (`import/export`) — ensure `"type": "module"` in `package.json`
- Task A requires generating `input.txt` before running `streams.js`
- Task C output order can vary for `setTimeout` vs `setImmediate` outside the I/O cycle
