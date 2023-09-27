import React from 'react'
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import DoneIcon from '@mui/icons-material/Done';
  import CloseIcon from '@mui/icons-material/Close';
  
  interface PricingTableProps {
    styles?: any;
  }

function createData(
    name: any,
    start: any,
    advanced: any,
    premium: any,
  ) {
    return { name, start, advanced, premium };
  }

  const rows = [
    createData(
        <Typography variant='subtitle2'>Features</Typography>,
        "",
        "",
        "",
      ),
    createData(
      "Feature Name",
      <DoneIcon sx={{color:"green"}}/>,
      <DoneIcon sx={{color:"green"}}/>,
      <DoneIcon sx={{color:"green"}}/>,
    ),
    createData(
        "Feature Name",
        <CloseIcon sx={{color:"red"}}/>,
        <DoneIcon sx={{color:"green"}}/>,
        <DoneIcon sx={{color:"green"}}/>,
    ),
    createData(
      "Feature Name",
      <CloseIcon sx={{color:"red"}}/>,
      <CloseIcon sx={{color:"red"}}/>,
      <DoneIcon sx={{color:"green"}}/>,
    ),
    createData(
        "Feature Name",
        "1,000",
        "5,000",
        "10,000",
      ),
    createData(
        <Typography variant='subtitle2'>Views</Typography>,
        "",
        "",
        "",
      ),
      createData(
        "View Name",
        <DoneIcon sx={{color:"green"}}/>,
        <DoneIcon sx={{color:"green"}}/>,
        <DoneIcon sx={{color:"green"}}/>,
      ),
      createData(
          "View Name",
          <CloseIcon sx={{color:"red"}}/>,
          <DoneIcon sx={{color:"green"}}/>,
          <DoneIcon sx={{color:"green"}}/>,
      ),
      createData(
        "View Name",
        <CloseIcon sx={{color:"red"}}/>,
        <CloseIcon sx={{color:"red"}}/>,
        <DoneIcon sx={{color:"green"}}/>,
      ),
  ];

export default function PricingTable({ styles }: PricingTableProps) {
    styles = {
        tableBodyCell: {
          whiteSpace: { xs: "nowrap", md: "wrap" },
          overflow: "hidden",
          maxWidth: "256px",
          textOverflow: "ellipsis",
        },
        tableHeadCell: {
          color: "#333",
          maxWidth: "256px",
          minWidth:"256px"
        },
        tableBodyRow: {
            "&:last-child td, &:last-child th": { border: 0 },
            "&:hover": {
                backgroundColor:"#f1f1f1"
            }
        }
      };
  return (
    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 320 }} /*size='small'*/ aria-label="simple table">
              <TableHead sx={{ background: "#fafafa" }}>
                <TableRow>
                  <TableCell sx={styles?.tableHeadCell}><Typography variant='h4'>Pricing plans</Typography></TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="center">
                    <Typography variant='h5' gutterBottom>
                    Start
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                    Free
                    </Typography>
                    <Button variant='contained' sx={{mt:1}}>Sign up</Button>
                  </TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="center">
                    <Typography variant='h5' gutterBottom>
                    Advanced
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                    $6/mo
                    </Typography>
                    <Button variant='contained' sx={{mt:1}}>Buy Advanced</Button>
                  </TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="center">
                    <Typography variant='h5' gutterBottom>
                    Premium
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                    $10/mo
                    </Typography>
                    <Button variant='contained' sx={{mt:1}}>Buy Premium</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={styles?.tableBodyRow}
                  >
                    <TableCell sx={styles?.tableBodyCell}>{row.name}</TableCell>
                    <TableCell sx={styles?.tableBodyCell} align="center">
                      {row.start}
                    </TableCell>
                    <TableCell sx={styles?.tableBodyCell} align="center">
                      {row.advanced}
                    </TableCell>
                    <TableCell sx={styles?.tableBodyCell} align="center">
                      {row.premium}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  )
}
