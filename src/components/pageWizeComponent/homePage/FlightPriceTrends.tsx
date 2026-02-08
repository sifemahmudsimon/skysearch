import React, {useMemo} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {Box, Typography} from "@mui/material";
import {FlightPriceTrendsProps} from "../../../types/flightTypes";

const FlightPriceTrends: React.FC<FlightPriceTrendsProps> = ({finalResult}) => {

    // Prepare chart data
    const chartData = useMemo(() => {
        if (!finalResult || finalResult.length === 0) return [];

        return finalResult.map((offer) => {
            const departure = offer.itineraries[0]?.segments[0]?.departure.at;
            const price = parseFloat(offer.price.total);
            return {departure, price};
        });
    }, [finalResult]);

    // Calculate min, max, avg
    const minPrice = useMemo(
        () => (chartData.length ? Math.min(...chartData.map((d) => d.price)) : 0),
        [chartData]
    );
    const maxPrice = useMemo(
        () => (chartData.length ? Math.max(...chartData.map((d) => d.price)) : 0),
        [chartData]
    );
    const avgPrice = useMemo(
        () =>
            chartData.length
                ? chartData.reduce((acc, d) => acc + d.price, 0) / chartData.length
                : 0,
        [chartData]
    );

    // Enrich data for min/avg/max lines
    const enrichedData = chartData.map((d) => ({
        ...d,
        min: minPrice,
        max: maxPrice,
        avg: avgPrice,
        formattedDeparture: d.departure
            ? new Date(d.departure).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
            : "",
    }));

    // return empty if no data
    const dataToRender = enrichedData.length ? enrichedData : [{
        formattedDeparture: '',
        price: 0,
        min: 0,
        avg: 0,
        max: 0
    }];

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "96rem",
                mt: 4,
                mx: "auto",
            }}
        >
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    fontSize: {xs: "1.5rem", lg: "2.5rem", xl: "3rem"},
                    fontWeight: "bold",
                    fontFamily: "'Roboto', sans-serif",
                    color: "text.primary",
                    my: 4,
                    textAlign: "center",
                    lineHeight: 1.2,
                }}
            >
                Flight Price Trends.
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={dataToRender} margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                    <XAxis
                        dataKey="formattedDeparture"
                        label={{value: "Departure", position: "insideBottom", offset: -5}}
                    />
                    <YAxis label={{value: "Price (USD)", angle: -90, position: "insideLeft"}}/>
                    <Tooltip/>
                    <Legend verticalAlign="top" height={36}/>
                    <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" dot={{r: 5}}/>
                    <Line type="monotone" dataKey="min" stroke="#82ca9d" strokeDasharray="5 5" name="Min"/>
                    <Line type="monotone" dataKey="avg" stroke="#ffc658" strokeDasharray="5 5" name="Avg"/>
                    <Line type="monotone" dataKey="max" stroke="#ff4d4f" strokeDasharray="5 5" name="Max"/>
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default FlightPriceTrends;
