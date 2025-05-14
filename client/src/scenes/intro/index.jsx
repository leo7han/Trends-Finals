import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, useTheme, keyframes, fadeIn, fadeOut } from '@mui/material';
import { tokens } from 'theme.js'; // Make sure this imports your theme

const Intro = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);  

  // Sections data
  const sections = [
    {
      title: "Welcome To SYLPHONEX",
      content: "Your comprehensive dashboard solution for modern business analytics and management.",
      bgColor: colors.primary[500]
    },
    {
      title: "Why Choose SYLPHONEX?",
      content: "SYLPHONEX provides real-time data visualization, intuitive controls, and powerful analytics tools to help you make informed decisions faster.",
      bgColor: colors.secondary[500]
    },
    {
      title: "About the Creators",
      content: "Developed by a team of passionate engineers and designers committed to creating elegant solutions for complex data challenges.",
      bgColor: colors.accent[500]
    },
    {
      title: "What are you waiting for?",
      content: "Join thousands of professionals who trust SYLPHONEX for their daily operations.",
      bgColor: colors.primary[800]
    }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sectionHeight = window.innerHeight;
      const newSection = Math.floor(window.scrollY / sectionHeight);
      setActiveSection(newSection > sections.length - 1 ? sections.length - 1 : newSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  // Animation for text transitions
  const fadeInOut = keyframes`
    0% { opacity: 0; transform: translateY(20px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  `;

  return (
    <Box sx={{
      overflowX: 'hidden',
      scrollBehavior: 'smooth'
    }}>
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
            padding: '0 20px',
            backgroundColor: section.bgColor,
            color: colors.grey[0],
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.5s ease'
          }}
        >
          {/* Animated background elements */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${section.bgColor} 0%, ${colors.primary[700]} 100%)`,
            opacity: 0.7,
            zIndex: 0
          }} />

          {/* Content with scroll-triggered animation */}
          <Box sx={{
            zIndex: 1,
            animation: `${fadeInOut} 3s ease-in-out infinite`,
            animationPlayState: index === activeSection ? 'running' : 'paused',
            opacity: index === activeSection ? 1 : 0,
            transform: index === activeSection ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease'
          }}>
            <Typography variant="h1" sx={{
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
            }}>
              {section.title}
            </Typography>
            
            <Typography variant="h4" sx={{
              maxWidth: '800px',
              mb: 6,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }
            }}>
              {section.content}
            </Typography>

            {/* Show buttons only on last section */}
            {index === sections.length - 1 && (
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    backgroundColor: colors.grey[0],
                    color: colors.primary[500],
                    '&:hover': {
                      backgroundColor: colors.grey[100],
                    },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    borderColor: colors.grey[0],
                    color: colors.grey[0],
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: colors.grey[100],
                    },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>

          {/* Scroll indicator (except on last section) */}
          {index < sections.length - 1 && (
            <Box sx={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              animation: `${fadeInOut} 2s ease-in-out infinite`,
              textAlign: 'center'
            }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Scroll down
              </Typography>
              <Box sx={{
                width: '24px',
                height: '40px',
                border: `2px solid ${colors.grey[0]}`,
                borderRadius: '12px',
                position: 'relative',
                margin: '0 auto'
              }}>
                <Box sx={{
                  width: '4px',
                  height: '8px',
                  backgroundColor: colors.grey[0],
                  borderRadius: '2px',
                  position: 'absolute',
                  top: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: `${fadeInOut} 2s ease-in-out infinite`
                }} />
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Intro;