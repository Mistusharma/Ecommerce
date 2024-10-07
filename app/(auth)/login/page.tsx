'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function SignUp() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            const response = await fetch('/api/login', {  // Adjusted route to match project structure
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            }
            const data = await response.json();// Set token expiration time to 1 minute (in milliseconds)
            localStorage.setItem('token', data.data)

            router.push('/home')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        }
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>
                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '0 20px',
    },
    form: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    input: {
        width: '100%',
        color: 'black',
        padding: '12px 15px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
}
