import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, addWeeks, compareAsc, addHours } from 'date-fns';
import RowFormPanel from "src/sections/@list/RowFormPanel"
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/viewActions';
import { setRows } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import CalendarTitle from "./CalendarTitle";
import WeekBar from './WeekBar';
import MonthlyView from './MonthlyView';
import WeeklyView from './WeeklyView';
import DailyView from './DailyView';
import CalendarFooter from './CalendarFooter';
import { getDataColumnId } from 'src/utils/flexlistHelper';
import { View } from 'src/models/SharedModels';

type CalendarViewProps = {
  currentView:View,
  columns: any;
  rows: any;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  open: boolean;
};

const CalendarView = ({currentView, columns, rows, setRows, open }: CalendarViewProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState("month");
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [days, setDays] = useState<any>([]);
  const [cycleStart, setCycleStart] = useState(startOfMonth(currentDate));
  const [windowHeight, setWindowHeight] = useState(0);

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const displayDays = [];

    if (mode === 'month') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
      let day = startDate;

      setCycleStart(monthStart);

      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          displayDays.push(day);
          day = addDays(day, 1);
        }
      }
    } else if (mode === 'week') {
      const startDate = startOfWeek(currentDate);
      let day = startDate;

      setCycleStart(startOfWeek(currentDate));

      for (let i = 0; i < 7; i++) {
        displayDays.push(day);
        day = addDays(day, 1);
      }
    }

    setDays(displayDays);
  }, [currentDate, mode]);

  const getData = (date: Date, action: string) => {
    const selected = rows.filter((item: any) => (compareAsc(new Date(item[getDataColumnId(currentView.config.dateFieldId,columns)]), date) >= 0 && compareAsc(new Date(item[getDataColumnId(currentView.config.dateFieldId,columns)]), action === 'day' ? addDays(date, 1) : addHours(date, 1)) === -1));

    return selected;
  };

  const handleNewRow = (values: any, action: string) => {
    if (action === 'create' || action === 'clone') {
      rows.push(values);
      setRows([...rows]);
    }
    else if (action === 'update') setRows(rows.map(((row: any) => row.id === values.id ? values : row)));
    else if (action === 'delete') setRows(rows.filter((row: any) => row.id !== values.id));
    else {}
  };

  const handleNewRowPanel = () => {
    setVisibleAddRowPanel(true);
    setSelectedRowData(null);
  };

  const handleData = (data: any, date: any) => {
    setCurrentDate(date);

    setSelectedRowData(data);
    setVisibleAddRowPanel(true);
  };

  const handleMode = (mode: string) => {
    setMode(mode);
    setCurrentDate(new Date());
  };

  const handlePageDays = (flag: number) => {
    if (mode === 'month') setCurrentDate(addMonths(currentDate, flag));
    else if (mode === 'week') setCurrentDate(addWeeks(currentDate, flag));
    else if (mode === 'day') setCurrentDate(addDays(currentDate, flag));
    else {}
  };
  const getTitle = (data:any):string =>{
    return data[getDataColumnId(currentView.config.titleId,columns)]
  }
  return (
    <Box sx={{ display: {md: 'flex'}, paddingRight: {md: 1}, height: {xs: `${windowHeight - (open ? 312 : 268)}px`, md: 'calc(100% - 160px)', lg: 'calc(100% - 104px)'}, overflow: {xs: 'auto', md: 'inherit'} }}>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          width: '100%',
          height: {md: '100%'},
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ paddingLeft: mode === 'month' ? 'inherit' : isDesktop ? '64px' : '24px' }}>
          <CalendarTitle current={format(cycleStart, 'MMMM yyyy')} handlePageDays={handlePageDays} />
          {mode !== 'day' && <WeekBar mode={mode} />}
        </Box>
        {mode === 'month' ? 
          <MonthlyView days={days} currentDate={currentDate} cycleStart={cycleStart} getData={getData} handleData={handleData} getTitle={getTitle} /> :
        mode === 'week' ?
          <WeeklyView hours={hours} days={days} currentDate={currentDate} getData={getData} handleData={handleData} getTitle={getTitle} /> :
        mode === 'day' ?
          <DailyView hours={hours} currentDate={currentDate} getData={getData} handleData={handleData} getTitle={getTitle} /> :
          <></>
        }
      </Box>

      <CalendarFooter mode={mode} handleNewRowPanel={handleNewRowPanel} handleMode={handleMode} />

      <RowFormPanel
        rowData={selectedRowData}
        columns={columns}
        onSubmit={handleNewRow}
        open={visibleAddRowPanel}
        onClose={() => setVisibleAddRowPanel(false)}
        comment={false}
      />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.rows,
  currentView:state.view.currentView
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
