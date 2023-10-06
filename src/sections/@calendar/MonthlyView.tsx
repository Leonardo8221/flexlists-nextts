import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import { format, isSameMonth, isSameDay } from "date-fns";

type Props = {
  days: any[];
  currentDate: Date;
  cycleStart: Date;
  getData: (date: Date, flag: string) => any[];
  handleData: (data: any, date: any) => void;
  getFieldData: (data: any, field: string) => string;
  getDataStatus: (item: any, data: any, field: string) => string;
};

const MonthlyView = ({
  days,
  currentDate,
  cycleStart,
  getData,
  handleData,
  getFieldData,
  getDataStatus,
}: Props) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
      }}
    >
      {days.map((day: any, index: number) => (
        <Box
          key={`${index}-month`}
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            height: { xs: "54px", md: "inherit" },
            cursor: "pointer",
          }}
          onClick={(e: any) => {
            if (!e.target.classList.contains("edit_row"))
              handleData(
                { date: `${format(day, "MM/dd/yyyy")} 00:00:00` },
                day
              );
          }}
        >
          <Box
            sx={{
              width: "100%",
              opacity: isSameMonth(day, cycleStart) ? 1 : 0.3,
            }}
          >
            <Box
              sx={{
                color: isSameDay(day, currentDate) ? "white" : "",
                display: "flex",
                justifyContent: "center",
                padding: "2px 0",
              }}
            >
              <Box
                sx={{
                  p: "2px",
                  borderRadius: "50%",
                  width: "28px",
                  backgroundColor: isSameDay(day, currentDate)
                    ? "rgb(26,115,232)"
                    : "",
                  textAlign: "center",
                }}
              >
                {format(day, "d")}
              </Box>
            </Box>
            {getData(new Date(format(day, "MM/dd/yyyy")), "day").map(
              (data: any) => (
                <Box
                  key={`${data.id}-month`}
                  sx={{
                    color: theme.palette.palette_style.text.white,
                    fontWeight: 500,
                    width: "100%",
                    display: "flex",
                    cursor: "pointer",
                    "&:hover": {
                      // color: theme.palette.palette_style.text.selected,
                      opacity: 0.8,
                    },
                    fontSize: "12px",
                    marginBottom: "2px",
                  }}
                  onClick={() => handleData(data, day)}
                  className="edit_row"
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      px: 1,
                      py: 0.2,
                      borderBottomLeftRadius:
                        getDataStatus(
                          data,
                          new Date(format(day, "MM/dd/yyyy")),
                          "day"
                        ) === "begin"
                          ? "10px"
                          : "",
                      borderTopLeftRadius:
                        getDataStatus(
                          data,
                          new Date(format(day, "MM/dd/yyyy")),
                          "day"
                        ) === "begin"
                          ? "10px"
                          : "",
                      borderTopRightRadius:
                        getFieldData(data, "end") === "" ||
                        getDataStatus(
                          data,
                          new Date(format(day, "MM/dd/yyyy")),
                          "day"
                        ) === "end"
                          ? "10px"
                          : "",
                      borderBottomRightRadius:
                        getFieldData(data, "end") === "" ||
                        getDataStatus(
                          data,
                          new Date(format(day, "MM/dd/yyyy")),
                          "day"
                        ) === "end"
                          ? "10px"
                          : "",
                      textTransform: "capitalize",
                      backgroundColor:
                        getFieldData(data, "end") === ""
                          ? theme.palette.palette_style.background.calendarItem
                          : getFieldData(data, "color") === ""
                          ? theme.palette.palette_style.background.calendarItem
                          : getFieldData(data, "color"),
                      height: "23px",
                    }}
                    className="edit_row"
                  >
                    {getDataStatus(
                      data,
                      new Date(format(day, "MM/dd/yyyy")),
                      "day"
                    ) === "begin" && (
                      <>
                        {getFieldData(data, "end") === "" && (
                          <Box
                            sx={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor:
                                getFieldData(data, "color") || "#FFB7B7",
                              marginTop: 0.6,
                              marginRight: 0.5,
                            }}
                            className="edit_row"
                          ></Box>
                        )}
                        {getFieldData(data, "end") === "" && (
                          <Box className="edit_row">
                            {getFieldData(data, "begin").split(" ")[1]}
                          </Box>
                        )}
                        <Box className="edit_row" sx={{ marginLeft: 0.5 }}>
                          {getFieldData(data, "title")}
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              )
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MonthlyView;
