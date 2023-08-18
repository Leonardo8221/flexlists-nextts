import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, addWeeks, addYears, compareAsc, addHours } from 'date-fns';
import RowFormPanel from "src/sections/@list/RowFormPanel"
import { connect } from 'react-redux';
import { fetchRows, setCurrentView } from '../../redux/actions/viewActions';
import { setRows } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import CalendarTitle from "./CalendarTitle";
import WeekBar from './WeekBar';
import MonthlyView from './MonthlyView';
import WeeklyView from './WeeklyView';
import DailyView from './DailyView';
import ListView from './ListView';
import CalendarFooter from './CalendarFooter';
import { getDataColumnId } from 'src/utils/flexlistHelper';
import { FlatWhere, View } from 'src/models/SharedModels';

type CalendarViewProps = {
  currentView:View,
  columns: any;
  rows: any;
  open: boolean;
  setRows: (columns: any) => void;
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
};

const CalendarView = ({currentView, columns, rows, open, setRows, fetchRows, setCurrentView }: CalendarViewProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState("month");
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [days, setDays] = useState<any>([]);
  const [cycleStart, setCycleStart] = useState(startOfMonth(currentDate));
  const [windowHeight, setWindowHeight] = useState(0);
  const [detailMode, setDetailMode] = useState<"view" | "create" | "update" | "comment">(
    "view"
  );

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const displayDays = [];
    let newView: View = Object.assign({}, currentView);
    let filterStartDate, filterEndDate;
    newView.conditions = [];

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
    } else if (mode === 'list') {
      let day = currentDate;

      setCycleStart(currentDate);

      while (day <= addYears(currentDate, 1)) {
        displayDays.push(day);
        day = addDays(day, 1);
      }
    }

    setDays(displayDays);

    if (mode === 'day') {
      filterStartDate = filterEndDate = currentDate;
    } else {
      filterStartDate = displayDays[0];
      filterEndDate = displayDays[displayDays.length - 1];      
    }

    const dateColumn = getDataColumnId(currentView.config.beginDateTimeId, columns);
    const filter1: FlatWhere = {
      left: dateColumn,
      leftType: "Field",
      right: `${format(filterStartDate, 'MM/dd/yyyy')} 00:00:00`,
      rightType: "SearchString",
      cmp: 'gte',
    } as FlatWhere;
    const filter2: FlatWhere = {
      left: dateColumn,
      leftType: "Field",
      right: `${format(filterEndDate, 'MM/dd/yyyy')} 23:59:59`,
      rightType: "SearchString",
      cmp: 'lte',
    } as FlatWhere;
    
    newView.conditions.push(filter1);
    newView.conditions.push("And");
    newView.conditions.push(filter2);

    setCurrentView(newView);
    fetchRows();
  }, [currentDate, mode]);

  const getData = (date: Date, action: string) => {
    const selected = rows.filter((item: any) => (compareAsc(new Date(item[getDataColumnId(currentView.config.beginDateTimeId, columns)]), date) >= 0 && compareAsc(new Date(item[getDataColumnId(currentView.config.beginDateTimeId, columns)]), action === 'day' ? addDays(date, 1) : addHours(date, 1)) === -1) || (compareAsc(new Date(item[getDataColumnId(currentView.config.endDateTimeId, columns)]), date) >= 0 && compareAsc(new Date(item[getDataColumnId(currentView.config.endDateTimeId, columns)]), action === 'day' ? addDays(date, 1) : addHours(date, 1)) === -1) || (compareAsc(new Date(item[getDataColumnId(currentView.config.beginDateTimeId, columns)]), date) <= 0 && compareAsc(new Date(item[getDataColumnId(currentView.config.endDateTimeId, columns)]), action === 'day' ? addDays(date, 1) : addHours(date, 1)) >= 0));

    return selected;
  };

  const getDataStatus = (item: any, date: Date, action: string) => {
    if (compareAsc(new Date(item[getDataColumnId(currentView.config.beginDateTimeId, columns)]), date) >= 0 && compareAsc(new Date(item[getDataColumnId(currentView.config.beginDateTimeId, columns)]), action === 'day' ? addDays(date, 1) : addHours(date, 1)) === -1) return 'begin';
    else if (compareAsc(new Date(item[getDataColumnId(currentView.config.endDateTimeId, columns)]), date) >= 0 && compareAsc(new Date(item[getDataColumnId(currentView.config.endDateTimeId, columns)]), action === 'day' ? addDays(date, 1) : addHours(date, 1)) === -1) return 'end';
    else return 'normal';
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

  const handleNewRowPanel = (values: any) => {
    setDetailMode('create');
    setVisibleAddRowPanel(true);
    setSelectedRowData(values);
  };

  const handleData = (data: any, date: any) => {
    if (data.id) setDetailMode('view');
    else setDetailMode('create');

    setCurrentDate(date);

    setSelectedRowData(data);
    setVisibleAddRowPanel(true);
  };

  const handleMode = (mode: string) => {
    setMode(mode);
    setCurrentDate(new Date());
  };

  const handleFirstPageer = (flag: number) => {
    if (mode === 'month') setCurrentDate(addMonths(currentDate, flag));
    else if (mode === 'week') setCurrentDate(addWeeks(currentDate, flag));
    else if (mode === 'day' || mode === 'list') setCurrentDate(addDays(currentDate, flag));
    else {}
  };

  const handleSecondPageer = (flag: number) => {
    if (mode === 'month') setCurrentDate(addYears(currentDate, flag));
    else if (mode === 'week') setCurrentDate(addMonths(currentDate, flag));
    else if (mode === 'day' || mode === 'list') setCurrentDate(addWeeks(currentDate, flag));
    else {}
  };

  const formatNumber = (num: number) => {
    return num > 9 ? num : `0${num}`;
  };

  const getFieldData = (data: any, field: string) => {
    let fieldId = 0;
    let fieldData = '';

    switch (field) {
      case 'title':
        fieldId = currentView.config.titleId;
        fieldData = data[getDataColumnId(fieldId, columns)];
        break;

      case 'begin':
        fieldId = currentView.config.beginDateTimeId;
        const beginDate = new Date(data[getDataColumnId(fieldId, columns)]);
        fieldData = `${formatNumber(beginDate.getHours())}:${formatNumber(beginDate.getMinutes())}`;
        break;

      case 'end':
        fieldId = currentView.config.endDateTimeId;

        if (fieldId && data[getDataColumnId(fieldId, columns)]) {
          const endDate = new Date(data[getDataColumnId(fieldId, columns)]);
          fieldData = `${endDate.getHours()}:${endDate.getMinutes()}`;
        }
        
        break;

      case 'color':
        fieldId = currentView.config.colorId;

        if (fieldId && data[getDataColumnId(fieldId, columns)]) fieldData = data[getDataColumnId(fieldId, columns)];
        
        break;

      default:
        break;
    }

    return fieldData;
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
        <Box sx={{ paddingLeft: mode === 'month' || mode === 'list' ? 'inherit' : isDesktop ? '64px' : '24px' }}>
          <CalendarTitle mode={mode} current={cycleStart} currentDate={currentDate} handleFirstPageer={handleFirstPageer} handleSecondPageer={handleSecondPageer} />
          {mode !== 'day' && mode !== 'list' && <WeekBar mode={mode} />}
        </Box>
        {mode === 'month' ? 
          <MonthlyView days={days} currentDate={currentDate} cycleStart={cycleStart} getData={getData} handleData={handleData} getFieldData={getFieldData} getDataStatus={getDataStatus} /> :
        mode === 'week' ?
          <WeeklyView hours={hours} days={days} currentDate={currentDate} getData={getData} handleData={handleData} getFieldData={getFieldData} getDataStatus={getDataStatus} /> :
        mode === 'day' ?
          <DailyView hours={hours} currentDate={currentDate} getData={getData} handleData={handleData} getFieldData={getFieldData} getDataStatus={getDataStatus} /> :
        mode === 'list' ?
          <ListView days={days} currentDate={currentDate} getData={getData} handleData={handleData} getFieldData={getFieldData} getDataStatus={getDataStatus} /> :
          <></>
        }
      </Box>

      <CalendarFooter mode={mode} handleNewRowPanel={(values)=>handleNewRowPanel(values)} handleMode={handleMode} />

      {detailMode && <RowFormPanel
        rowData={selectedRowData}
        columns={columns}
        onSubmit={handleNewRow}
        open={visibleAddRowPanel}
        onClose={() => setVisibleAddRowPanel(false)}
        mode={detailMode}
      />}
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.rows,
  currentView:state.view.currentView
});

const mapDispatchToProps = {
  setRows,
  fetchRows,
  setCurrentView
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
