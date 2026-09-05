import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url, {
                    signal: controller.signal
                })

                if (!response.ok) {
                    throw new Error(`Failed to load: ${response.status}`)
                }

                const jsonData = await response.json()
                setData(jsonData)

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Something went wrong')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [url])

    return { data, loading, error }
}