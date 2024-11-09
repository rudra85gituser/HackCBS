import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Container,TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ModelData = () => {
  const navigate = useNavigate();

  // Example processed data (replace this with actual AI-generated data)
  const [modelData, setModelData] = useState([
    {
      id: 1,
      image: '/path-to-processed-image1.jpg',  // Replace with actual image path
      estimatedPrice: '$120',
      description: 'A vintage bicycle in good condition.',
    },
    {
      id: 2,
      image: '/path-to-processed-image2.jpg',
      estimatedPrice: '$40',
      description: 'An antique lamp with minor scratches.',
    },
    // Add more items as needed
  ]);

  const handleProductList = () => {
    navigate('/part1/ProductLists');  // Replace with your product list route
  };

  const handleGoBack = () => {
    navigate('/part1/seller');  // Replace with your seller form route
  };
  
  return (
    <Container maxWidth="md" sx={{ marginTop: 15, }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Review of Processed Images
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <TextField
          label="Search reviews"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: '100%', mr: 2 }}
          style={{background:"white"}}
        />
        
      </Box>
      {/* Render each product in a vertically aligned card with image on the right */}
      {modelData.map((data) => (
        <Card key={data.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 4, padding: 2,gap:'150px' }}>
        <CardMedia
          component="img"
          sx={{ width: 250, height: 200, marginRight: 2,marginLeft:1 }}
          image={data.image}
          alt="Processed product image"
        />
        <CardContent sx={{ flex: 1 }}
        style={{marginRight:'0px'}}>
          <Typography variant="h6" gutterBottom>
            Estimated Price: {data.estimatedPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </Card>
      
      ))}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 4 }}> 
        <Button variant="outlined" color="secondary" onClick={handleGoBack}>
          Re-upload Images
        </Button>
        <Button variant="contained" color="primary" onClick={handleProductList}>
          Continue to Sell
        </Button>
      </Box>
    </Container>
  );
};

export default ModelData;
