import React, { useState } from 'react'

export const useHttp = () => {
    // get => http://lh:8080/api/u => /api/u  

    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [message, setMessage] = useState("");

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'cors'
        }) => {
            setLoading(true)
            const response = await fetch(url, {
                method,
                body,
                headers
            })
            setLoading(false)

            const json = await response.json();

            setMessage(json.message);            
        },
        [loading, error],
        
    )

    return { request, loading, error, message }
}
