import { styled } from '@mui/material/styles';
import { Card, Typography, CardHeader, CardContent, Box } from '@mui/material';

const CardIconStyle = styled('img')(({ theme }) => ({
    width: 128,
    height: 128,
    margin: 'auto',
}));

type AddViewCard = {
    icon: string,
    title?: string,
    description?: string,
};

export default function AddViewCard({ icon, title, description, ...other }: AddViewCard) {
    return (
        <Card {...other} sx={{margin: 'auto', boxShadow: "none", overflow: "visible"}}>
            <Box sx={{borderRadius:"8px", border: "solid 1px #ccc", py: 4, "&:hover":{ borderColor: "primary.main", boxShadow: "0 0 24px 0 rgba(0,0,0,.1)" }}} >
                <CardIconStyle
                    src={icon}
                    alt={title}
                />
            </Box>
            <CardHeader title={title}/>

            <CardContent >
                <Typography variant="caption" sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
                }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
