import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // for navigation

function SellerOLXForm() {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerAddress: '',
    productDescription: '',
    productImages: [],
  });

  const [openPopup, setOpenPopup] = useState(false);  // State to control the modal visibility
  const navigate = useNavigate();  // Navigation hook

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUserData = async () => {
      const userData = await getUserData(); // Replace with actual API call or data source

      if (userData) {
        setFormData({
          sellerName: userData.sellerName || '',
          sellerPhone: userData.sellerPhone || '',
          sellerEmail: userData.sellerEmail || '',
          sellerAddress: userData.sellerAddress || '',
          productDescription: userData.productDescription || '',
          productImages: userData.productImages || [],
        });
      }
    };

    fetchUserData();
  }, []);

  const getUserData = async () => {
    // Replace this with your actual API call or data source
    return {
      sellerName: 'John Doe',
      sellerPhone: '1234567890',
      sellerEmail: 'john.doe@example.com',
      sellerAddress: '123 Main St, Springfield',
      productDescription: 'Sample product description',
      productImages: [],
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
      productImages: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setOpenPopup(true);  // Show the modal after form submission
  };

  const handleClosePopup = () => {
    setOpenPopup(false);  // Close the modal
  };

  const handleViewProduct = () => {
    // Logic to view the product (Redirect to the product detail page or modal)
    console.log('View product logic');
    handleClosePopup();
    navigate('/part2/ProductList');  // Redirect to the product list page
  };

  const handleGoHome = () => {
    // Logic to go to the home page
    handleClosePopup();
    navigate('/home');  // Redirect to home
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
              Sell Your Reusable Items
            </Typography>

            <TextField
              label="Name of Seller"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Phone Number"
              name="sellerPhone"
              type="tel"
              value={formData.sellerPhone}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email"
              name="sellerEmail"
              type="email"
              value={formData.sellerEmail}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Address"
              name="sellerAddress"
              value={formData.sellerAddress}
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
            >
              Continue to Sell
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Popup Modal */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Your product has been successfully added.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Would you like to view your product or go to the product list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoHome} color="secondary">
            Go to Home
          </Button>
          <Button onClick={handleViewProduct} color="primary">
            View Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SellerOLXForm;
