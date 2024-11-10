import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Card, CardContent, Container } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import usePreviewImg from "../hooks/usePreviewImg";
import ModelData from "./ModelData";

function SellerForm() {
  const navigate = useNavigate();
  const { imgUrls, handleImageChange, setImgUrls } = usePreviewImg();

  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userAddress: '',
    productName: '',
    productPrice: '',
    productDescription: '',
    itemImages: [], // Store image URLs here
  });
  const [modelData,setmodelData]=useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();

      if (userData) {
        setFormData({
          userName: userData.userName || '',
          userPhone: userData.userPhone || '',
          userAddress: userData.userAddress || '',
          productName: userData.productName || '',
          productDescription: userData.productDescription || '',
          itemImages: userData.itemImages || [],
        });
      }
    };

    fetchUserData();
  }, []);

  const getUserData = async () => {
    return {
      userName: 'John Doe',
      userPhone: '1234567890',
      userAddress: '123 Main St, Springfield',
      productName: 'iron 35kg',
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

  // Update formData with image URLs when imgUrls changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      itemImages: imgUrls, // Store the image preview URLs
    }));
  }, [imgUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const res = await fetch("/api/user/seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data  = await res.json();
      console.log(data.suggestions);
      setmodelData(data.suggestions)
    } catch (error) {
      console.log(error);
    }
  };

  const handleModelData = () => {
    navigate("/part1/ModelData");
  };

  return (
    <>
     {modelData.length>0 && <ModelData modelData={modelData} />}
     <Container maxWidth="sm" sx={{ marginTop: 18 }}>
      <Card>

        <CardContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              Sell Your Recyclable Items
            </Typography>

            <TextField
              label="Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Phone"
              name="userPhone"
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
              label="Product Price"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              fullWidth
              required
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
                onChange={(e) => {
                  handleImageChange(e);
                }}
              />
            </Button>

            {/* Image Previews */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {imgUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Continue to Sell
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
    </>

  );
}

export default SellerForm;
