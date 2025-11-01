import { useState, useEffect } from 'react'
import { searchAPI } from '../utils/api'

export default function useSearch() {
    const [query, setQuery] = useState('')
    const [students, setStudents] = useState([])
    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [lastSearch, setLastSearch] = useState('')

    useEffect(() => {
        // create an AbortController so we can cancel the request if query changes
        const controller = new AbortController()

        const delayDebounce = setTimeout(async () => {
            const q = query.trim()
            if (!q) {
                setStudents([])
                setCertificates([])
                setLoading(false)
                setError('')
                return
            }

            setLoading(true)
            setError('')

            try {
                // pass the controller.signal so the request can be cancelled
                const res = await searchAPI(q, controller.signal)
                setStudents(res.student || [])
                setCertificates(res.certificates || [])
            } catch (err) {
                // ignore cancellations
                if (err?.code === 'ERR_CANCELED' || err?.message?.toLowerCase?.().includes('canceled')) {
                    return
                }

                // prefer server message when available
                const msg = err?.message || 'Lỗi khi tìm kiếm dữ liệu'
                setError(msg)
            } finally {
                setLoading(false)
                setLastSearch(q)
            }
        }, 400)

        return () => {
            clearTimeout(delayDebounce)
            controller.abort()
        }
    }, [query])

    return { query, setQuery, students, certificates, loading, error, lastSearch }
}
