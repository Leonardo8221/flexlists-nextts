import { Box, Button } from "@mui/material"
import { fi } from "date-fns/locale"
import { uploadFile } from "src/services/admin/contentManagement.service";
import DeleteIcon from '@mui/icons-material/Delete';
type UploadButtonProps = {
    fileAcceptTypes: string,
    file?: {fileId:string,fileName:string},
    onUpload: (file?: {fileId:string,fileName:string}) => void
}
export default function UploadButton({file,fileAcceptTypes,onUpload}: UploadButtonProps) {

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        if (event.target.files && event.target.files.length > 0) {
          const formData = new FormData();
          formData.append("file", event.target.files[0]);
          let response = await uploadFile(formData);
          if (response && response.fileId) {
            onUpload({fileId:response.fileId,fileName:event.target.files[0].name});
          }
        }
      };
    const deleteFile = () =>{
        onUpload({fileId:'',fileName:''});
    }
    return (
        <Box sx={{mb:2}}>
             <Button component="label" variant="contained" sx={{mr:3}}>
                Choose File
                <input
                  type="file"
                  accept={fileAcceptTypes}
                  hidden
                  onChange={handleFileChange}
                />
             </Button>
             {
               file?.fileId && file?.fileName && <span>{file?.fileName}<DeleteIcon onClick ={deleteFile}/></span>
             }
             
        </Box>
        
    )
}