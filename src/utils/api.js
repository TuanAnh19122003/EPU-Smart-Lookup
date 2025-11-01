import axios from 'axios'
import { Platform } from 'react-native'


const HOST = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000'
const API_URL = `${HOST}/api`

export async function searchAPI(q, signal) {
    const res = await axios.get(`${API_URL}/meili/search`, { params: { q }, signal })
    if (!res.data.success) throw new Error(res.data.message)
    return res.data
}
