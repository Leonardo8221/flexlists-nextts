import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles"

interface ComingSoonProps {
    title: string;
    description: string;
    link: string;
}

export default function ComingSoon({ title, description, link }: ComingSoonProps) {
    const theme = useTheme();
    return (
        <Box sx={{ position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,.1)", display: "grid", placeContent: "center", backdropFilter: "blur(10px)", transform: "translate3d(0,0,0)", zIndex: 999, textAlign: "center" }}> <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 4, minWidth: 200, maxWidth: 800 }}>
            <Typography sx={{ color: theme.palette.palette_style.text.primary }} variant='h2'>{title}</Typography><Typography sx={{ color: theme.palette.palette_style.text.primary }} variant='body1'>{description}</Typography><Button variant='contained' size='large' href={link} target='_blank'>More info</Button></Box>
        </Box>
    )
}
