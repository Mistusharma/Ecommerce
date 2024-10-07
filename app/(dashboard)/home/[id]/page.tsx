'use client';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const HomeDetail: FC = () => {
    const { id } = useParams();
    console.log("id: ", id);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/home/${id}?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                console.log("data: ", data);
                setProduct(data.product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: '2px solid #ddd', // Border for the container
            borderRadius: '12px',
            padding: '50px',
            margin: '50px',
            backgroundColor: 'white', // Background color
            maxWidth: '600px', // Max width for responsiveness
            textAlign: 'center', // Center text alignment
        }}>
            <img
                src={product.images}
                alt={product.title}
                style={{
                    maxWidth: '100%', // Make image responsive
                    height: 'auto', // Maintain aspect ratio
                    borderRadius: '8px', // Rounded corners for the image
                    marginBottom: '25px', // Space below the image
                }}
            />
            <h1 style={{ fontSize: '24px', margin: '10px 0', color: '#333' }}>{product.title}</h1>
            <p style={{ fontSize: '20px', margin: '5px 0', color: '#666' }}>Price: ${product.price}</p>
            <p style={{ color: 'gray' }}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>
    );
};

export default HomeDetail;
