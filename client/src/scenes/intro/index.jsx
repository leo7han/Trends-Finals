import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, useTheme, List, ListItem, ListItemIcon, Avatar } from '@mui/material';
import { Email, Lock, Analytics, People, Dashboard } from '@mui/icons-material';
import samImage from '../../assets/sam.jpg';
import clarkImage from '../../assets/clarkProfile.jpg';
import dashboardImage from '../../assets/dashboard.jpg';

const Intro = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [hoverItem, setHoverItem] = useState(null);

  // Sections data
  const sections = [
    {
      title: "Welcome To SYLPHONEX",
      subtitle: "Your comprehensive dashboard solution",
      bgColor: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      features: []
    },
    {
      title: "Why Choose SYLPHONEX?",
      subtitle: "Powerful tools for your business needs",
      bgColor: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
      features: [
        { icon: <Dashboard sx={{ fontSize: 40 }} />, text: "Real-time data visualization" },
        { icon: <Analytics sx={{ fontSize: 40 }} />, text: "Advanced analytics tools" },
        { icon: <People sx={{ fontSize: 40 }} />, text: "User-friendly interface" }
      ]
    },
    {
      title: "The Creators of SYLPHONEX",
      subtitle: "The minds behind SYLPHONEX",
      bgColor: `linear-gradient(135deg, ${theme.palette.accent.main} 0%, ${theme.palette.accent.dark} 100%)`,
      creators: [
        { 
          image: <Avatar src={samImage}sx={{ width: 360, height: 360, bgcolor: theme.palette.primary.light }}>JD</Avatar>,
          name: "Samuel F. Belen",
          role: "Lead Developer"
        },
        { 
          image: <Avatar src= {clarkImage} sx={{ width: 360, height: 360, bgcolor: theme.palette.secondary.light }}>AS</Avatar>,
          name: "Clark L. Floriano",
          role: "Backend Developer"
        }
      ]
    },
    {
      title: "What are you waiting for?",
      subtitle: "Join our growing community!",
      bgColor: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary[900]} 100%)`,
      image: <img 
        src={dashboardImage} 
        alt="Dashboard" 
        style={{ width: 4000, height: 500, borderRadius: '16px', objectFit: 'cover' }} 
      />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionHeight = window.innerHeight;
      const newSection = Math.floor(window.scrollY / sectionHeight);
      setActiveSection(Math.min(newSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 3,
            background: section.bgColor,
            color: theme.palette.text.primary,
            position: 'relative',
            transition: 'all 0.5s ease',
            opacity: index === activeSection ? 1 : 0.3
          }}
        >
          {/* Main Content Container */}
          <Box sx={{
            maxWidth: '900px',
            transition: 'all 0.5s ease',
            transform: index === activeSection ? 'translateY(0)' : 'translateY(20px)',
            opacity: index === activeSection ? 1 : 0
          }}>
            {/* Section 1: Welcome */}
            {index === 0 && (
              <Box>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 2,
                    fontSize: { xs: '9rem', sm: '8rem', md: '6rem' },
                    fontFamily: '"Montserrat", sans-serif',
                    background: `linear-gradient(to right, ${theme.palette.text.primary}, ${theme.palette.primary.light})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.3s ease'
                    }
                  }}
                >
                  {section.title}
                </Typography>
                <Typography 
                variant="h2"
                sx={{ mb: 4 }}
                fontWeight={800}
                >
                  {section.subtitle}
                </Typography>
              </Box>
            )}

            {/* Section 2: Features */}
              {index === 1 && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                  variant="h2" 
                  sx={{ mb: 4 }}
                  fontSize="60px"
                  fontWeight={800}
                  >
                    {section.title}
                  </Typography>
                  <List sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                  }}>
                    {section.features.map((feature, i) => (
                      <ListItem 
                        key={i}
                        sx={{ 
                          mb: 3,
                          transition: 'all 0.3s ease',
                          transform: hoverItem === i ? 'scale(1.05)' : 'none',
                          bgcolor: hoverItem === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                          borderRadius: '8px',
                          p: 2,
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '80%',
                          maxWidth: '600px'
                        }}
                        onMouseEnter={() => setHoverItem(i)}
                        onMouseLeave={() => setHoverItem(null)}
                      >
                        <ListItemIcon sx={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          mb: 1 
                        }}>
                          <Box sx={{ 
                            p: 2,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            transition: 'all 0.3s ease',
                            transform: hoverItem === i ? 'rotate(15deg) scale(1.1)' : 'none'
                          }}>
                            {feature.icon}
                          </Box>
                        </ListItemIcon>
                        <Typography 
                        variant="h2" 
                        sx={{ textAlign: 'center' }}
                        fontWeight={400}
                        fontSize="25px"
                        >
                          {feature.text}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

            {/* Section 3: Creators */}
            {index === 2 && (
              <Box>
                <Typography 
                variant="h2" 
                sx={{ mb: 6 }}
                fontSize="55px"
                fontWeight={800}
                >
                  {section.title}
                </Typography>
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 8,
                  flexWrap: 'wrap'
                }}>
                  {section.creators.map((creator, i) => (
                    <Box 
                      key={i}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)'
                        }
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 2
                      }}>
                        {creator.image}
                      </Box>
                      <Typography 
                      variant="h4"
                      fontSize="30px"
                      fontWeight={800}
                      >{creator.name}
                      </Typography>

                      <Typography 
                      variant="h4" 
                      sx={{ color: theme.palette.text.secondary }}
                      fontSize="20px"
                      >
                        {creator.role}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Section 4: CTA */}
          {index === 3 && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 6
            }}>
              <Box sx={{ 
                flex: 1,
                textAlign: { xs: 'center' },
                color: theme.palette.primary.light
              }}>
                <Typography 
                  variant="h2" 
                  sx={{ mb: 3 }}
                  fontWeight={800}
                  fontSize="45px"
                >
                  {section.title}
                </Typography>
                <Typography 
                  variant="h4"
                  sx={{ mb: 4 }}
                  fontWeight={600}
                  fontSize="25px"
                >
                  {section.subtitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'center'} }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.primary.light,
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: theme.palette.background.default,
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/signup')}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.primary.light,
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: theme.palette.background.default,
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
                  }
                }
              }}>
                {section.image}
              </Box>
            </Box>
          )}
          </Box>

          {/* Scroll indicator */}
          {index < sections.length - 1 && (
            <Typography 
              variant="body1" 
              sx={{ 
                position: 'absolute',
                bottom: '40px',
                animation: 'bounce 2s infinite',
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.light
                }
              }}
              onClick={() => window.scrollTo({
                top: (index + 1) * window.innerHeight,
                behavior: 'smooth'
              })}
            >
              Scroll down ▼
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Intro;