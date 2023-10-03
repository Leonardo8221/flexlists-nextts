import React from 'react';
import { Box, Typography, Button } from "@mui/material";

interface ComingSoonProps {
    title: string;
    description: string;
    buttonLink: string;
}

export default function ComingSoon({ title, description, buttonLink }: ComingSoonProps) {
    return (
        <Box sx={{ position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,.1)", display: "grid", placeContent: "center", backdropFilter: "blur(10px)", zIndex: 999, textAlign: "center" }}> <Box sx={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 800 }}>
            <Typography variant='h2'>{title}</Typography><Typography variant='body1'>{description}</Typography><Button variant='contained' size='large' href={buttonLink} target='_blank'>More info</Button></Box>
        </Box>
    )
}
