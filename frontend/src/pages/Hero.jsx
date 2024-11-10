import React from "react";
import hero from "../assets/hero.png";
import Box from '@mui/material/Box';
import { Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';

function Hero() {
    return (
        <>
            {/* Hero Section */}
            <Box sx={{ padding: { xs: 2, md: 3 }, marginTop: { xs: '100px', md: '150px' }, display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 1200, boxShadow: 3 }}>
                    <Grid container>
                        {/* Left-aligned Image */}
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                image={hero}
                                alt="hero"
                            />
                        </Grid>

                        {/* Right-aligned Text Content */}
                        <Grid item xs={12} md={6}>
                            <CardContent sx={{ padding: { xs: 2, md: 3 }, textAlign: 'left' }}>
                                <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                                    Home $crapper: Turning Waste into Value
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                    Component 1: Recyclable Waste Marketplace
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                    Connect with trusted vendors for fair pricing and accurate weighing of your recyclable household waste. Home $crapper acts as a mediator, ensuring transparency and reliability, helping you earn back value on items like newspapers, plastics, and more, while promoting responsible recycling.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                    Component 2: Give a Second Life to Your Belongings.
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                    Donate or sell items like books and electronics to people who need them, fostering a sustainable community. Whether donating or selling at low cost, Home $crapper makes it easy to repurpose valuable items and reduce waste.
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </>
    );
}

export default Hero;
