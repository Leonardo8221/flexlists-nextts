import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { fetchRows, setCurrentView } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { format, startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns';
import { FlatWhere, View } from 'src/models/SharedModels';
import { getDataColumnId } from 'src/utils/flexlistHelper';
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type Props = {
  columns: any;
  rows: any;
  open: boolean;
  currentView: View,
  translations: TranslationText[];
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
};

const TimelineView = (props: Props) => {
  const { columns, rows, open, currentView, translations, fetchRows, setCurrentView } = props;
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

    const fromColumn = getDataColumnId(currentView.config.fromId, columns);
    const toColumn = getDataColumnId(currentView.config.toId, columns);
    const filter1: FlatWhere = {
      left: fromColumn,
      leftType: "Field",
      right: `${format(endDate, 'MM/dd/yyyy')} 00:00:00`,
      rightType: "SearchString",
      cmp: 'lt',
    } as FlatWhere;
    const filter2: FlatWhere = {
      left: toColumn,
      leftType: "Field",
      right: `${format(currentMonth, 'MM/dd/yyyy')} 23:59:59`,
      rightType: "SearchString",
      cmp: 'gt',
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
      dayTitles.push(<Box key={`daytitle-${i}`} sx={{ minWidth: '40px', height: '66px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</Box>);
    }

    return dayTitles;
  };

  const showCell = (level: number) => {
    const dayCells = [];

    for(let i = 0; i < daysInMonth; i++) {
      const meeting = getMeeting(i + 1, level);
      
      if (meeting) {
        const from = new Date(meeting[getDataColumnId(currentView.config.fromId, columns)]).getDate();
        const to = new Date(meeting[getDataColumnId(currentView.config.toId, columns)]).getDate()

        dayCells.push(
        <Box
          key={`showCell-${i}`}
          sx={{
            width: `${100 / daysInMonth}%`,
            height: '66px',
            textAlign: 'center',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 0.5
          }}
        >
          <Box
            sx={{ backgroundColor: meeting[getDataColumnId(currentView.config.colorId, columns)], width: '100%', height: '100%', zIndex: from === i + 1 ? 1 : 'inherit', paddingLeft: from === i + 1 ? 1 : 'inherit', whiteSpace: 'nowrap', color: 'white', display: 'flex', alignItems: 'center', borderTopLeftRadius: from === i + 1 ? '5px' : 'inherit', borderBottomLeftRadius: from === i + 1 ? '5px' : 'inherit', borderTopRightRadius: to === i + 1 ? '5px' : 'inherit', borderBottomRightRadius: to === i + 1 ? '5px' : 'inherit' }}
          >
            {from === i + 1 && meeting[getDataColumnId(currentView.config.titleId, columns)]}
          </Box>
        </Box>);
      } else {
        dayCells.push(
          <Box key={`showCell-${i}`} sx={{ width: `${100 / daysInMonth}%`, height: '66px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Box>);
      }      
    }

    return dayCells;
  };

  const getMeeting = (date: number, level: number) => {
    let meeting = null;

    for (let i = 0; i < rows.length; i++) {
      const from = new Date(rows[i][getDataColumnId(currentView.config.fromId, columns)]).getDate();
      const to = new Date(rows[i][getDataColumnId(currentView.config.toId, columns)]).getDate();

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
      <Box sx={{ display: 'grid', gridTemplateRows: `repeat(${ROWS}, 1fr)`, border: `1px solid ${theme.palette.palette_style.border.default}`, height: `${windowHeight - (open ? 356 : 236)}px`, overflow: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${daysInMonth}, 1fr)`, height: '60px' }}>
          {dayTitle()}
        </Box>
        {rows.length ? showRows() : <></>}
      </Box>

      <ViewFooter translations={translations} visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.rows,
  currentView:state.view.currentView
});

const mapDispatchToProps = {
  fetchRows,
  setCurrentView
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineView);
