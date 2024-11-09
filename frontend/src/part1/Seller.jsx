import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Container } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate , useRoutes} from 'react-router-dom';

function SellerForm() {

  const navigate = useNavigate();
   

      const handleModelData = () => {
        navigate('/part1/ModelData');
      };


  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    productDescription: '',
    itemImages: [],
  });

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUserData = async () => {
      const userData = await getUserData(); // Replace with actual API call or data source

      if (userData) {
        setFormData({
          userName: userData.userName || '',
          userEmail: userData.userEmail || '',
          userPhone: userData.userPhone || '',
          userAddress: userData.userAddress || '',
          productDescription: userData.productDescription || '',
          itemImages: userData.itemImages || [],
        });
      }
    };

    fetchUserData();
  }, []);

  const getUserData = async () => {
    // Replace this with your actual API call or local storage logic
    return {
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      userPhone: '1234567890',
      userAddress: '123 Main St, Springfield',
      productDescription: 'Sample product description',
      itemImages: [],
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      itemImages: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 12 }}>
      <Card>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              Sell Your Recyclable Items
            </Typography>

            <TextField
              label="Username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email"
              name="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Phone Number"
              name="userPhone"
              type="tel"
              value={formData.userPhone}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Address"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
            />

            <TextField
              label="Product Description"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />

            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{ mt: 2 }}
            >
              Upload Product Images
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleImageChange}
              />
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleModelData}>
              Continue to Sell
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SellerForm;
