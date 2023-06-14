import { useState, useEffect } from "react";
import { Box, TextField, Modal, Typography, Grid, Button } from "@mui/material";
import AddViewCard from "src/components/add-view/AddViewCard";
import WysiwygEditor from "src/components/wysiwyg-editor/wysiwyg";
import { View } from "src/models/SharedModels";
import { connect } from "react-redux";
import { ViewType } from "src/enums/SharedEnums";


const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "80vh",
    backgroundColor: "white",
    border: "none",
    boxShadow: 24,
    overflow: "scroll"
  };
  
  const AddViewCards = [
    {
      type: ViewType.List,
      icon: "/assets/icons/tour/ic_tick.svg",
      title: "List View",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      type: ViewType.Calendar,
      icon: "/assets/icons/CalendarSVG.svg",
      title: "Calendar View",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    // {
    //   type: ViewType.,
    //   icon: "/assets/icons/tour/ic_project_m.svg",
    //   title: "Chart View",
    //   description: "Lorem ipsum dolor sit amet consectetur.",
    // },
    {
      type: ViewType.Gallery,
      icon: "/assets/icons/tour/ic_bug.svg",
      title: "Gallery View",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    // {
    //   icon: "/assets/icons/tour/ic_bug.svg",
    //   title: "Timeline View",
    //   description: "Lorem ipsum dolor sit amet consectetur.",
    // },
    {
      type: ViewType.Kanban,
      icon: "/assets/icons/tour/ic_bug.svg",
      title: "Kanban View",
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

type ListViewFormProps = {
  currentView:View;
  open: boolean;
  handleClose: () => void;
};

const ListViewForm = ({open,handleClose,currentView }: ListViewFormProps) => {
  const [steps, setSteps] = useState(0);
  const [viewType,setViewType] = useState<ViewType>(ViewType.List)
  const [viewName,setViewName] = useState<string>('')
  const [viewDescription,setViewDescription] = useState<string>('')
  const goPrevious = () => {
    setSteps(steps - 1);
  };

  const goNext = () => {
    setSteps(steps + 1);
  };
  const handleSubmit = () =>
  {
    closeModal();
  }
  const closeModal = () =>{
    setSteps(0);
    handleClose();
  }
  return (
    <Modal
    open={open}
    onClose={closeModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={{overflow: "scroll"}}
  >
    <Box sx={style}>
      <Box sx={{py: 2, px: 4, position: "sticky", top: "0", zIndex: "10", backgroundColor:"#fff", boxShadow: "0 2px 24px 0 rgba(0,0,0,0.05)", width: "100%"}}>
        <Typography variant="h5">{steps === 0 ? "Choose View" : steps === 1 ? "View details" : "View Created" }</Typography>
      </Box>
      
      {steps === 0 &&
      <Grid container spacing={3} sx={{p:4}}>
        {AddViewCards.map((card: any) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={card.icon} >
              <AddViewCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              ></AddViewCard>
            </Grid>
          );
        })}
      </Grid>
      }

    {steps === 1 &&
      <Box sx={{p:4}}>
        <Box sx={{mb:4}}>
          <Typography variant="subtitle2" gutterBottom>View Name</Typography>
          <TextField fullWidth id="fullWidth" /> 
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>View Description</Typography>
          <WysiwygEditor />
        </Box>
      </Box>
      }

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", px: 4,py:2 , background: "#fff", position: "sticky", width: "100%", bottom: "0" }}>
        <Box>
          {steps === 0 ?
            <Button variant="outlined" size="small" sx={{display: "none"}} >Skip</Button> :
            <Button variant="contained" size="small" onClick={goPrevious}>Previous</Button>
          }
        </Box>
        <Box>
          {steps === 1 ?
            <Button variant="outlined" size="small" onClick={handleSubmit} >Finish</Button> :
            <Button variant="contained" size="small" onClick={goNext}>Next</Button>
          }
        </Box>
      </Box>
    </Box>
  </Modal>
  );
};
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(ListViewForm);
