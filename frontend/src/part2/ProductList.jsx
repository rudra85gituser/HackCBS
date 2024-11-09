import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState('buyer'); // Default user role is "buyer"

  useEffect(() => {
    // Fetch initial product data (Replace with an actual API call)
    const fetchProducts = async () => {
      const productData = [
        {
          id: 1,
          name: 'Product 1',
          image: '/path-to-image.jpg', // Replace with actual image path
          description: 'Sample product description 1',
          details: 'Additional details about product 1',
        },
        {
          id: 2,
          name: 'Product 2',
          image: '/path-to-image2.jpg',
          description: 'Sample product description 2',
          details: 'Additional details about product 2',
        },
        // Add more products as needed
      ];
      setProducts(productData);
    };

    fetchProducts();
  }, []);

  // Redirect to seller page to add a new product
  const handleSell = () => {
    navigate('/part2/Seller');
  };

  // Redirect to buyer page with the selected product details
  const handleBuy = (productId) => {
    navigate('/part2/Buyer', { state: { productId } });
  };

  // Render each product card
  const renderProductCard = (product) => (
    <Card key={product.id} sx={{ display: 'flex', mb: 4 }}>
      {/* Product Image */}
      <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={product.image}
        alt={`${product.name} image`}
      /></Card>

      {/* Product Details */}
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.details}
          </Typography>
        </Box>

        {/* Buy Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => handleBuy(product.id)}>
            Buy
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (

    <Container maxWidth="md" sx={{ marginTop: 12 }}>
      {/* Sell Product Button at the top right corner */}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSell}>
          Sell Your Product
        </Button>
      </Box>

      {/* Page Title */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Product List
      </Typography>
      
      {/* Render Product Cards */}
      {products.map(renderProductCard)}
    </Container>
  );
};

export default ProductList;
