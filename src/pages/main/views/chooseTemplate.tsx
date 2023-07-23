import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Snackbar,
  Alert,
  AlertColor,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  TextField,
} from "@mui/material";
import HomeCard from "src/sections/@tour/HomeCard";
import PlainSearchBar from "src/components/search-bar/PlainSearchBar";
import CategoriesSelect from "src/components/categories/categories";
import MainLayout from "src/layouts/view/MainLayout";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";
import { setMessage, setViewTemplate } from "src/redux/actions/viewActions";
import { useRouter } from "next/router";
import { ListCategoryLabel } from "src/enums/ShareEnumLabels";
import { getViewTemplates } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { template } from "lodash";
import ViewTemplateCard from "src/sections/@listView/ViewTemplateCard";
import { PATH_MAIN } from "src/routes/paths";

const HomeCards = [
  {
    icon: "/assets/icons/tour/add-icon.svg",
    title: "New List",
    description: "Crreate from scratch",
    button: "Create",
    link: "/main/views/newView",
  },
  {
    icon: "/assets/icons/tour/ic_tick.svg",
    title: "Todo list",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
    link: "/main/views/newView",
  },
  {
    icon: "/assets/icons/tour/ic_music.svg",
    title: "Music playlist",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
    link: "/main/views/newView",
  },
  {
    icon: "/assets/icons/tour/ic_project_m.svg",
    title: "Project",
    description:
      "Lorem ipsum dolor sit amet consectetur.eweffasfsafdasasdasfsddscyasdfasfasfasdfasdasdsadasda",
    button: "Use template",
    link: "/main/views/newView",
  },
  {
    icon: "/assets/icons/tour/ic_bug.svg",
    title: "Bug fixing",
    description: "Lorem ipsum dolor sit amet consectetur.",
    button: "Use template",
    link: "/main/views/newView",
  },
];

interface ChooseTemplateProps {
  message: any;
  setMessage: (message: any) => void;
  setViewTemplate: (viewTemplate: any) => void;
}

function ChooseTemplate({ message, setMessage ,setViewTemplate}: ChooseTemplateProps) {
  // error handling
  const router = useRouter();
  const [flash, setFlash] = useState<
    { message: string; type: string } | undefined
  >(undefined);
  const [categories,setCategories] = useState<{key:string,value:string}[]>([{key:"all",value:"All"}].concat(
    Array.from(ListCategoryLabel,function(item){
      return {key:item[0],value:item[1]}
    })
  ));
  const [currentCategory,setCurrentCategory] = useState<string>("all");
  const [searchTemplateText,setSearchTemplateText] = useState<string>("");
  const [templates,setTemplates] = useState<{id:number,name:string,icon:string,description:string}[]>([]);
  const scratchTemplate = 
  {
    id:0,
    icon: "/assets/icons/tour/add-icon.svg",
    name: "New List",
    description: "Crreate from scratch"
  }
  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message);
      }
    }
    checkMessage();
  }, [message]);
  useEffect(()=>{
    async function fetchTemplates() {
       let response = await getViewTemplates('','')
       if(isSucc(response)){
         setTemplates([scratchTemplate].concat(response.data))
       }  
    }
    if(router.isReady){
      fetchTemplates();
    }
  },[router.isReady])
  const flashHandleClose = () => {
    setFlash(undefined);
    setMessage(null);
  };
  function setError(message: string) {
    setFlashMessage(message);
  }
  function setFlashMessage(message: string, type: string = "error") {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  }
  const handleCategoryChange = async(event: SelectChangeEvent) => {
    setCurrentCategory(event.target.value as string);
    setSearchTemplateText("");
    let response = await getViewTemplates(event.target.value as string)
    if(isSucc(response)){
      setTemplates(response.data)
    }
  }
  const handleSelectViewTemplate = (template:any) => {
    setViewTemplate(template)
    router.push({pathname:`${PATH_MAIN.newView}`})
  }
  return (
    <MainLayout removeFooter={true}>
      <Container
        sx={{
          py: 3,
          maxWidth: "inherit !important",
          overflow: "hidden",
          minHeight: { xs: "100vh", md: "calc(100vh - 96px)" },
        }}
      >
        <Snackbar
          open={flash !== undefined}
          autoHideDuration={6000}
          onClose={flashHandleClose}
        >
          <Alert
            onClose={flashHandleClose}
            severity={flash?.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {flash?.message}
          </Alert>
        </Snackbar>
        <Box>
          <Typography variant="h6" gutterBottom>
            Most popular templates
          </Typography>
          <Typography variant="body2">
            Elevate your productivity and effortlessly streamline your tasks
            with the user-friendly templates on FlexLists.com, allowing you to
            choose pre-made templates or unleash your creativity to create
            stunning views from scratch.
          </Typography>
        </Box>
        <Divider light sx={{ my: 4 }}></Divider>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center" },
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Box
            sx={{
              minWidth: { xs: "100%", md: 300 },
              mr: { xs: 0, md: 2 },
              mt: { xs: 3, md: 0 },
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="All categories"
                value={currentCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category,index)=>{
                  return <MenuItem key={index} value={category.key}>{category.value}</MenuItem>
                }
                )}
              </Select>
            </FormControl>
          </Box>
          <Box>
            {
              <Autocomplete
              id="combo-box-view-templates"
              onChange={(event, newValue) => {
                if(newValue){
                  setViewTemplate(newValue)
                  router.push({pathname:`${PATH_MAIN.newView}`})
                }
              }}
              options={templates}
              getOptionLabel={(option) => option.name}
              // value={selectedTemplate}
              filterSelectedOptions
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Templates" />}
            />
            }
          
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ my: 0 }}>
          {/* <Grid item xs={12} sm={6} md={2}>
            <Card
              component={motion.div}
              onClick={async () => {
                await router.push("/main/views/newView");
              }}
              sx={{
                margin: "auto",
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
              whileHover={{ scale: 1.1 }}
            >

              <CardContent sx={{ p: 0 }}>
                <Link href="/main/views/newView">
                  <Button
                    variant="contained"
                    sx={{
                      textAlign: "center !important",
                      minWidth: 32,
                      aspectRatio: "1 / 1",
                      borderRadius: "100px",
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Link>
              </CardContent>
              <CardHeader
                title="New from scratch"
                sx={{ textAlign: "center", py: 0 }}
              />
            </Card>
          </Grid> */}
          {templates.map((template: any) => {
            return (
              <Grid item xs={6} md={4} xl={2} key={template.icon}>
                <ViewTemplateCard
                  icon={template.icon??'/assets/icons/tour/add-icon.svg'}
                  title={template.name}
                  description={template.description}
                  onSelect={()=>handleSelectViewTemplate(template)}
                ></ViewTemplateCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MainLayout>
  );
}

const mapStateToProps = (state: any) => ({
  message: state.view.message,
  viewTemplate:state.view.viewTemplate
});

const mapDispatchToProps = {
  setMessage,
  setViewTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTemplate);
