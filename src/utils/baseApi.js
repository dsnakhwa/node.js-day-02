import axios from 'axios';
import 'dotenv/config'

const BASE_URL = process.env.BASE_URL
async function get(endpoint) {
    try {
        const response = await axios.get(BASE_URL + endpoint)
        return response.data
    } catch (err) {
        throw new Error(`GET ${endpoint} failed: ${err.message}`)
    }
}

export default { get }
