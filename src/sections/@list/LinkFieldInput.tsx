import React from "react";
import { Box, TextField, Link, Typography } from "@mui/material";
import { ViewField } from "src/models/ViewField";
type LinkModel = {
    name:string,
    link:string
}
interface LinkFieldInputProps {
  isSubmit?: boolean;
  column: ViewField;
  mode: "view" | "create" | "update"|"comment";
  selectedLink: LinkModel;
  onLinkChange: (link: LinkModel) => void;
}

export default function LinkFieldInput ({
  isSubmit,
  column,
  mode,
  selectedLink,
  onLinkChange,
}:LinkFieldInputProps)
{
   return(<div className="focusedNeed" tabIndex={8}>
            <Box
            key={column.id}
            className="markdownBox"
            sx={{
                border: "1px solid rgba(158, 158, 158, 0.32)",
                p: 2,
                position: "relative",
                borderRadius: "6px",
                ".focusedNeed:focus &": {
                },
                "&:hover": {
                },
            }}
            >
            <Typography
                variant="body2"
                component={"label"}
                sx={{
                textTransform: "capitalize",
                fontSize: 12,
                position: "absolute",
                top: "-10px",
                left: "10px",
                background: "#fff",
                zIndex: 2,
                px: 0.5,
                color: "rgba(0, 0, 0, 0.6)",
                }}
            >
                {column.name}
            </Typography>
            {
                mode !== "view" ?
                ( <>
                    <TextField
                    key={`${column.id}-link`}
                    style={{ width: "100%",marginBottom:"15px" }}
                    label='Link'
                    InputLabelProps={{ shrink: true }}
                    name={`${column.id}-link`}
                    size="small"
                    type={"text"}
                    onChange={(e) => {
                        let newLink = Object.assign({},selectedLink);
                        newLink.link = e.target.value;
                        onLinkChange(newLink);
                    }}
                    value={selectedLink.link}
                    rows={4}
                    required={column.required}
                    error={isSubmit && column.required && !selectedLink.link}
                    />
                    <TextField
                    key={`${column.id}-name`}
                    style={{ width: "100%" }}
                    label='Name(Optional)'
                    InputLabelProps={{ shrink: true }}
                    name={`${column.id}-name`}
                    size="small"
                    type={"text"}
                    onChange={(e) => {
                        let newLink = Object.assign({},selectedLink);
                        newLink.name = e.target.value;
                        onLinkChange(newLink);
                    }}
                    value={selectedLink.name}
                    />
                </>)
                :
                (
                <>
                <Box
                    className="markdownWrapper"
                    sx={{
                    ".focusedNeed:focus &": {
                        margin: "-1px",
                    },
                    }}
                >
                    {selectedLink ? (
                    <Link rel="noopener noreferrer" href={selectedLink.link} target="_blank">
                        {selectedLink.name?selectedLink.name:selectedLink.link}
                    </Link>
                    ) : (
                    <></>
                    )}
                </Box>
                </>
                )
            
            }
            
            </Box>
    </div>
   )
};

