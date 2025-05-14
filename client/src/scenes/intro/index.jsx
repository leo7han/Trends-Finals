import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, useTheme } from '@mui/material';

const Intro = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  // Sections data
  const sections = [
    {
      title: "Welcome To SYLPHONEX",
      content: "Your comprehensive dashboard solution for modern business analytics and management.",
      bgColor: theme.palette.primary.main
    },
    {
      title: "Why Choose SYLPHONEX?",
      content: "SYLPHONEX provides real-time data visualization, intuitive controls, and powerful analytics tools.",
      bgColor: theme.palette.secondary.main
    },
    {
      title: "About the Creators",
      content: "Developed by a team of passionate engineers and designers committed to creating elegant solutions.",
      bgColor: theme.palette.accent.main
    },
    {
      title: "What are you waiting for?",
      content: "Join thousands of professionals who trust SYLPHONEX for their daily operations.",
      bgColor: theme.palette.primary.dark
    }
  ];

  // Handle scroll events
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
            backgroundColor: section.bgColor,
            color: theme.palette.text.primary,
            position: 'relative',
            transition: 'opacity 0.5s ease',
            opacity: index === activeSection ? 1 : 0.3
          }}
        >
          <Box sx={{
            maxWidth: '800px',
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: index === activeSection ? 'translateY(0)' : 'translateY(20px)',
            opacity: index === activeSection ? 1 : 0
          }}>
            <Typography variant="h1" sx={{ 
              fontWeight: 700, 
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
            }}>
              {section.title}
            </Typography>
            
            <Typography variant="h4" sx={{ 
              mb: 6,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }
            }}>
              {section.content}
            </Typography>

            {index === sections.length - 1 && (
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    borderColor: theme.palette.background.default,
                    color: theme.palette.background.default,
                    px: 4,
                    py: 1.5
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>

          {index < sections.length - 1 && (
            <Typography 
              variant="body1" 
              sx={{ 
                position: 'absolute',
                bottom: '40px',
                animation: 'bounce 2s infinite'
              }}
            >
              Scroll down
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Intro;