'use client';
import Header from '@/components/header';
import Suggestion from '@/components/productSuggest';
import { log } from 'console';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const [products, setProducts] = useState<any[]>([]); // Set initial state as an empty array
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const [newProduct, setNewProduct] = useState({ title: '', price: '', images: '' }); // State for new product details
    console.log("newProduct: ", newProduct);
    const router = useRouter()
    // Fetch products data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/home', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }
                const data: any = await response.json();
                setProducts(data.products); // Assuming `data.products` is an array
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Call the async function
    }, []);

    // Function to add a new product
    const addProduct = async () => {
        if (!newProduct.title || !newProduct.price || !newProduct.images) {
            console.error('All fields are required');
            return; // Prevent adding if fields are empty
        }
        try {
            const response = await fetch('/api/home', { // Changed the endpoint to `/api/products`
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const { productSave } = await response.json(); // Assuming product is returned from backend
            console.log("addedProduct: ", productSave);
            setProducts((prevProducts) => [...prevProducts, productSave]); // Add the new product to the list
            setShowForm(false); // Close the form after successful addition
            setNewProduct({ title: '', price: '', images: '' }); // Reset form fields
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    const handleProductClick = (id: any) => {
        console.log("Product clicked:", id);
        router.push(`/home/${id}`);
    };
    return (
        <>
            <Header />
            <div style={{
                padding: '40px 20px',
                background: 'linear-gradient(135deg, #f0f0f0, #e6f7ff)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '40px',
                    maxWidth: '1400px',
                    width: '100%',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}>
                    {products.map((item, index) => (
                        <div key={index} style={{
                            border: '1px solid #ddd',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fff',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onClick={() => handleProductClick(item.id)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <img src={item.images} alt={item.title} style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '15px'
                            }} />
                            <h3 style={{
                                fontSize: '20px',
                                margin: '10px 0',
                                color: '#333',
                                fontWeight: '600'
                            }}>{item.title}</h3>
                            <p style={{
                                fontSize: '18px',
                                color: '#666',
                                fontWeight: 'bold'
                            }}>Price: ${item.price}</p>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginTop: '15px',
                                transition: 'background-color 0.3s ease',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}



                    <div style={{
                        border: '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                        onClick={() => setShowForm(true)} // Show the form when clicked
                    >
                        <div style={{
                            fontSize: '50px',
                            color: '#28a745',
                        }}>+</div>
                        <span style={{
                            fontSize: '20px',
                            color: '#333',
                            fontWeight: '600'
                        }}>Add Product</span>
                    </div>
                </div>

                {showForm && (
                    <div style={{
                        position: 'fixed',
                        color: 'black',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        padding: '20px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                        borderRadius: '8px',
                    }}>
                        <h2>Add New Product</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            addProduct(); // Call the addProduct function
                        }}>
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={newProduct.title}
                                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                                />
                            </div>
                            <div>
                                <label>Price:</label>
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                                />
                            </div>
                            <div>
                                <label>Image URL:</label>
                                <input
                                    type="text"
                                    value={newProduct.images}
                                    onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                                />
                            </div>
                            <button type="submit" style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginTop: '15px',
                            }}>
                                Add Product
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)} // Close the form without adding a product
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    marginTop: '10px',
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <Suggestion/>
            
        </>
    );
}
