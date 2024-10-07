import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';

const Suggestion: React.FC = () => {
    const [suggestion, setSuggestion] = useState<any[]>([]);
    console.log("suggestion: ", suggestion);
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/home/suggestion', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log("errorData: ", errorData);
                    throw new Error(errorData.error);
                }
                const data = await response.json();

                setSuggestion(data.DATA); // Assuming you're receiving `DATA` as an array
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleProductClick = (id) => {
        console.log("Product clicked:", id);
        router.push(`/home/${id}`);
    }
    return (
        <div style={{ display: 'flex', overflowX: 'auto', padding: '10px', backgroundColor: 'white' }}>
            {Array.isArray(suggestion) && suggestion.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '22px',
                    minWidth: '300px',
                    gap: '10px',
                    flexShrink: 0,
                    // border: '2px solid black',
                    padding: '10px',
                    margin: '10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9'
                }}
                    onClick={() => handleProductClick(item.id)}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            padding: '11px'
                        }}
                    />
                    <h3 style={{
                        fontSize: '20px',
                        margin: '10px 0',
                        color: '#333',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}>
                        {item.title.split(' ').slice(0, 3).join(' ')}
                    </h3>
                    <p style={{
                        fontSize: '18px',
                        color: '#666',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Price: ${item.price}</p>
                    <p style={{ color: 'black' }}>{item.rating__rate}</p>
                    <StarRating rating={item.rating__rate} /> {/* Adjust this line as needed */}

                </div>

            ))}
        </div>
    );
};

export default Suggestion;
