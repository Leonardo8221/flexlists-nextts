import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns, fetchRows, setCurrentView } from '../../redux/actions/viewActions';
import {  setRows } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { format, startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns';
import { FlatWhere, View } from 'src/models/SharedModels';
import { getDataColumnId, downloadFileUrl, getChoiceField } from 'src/utils/flexlistHelper';

type Props = {
  columns: any;
  rows: any;
  open: boolean;
  currentView:View,
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
};

const meetings = [
  {
    title: 'Meeting Meeting Meeting',
    color: '#FFB800',
    level: 3,
    from: '04/02/2023 08:00:00',
    to: '04/07/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#FFB800',
    level: 3,
    from: '04/09/2023 08:00:00',
    to: '04/15/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#C92929',
    level: 4,
    from: '04/11/2023 08:00:00',
    to: '04/19/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#159639',
    level: 5,
    from: '04/06/2023 08:00:00',
    to: '04/22/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#FFB800',
    level: 6,
    from: '04/04/2023 08:00:00',
    to: '04/12/2023 08:00:00'
  },
  {
    title: 'Meeting',
    color: '#C92929',
    level: 7,
    from: '04/19/2023 08:00:00',
    to: '04/26/2023 08:00:00'
  }
];

const TimelineView = (props: Props) => {
  const { columns, rows, open, currentView, setRows, fetchRows, setCurrentView } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);

  const ROWS = 10;
  const currentMonth = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());
  const daysInMonth = getDaysInMonth(new Date());

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    let newView: View = Object.assign({}, currentView);
    newView.conditions = [];

    const filter1: FlatWhere = {
      left: 'createdAt',
      leftType: "Field",
      right: `${format(currentMonth, 'MM/dd/yyyy')} 00:00:00`,
      rightType: "SearchString",
      cmp: 'gte',
    } as FlatWhere;
    const filter2: FlatWhere = {
      left: 'createdAt',
      leftType: "Field",
      right: `${format(endDate, 'MM/dd/yyyy')} 23:59:59`,
      rightType: "SearchString",
      cmp: 'lte',
    } as FlatWhere;
    
    newView.conditions.push(filter1);
    newView.conditions.push("And");
    newView.conditions.push(filter2);

    setCurrentView(newView);
    fetchRows();
  }, []);

  const dayTitle = () => {
    const dayTitles = [];

    for(let i = 0; i < daysInMonth; i++) {
      dayTitles.push(<Box key={`daytitle-${i}`} sx={{ minWidth: '40px', height: '60px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</Box>);
    }

    return dayTitles;
  };

  const showCell = (level: number) => {
    const dayCells = [];

    for(let i = 0; i < daysInMonth; i++) {
      const meeting = getMeeting(i + 1, level);
      
      if (meeting) {
        const from = new Date(meeting.from).getDate();
        const to = new Date(meeting.to).getDate();

        dayCells.push(
        <Box
          key={`showCell-${i}`}
          sx={{
            width: `${100 / daysInMonth}%`,
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
            sx={{ backgroundColor: meeting.color, width: '100%', height: '100%', zIndex: from === i + 1 ? 1 : 'inherit', paddingLeft: from === i + 1 ? 1 : 'inherit', whiteSpace: 'nowrap', color: 'white', display: 'flex', alignItems: 'center', borderTopLeftRadius: from === i + 1 ? '5px' : 'inherit', borderBottomLeftRadius: from === i + 1 ? '5px' : 'inherit', borderTopRightRadius: to === i + 1 ? '5px' : 'inherit', borderBottomRightRadius: to === i + 1 ? '5px' : 'inherit' }}
          >{from === i + 1 && meeting.title}</Box>
        </Box>);
      } else {
        dayCells.push(<Box key={`showCell-${i}`} sx={{ width: `${100 / 30}%`, height: '60px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Box>);
      }      
    }

    return dayCells;
  };

  const getMeeting = (date: number, level: number) => {
    let meeting = null;

    for (let i = 0; i < rows.length; i++) {
      const from = rows[i][getDataColumnId(currentView.config.fromId, columns)];
      const to = rows[i][getDataColumnId(currentView.config.toId, columns)];

      if (date >= from && date <= to && rows[i][getDataColumnId(currentView.config.levelId, columns)] === level) {
        meeting = rows[i];
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
    <Box sx={{ p: {xs: 0.5, md: 1} }}>
      <Box sx={{ textTransform: 'uppercase', backgroundColor: '#F6F8FA', px:2, py: 1.2 }}>{format(currentMonth, 'MMMM yyyy')}</Box>
      <Box sx={{ display: 'grid', gridTemplateRows: `repeat(${ROWS}, 1fr)`, border: `1px solid ${theme.palette.palette_style.border.default}`, height: `${windowHeight - (open ? 356 : 310)}px`, overflow: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${daysInMonth}, 1fr)` }}>
          {dayTitle()}
        </Box>
        {showRows()}
      </Box>

      <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.columns,
  currentView:state.view.currentView
});

const mapDispatchToProps = {
  setColumns,
  setRows,
  fetchRows,
  setCurrentView
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineView);
