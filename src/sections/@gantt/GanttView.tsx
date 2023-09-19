import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { fetchRows, setCurrentView } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { format, startOfMonth, endOfMonth, subDays, eachDayOfInterval, subMonths, addMonths } from 'date-fns';
import { FlatWhere, View } from 'src/models/SharedModels';
import { getDataColumnId } from 'src/utils/flexlistHelper';
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type Props = {
  columns: any;
  rows: any;
  open: boolean;
  currentView: View;
  translations: TranslationText[];
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
};

const GanttView = (props: Props) => {
  const { columns, rows, currentView, open, translations, fetchRows, setCurrentView } = props;
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

    let newView: View = Object.assign({}, currentView);
    newView.conditions = [];

    const fromColumn = getDataColumnId(currentView.config.fromId, columns);
    const toColumn = getDataColumnId(currentView.config.toId, columns);
    const filter1: FlatWhere = {
      left: fromColumn,
      leftType: "Field",
      right: `${format(thirdRange[thirdRange.length - 1], 'MM/dd/yyyy')} 00:00:00`,
      rightType: "SearchString",
      cmp: 'lt',
    } as FlatWhere;
    const filter2: FlatWhere = {
      left: toColumn,
      leftType: "Field",
      right: `${format(firstRange[0], 'MM/dd/yyyy')} 23:59:59`,
      rightType: "SearchString",
      cmp: 'gt',
    } as FlatWhere;
    
    newView.conditions.push(filter1);
    newView.conditions.push("And");
    newView.conditions.push(filter2);

    setCurrentView(newView);
    fetchRows();
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
        const from = new Date(meeting[getDataColumnId(currentView.config.fromId, columns)]).getDate();
        const to = new Date(meeting[getDataColumnId(currentView.config.toId, columns)]).getDate()
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
            sx={{ backgroundColor: meeting[getDataColumnId(currentView.config.colorId, columns)], width: '100%', height: '100%', zIndex: isFirstItem ? 1 : 'inherit', paddingLeft: isFirstItem ? 1 : 'inherit', whiteSpace: 'nowrap', color: 'white', display: 'flex', alignItems: 'center', borderTopLeftRadius: isFirstItem ? '5px' : 'inherit', borderBottomLeftRadius: isFirstItem ? '5px' : 'inherit', borderTopRightRadius: isLastItem ? '5px' : 'inherit', borderBottomRightRadius: isLastItem ? '5px' : 'inherit' }}
          >{isFirstItem && meeting[getDataColumnId(currentView.config.titleId, columns)]}</Box>
        </Box>);
      } else {
        dayCells.push(<Box key={`showCell-${i}`} sx={{ width: `${100 / ganttDays.length}%`, height: '60px', textAlign: 'center', fontSize: '14px', borderRight: `1px solid ${theme.palette.palette_style.border.default}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Box>);
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
    <Box sx={{ p: {xs: 0.5, md: 1}, overflow: 'auto' }}>
      <Box sx={{ textTransform: 'uppercase', backgroundColor: '#F6F8FA', px:2, py: 1.2, display: 'grid', gridTemplateColumns: `repeat(3, 1fr)`, minWidth: `${40 * ganttDays.length}px` }}>
        <Box sx={{ textAlign: 'center' }}>{format(firstRange[0], 'dd MMM')} - {format(firstRange[firstRange.length - 1], 'dd MMM')}</Box>
        <Box sx={{ textAlign: 'center' }}>{format(secondRange[0], 'dd MMM')} - {format(secondRange[secondRange.length - 1], 'dd MMM')}</Box>
        <Box sx={{ textAlign: 'center' }}>{format(thirdRange[0], 'dd MMM')} - {format(thirdRange[thirdRange.length - 1], 'dd MMM')}</Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateRows: `repeat(${ROWS}, 1fr)`, border: `1px solid ${theme.palette.palette_style.border.default}`, width: {xs: 'fit-content', md: 'inherit'}, height: `${windowHeight - (open ? 356 : 236)}px` }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${ganttDays.length}, 1fr)` }}>
          {dayTitle()}
        </Box>
        {showRows()}
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

export default connect(mapStateToProps, mapDispatchToProps)(GanttView);
