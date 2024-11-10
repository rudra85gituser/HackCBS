import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function VendorForm() {
  const [formData, setFormData] = useState({
    shopName: '',
    vendorName: '',
    vendorPhone: '',
    vendorEmail: '',
    vendorAddress: '',
    tradingDescription: '',
    shopImage: null,
  });
  const [openDialog, setOpenDialog] = useState(false);  // State to control dialog visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching vendor data from an API or local storage
    const fetchVendorData = async () => {
      const vendorData = await getVendorData(); // Replace with actual API call

      if (vendorData) {
        setFormData({
          shopName: vendorData.shopName || '',
          vendorName: vendorData.vendorName || '',
          vendorPhone: vendorData.vendorPhone || '',
          vendorEmail: vendorData.vendorEmail || '',
          vendorAddress: vendorData.vendorAddress || '',
          tradingDescription: vendorData.tradingDescription || '',
          shopImage: vendorData.shopImage || null,
        });
      }
    };

    fetchVendorData();
  }, []);

  const getVendorData = async () => {
    // Replace this with your actual API or data source logic
    return {
      shopName: 'Example Shop',
      vendorName: 'Jane Doe',
      vendorPhone: '9876543210',
      vendorEmail: 'jane.doe@example.com',
      vendorAddress: '456 Market St, Springfield',
      tradingDescription: 'Example description of trading activity',
      shopImage: null,
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
    setFormData((prevData) => ({
      ...prevData,
      shopImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setOpenDialog(true);  // Open the confirmation dialog after form submission
  };

  const handleDialogClose = (action) => {
    setOpenDialog(false);

    if (action === 'viewShops') {
      navigate('/part1/VendorList');  // Redirect to shop list page
    } else if (action === 'goHome') {
      navigate('/home');  // Redirect to home page
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 12 }}>
      <Card>
        <CardContent>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              Register Your Shop
            </Typography>

            <TextField
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Vendor Name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Phone Number"
              name="vendorPhone"
              type="tel"
              value={formData.vendorPhone}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email"
              name="vendorEmail"
              type="email"
              value={formData.vendorEmail}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Address"
              name="vendorAddress"
              value={formData.vendorAddress}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
            />

            <TextField
              label="Description"
              name="tradingDescription"
              value={formData.tradingDescription}
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
              Upload Shop Image
              <input
                type="file"
                accept="image/*"
                hidden
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
              Register Shop
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your shop has been registered successfully. What would you like to do next?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose('goHome')} color="secondary">
            Go to Home
          </Button>
          <Button onClick={() => handleDialogClose('viewShops')} color="primary">
            View Shop List
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default VendorForm;
