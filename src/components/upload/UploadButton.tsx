import { Box, Button, Tooltip } from "@mui/material";
import { fi } from "date-fns/locale";
import { uploadFile } from "src/services/admin/contentManagement.service";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";
import { isFileExtensionAllowed } from "src/utils/fileUtils";
import { isSucc } from "src/models/ApiResponse";
import { useTheme } from "@mui/material/styles";
type UploadButtonProps = {
  fileAcceptTypes: string[];
  file?: { fileId: string; fileName: string };
  onUpload: (file?: { fileId: string; fileName: string }) => void;
  setFlashMessage?: (message: FlashMessageModel) => void;
};
function UploadButton({
  file,
  fileAcceptTypes,
  onUpload,
  setFlashMessage,
}: UploadButtonProps) {
  const theme = useTheme();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!isFileExtensionAllowed(file.name, fileAcceptTypes)) {
        setFlashMessage &&
          setFlashMessage({
            message: "File extension not allowed",
            type: "error",
          });
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      let response = await uploadFile(formData);
      if (isSucc(response) && response.data && response.data.fileId) {
        onUpload({
          fileId: response.data.fileId,
          fileName: event.target.files[0].name,
        });
      } else {
        setFlashMessage &&
          setFlashMessage({ message: response.message, type: "error" });
      }
    }
  };
  const deleteFile = () => {
    onUpload({ fileId: "", fileName: "" });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button component="label" variant="contained" sx={{ mr: 3 }}>
        Choose File
        <input
          type="file"
          accept={fileAcceptTypes
            .map((x) => {
              if (x === "*/*") {
                return x;
              }
              return `.${x}`;
            })
            .join(",")}
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {file?.fileId && file?.fileName && (
        <span>
          {file?.fileName}
          <Tooltip title="Delete file">
            <DeleteIcon
              sx={{
                ml: 1,
                color: theme.palette.palette_style.error.dark,
                cursor: "pointer",
              }}
              onClick={deleteFile}
            />
          </Tooltip>
        </span>
      )}
    </Box>
  );
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  setFlashMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadButton);
