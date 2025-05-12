import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false, choroplethColor = 'green' }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  // Define color scales based on choroplethColor, using theme colors where possible
  const colorScales = {
    green: [
      theme.palette.secondary[400], // #3a6d3a (darker sage)
      theme.palette.secondary[300], // #518d4b
      theme.palette.secondary[200], // #8bb387
      theme.palette.secondary[100], // #c5d9c3 (lightest sage)
    ],
    blue: [
      '#1976D2', // Dark blue
      '#42A5F5',
      '#64B5F6',
      '#90CAF9', // Light blue
    ],
    red: [
      '#B71C1C', // Dark red
      '#D32F2F',
      '#F44336',
      '#EF9A9A', // Light red
    ],
  };

  const colors = colorScales[choroplethColor] || colorScales['green'];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i % colors.length], // Cycle through the colors
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[400],
                fontSize: 25,
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[500],
                itemsSpacing: 20,
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[100],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[100],
              fontSize: 25,
            },
          },
          tooltip: {
            container: {
              color: theme.palette.mode === "light" ? "#000" : theme.palette.primary.main,
              fontSize: 25,
            },
          },
          labels: {
            text: {
              fontSize: 25, // Increase font size for arc link labels
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 10]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 85,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[900],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;