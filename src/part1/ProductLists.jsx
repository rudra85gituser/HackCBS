import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductLists = () => {
  const navigate = useNavigate();
  
  // Sample data combining user and model-generated info
  const [products, setProducts] = useState([
    {
      id: 1,
      userDescription: 'A well-maintained vintage bicycle.',
      userProvidedPrice: '$100',
      modelGeneratedDescription: 'Vintage bicycle in great condition with minor scratches.',
      modelEstimatedPrice: '$120',
      image: '/path-to-image1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      userDescription: 'An antique lamp in working order.',
      userProvidedPrice: '$35',
      modelGeneratedDescription: 'Antique lamp with minor wear, fully functional.',
      modelEstimatedPrice: '$40',
      image: '/path-to-image2.jpg', // Replace with actual image path
    },
    // Add more products as needed
  ]);

  const handleBuy = (productId) => {
    navigate('/buyer', { state: { productId } });
  };

  const handleSell = () => {
    navigate('/part2/seller');
  };

  // Render each product card with details and AI model data
  const renderProductCard = (product) => (
    <Card key={product.id} sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', mb: 4, padding: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 250, height: 200, marginLeft: 2 }}
        image={product.image}
        alt="Product image"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          User Description:
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.userDescription}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Model-Generated Description:
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.modelGeneratedDescription}
        </Typography>

        <Typography variant="h6" gutterBottom>
          User-Provided Price:
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.userProvidedPrice}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Model-Estimated Price:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.modelEstimatedPrice}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => handleBuy(product.id)}>
            Buy
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSell}>
          Sell Your Product
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Product List
      </Typography>

      {products.map(renderProductCard)}
    </Container>
  );
};

export default ProductLists;
