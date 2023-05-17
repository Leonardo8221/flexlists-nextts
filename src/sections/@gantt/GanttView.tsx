import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/listFieldActions';
import {  setRows } from '../../redux/actions/listContentActions';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { format, startOfMonth, endOfMonth, subDays, eachDayOfInterval, subMonths, addMonths } from 'date-fns';

type Props = {
  columns: any;
  rows: any;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  open: boolean;
};

const meetings = [
  {
    title: 'Meeting Meeting Meeting',
    color: '#FFB800',
    level: 3,
    from: '04/12/2023 08:00:00',
    to: '04/17/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#FFB800',
    level: 3,
    from: '04/19/2023 08:00:00',
    to: '04/25/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#C92929',
    level: 4,
    from: '04/21/2023 08:00:00',
    to: '04/29/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#159639',
    level: 5,
    from: '04/16/2023 08:00:00',
    to: '04/29/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#FFB800',
    level: 6,
    from: '04/14/2023 08:00:00',
    to: '04/22/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#C92929',
    level: 7,
    from: '04/19/2023 08:00:00',
    to: '04/26/2023 08:00:00'
  }
];

const GanttView = (props: Props) => {
  const { columns, rows, setRows, open } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);

  const ROWS = 10;
  const startMonth = startOfMonth(new Date());
  const endMonth = endOfMonth(new Date());
  const currentDateUnit = Math.floor((new Date()).getDate() / 10);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const getRange = (startMonth: Date, endMonth: Date, unit: number) => {
    return eachDayOfInterval({ start: startMonth, end: endMonth }).filter((date, i) => Math.floor(date.getDate() / 10) === unit);
  };

  const lastRange = (startMonth: Date, endMonth: Date) => {
    let rangeDays = eachDayOfInterval({ start: startMonth, end: endMonth }).filter((date, i) => Math.floor(date.getDate() / 10) === 2);
    
    if (endMonth.getDate() === 31) {
      rangeDays.push(subDays(endMonth, 1));
    }

    rangeDays.push(endMonth);
    
    return rangeDays;
  };

  const firstRange = currentDateUnit < 1 ? lastRange(startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))) : getRange(startMonth, endMonth, currentDateUnit - 1);
  const secondRange = currentDateUnit > 1 ? lastRange(startMonth, endMonth) : getRange(startMonth, endMonth, currentDateUnit);
  const thirdRange = currentDateUnit === 2 ? getRange(startOfMonth(addMonths(new Date(), 1)), endOfMonth(addMonths(new Date(), 1)), 0) : currentDateUnit === 1 ? lastRange(startMonth, endMonth) : getRange(startMonth, endMonth, currentDateUnit + 1);
  const ganttDays = firstRange.concat(secondRange, thirdRange);

  const dayTitle = () => {
    const dayTitles = [];

    for(let i = 0; i < ganttDays.length; i++) {
      dayTitles.push(<Box key={`daytitle-${i}`} sx={{ minWidth: '40px', height: '60px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ganttDays[i].getDate()}</Box>);
    }

    return dayTitles;
  };

  const showCell = (level: number) => {
    const dayCells = [];

    for(let i = 0; i < ganttDays.length; i++) {
      const meeting = getMeeting(ganttDays[i].getDate(), level);
      
      if (meeting) {
        const from = new Date(meeting.from).getDate();
        const to = new Date(meeting.to).getDate();
        const isFirstItem = from === ganttDays[i].getDate();
        const isLastItem = to === ganttDays[i].getDate();

        dayCells.push(
        <Box
          key={`showCell-${i}`}
          sx={{
            width: `${100 / ganttDays.length}%`,
            height: '60px',
            textAlign: 'center',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 0.5
          }}
        >
          <Box
            sx={{ backgroundColor: meeting.color, width: '100%', height: '100%', zIndex: isFirstItem ? 1 : 'inherit', paddingLeft: isFirstItem ? 1 : 'inherit', whiteSpace: 'nowrap', color: 'white', display: 'flex', alignItems: 'center', borderTopLeftRadius: isFirstItem ? '5px' : 'inherit', borderBottomLeftRadius: isFirstItem ? '5px' : 'inherit', borderTopRightRadius: isLastItem ? '5px' : 'inherit', borderBottomRightRadius: isLastItem ? '5px' : 'inherit' }}
          >{isFirstItem && meeting.title}</Box>
        </Box>);
      } else {
        dayCells.push(<Box key={`showCell-${i}`} sx={{ width: `${100 / 30}%`, height: '60px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Box>);
      }      
    }

    return dayCells;
  };

  const getMeeting = (date: number, level: number) => {
    let meeting = null;

    for (let i = 0; i < meetings.length; i++) {
      const from = new Date(meetings[i].from).getDate();
      const to = new Date(meetings[i].to).getDate();

      if (date >= from && date <= to && meetings[i].level === level) {
        meeting = meetings[i];
        break;
      }
    }

    return meeting;
  };

  const showRows = () => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
      rows.push(<Box key={`showRows-${i}`} sx={{ display: 'flex' }}>
                  {showCell(i + 1)}
                </Box>);
    }

    return rows;
  };

  return (
    <Box sx={{ p: {xs: 0.5, md: 1}, height: `${windowHeight - (open ? 307 : 262)}px`, overflow: 'auto' }}>
      <Box sx={{ textTransform: 'uppercase', backgroundColor: '#F6F8FA', px:2, py: 1.2, display: 'grid', gridTemplateColumns: `repeat(3, 1fr)`, minWidth: `${40 * ganttDays.length}px` }}>
        <Box sx={{ textAlign: 'center' }}>{format(firstRange[0], 'dd MMM')} - {format(firstRange[firstRange.length - 1], 'dd MMM')}</Box>
        <Box sx={{ textAlign: 'center' }}>{format(secondRange[0], 'dd MMM')} - {format(secondRange[secondRange.length - 1], 'dd MMM')}</Box>
        <Box sx={{ textAlign: 'center' }}>{format(thirdRange[0], 'dd MMM')} - {format(thirdRange[thirdRange.length - 1], 'dd MMM')}</Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateRows: `repeat(${ROWS}, 1fr)`, border: `1px solid ${theme.palette.palette_style.border.default}`, width: {xs: 'fit-content', md: 'inherit'} }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${ganttDays.length}, 1fr)` }}>
          {dayTitle()}
        </Box>
        {showRows()}
      </Box>

      <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  rows: state.listContent.rows
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(GanttView);
