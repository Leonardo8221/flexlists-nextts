import { useState } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/viewActions';
import {  setRows } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Scatter } from 'react-chartjs-2';
import ViewFooter from '../../components/view-footer/ViewFooter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  columns: any;
  rows: any;
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  open: boolean;
};

const BlankPage = (props: Props) => {
  const { columns, rows, setRows, open } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'SALES',
      },
    },
    maintainAspectRatio: false
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Product 1 / Column 1',
        data: [-700, 500, 600, 450, -300, 900, -700],
        borderColor: '#2977C9',
        backgroundColor: '#2977C9',
        // fill: true
      },
      {
        label: 'Product 2 / Column 2',
        data: [200, -300, -800, 400, 550, 600, 350],
        borderColor: '#FFB800',
        backgroundColor: '#FFB800',
      },
    ],
  };

  const data_pie = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options_scatter = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false
  };
  
  const data_scatter = {
    datasets: [
      {
        label: 'A dataset',
        data: Array.from({ length: 100 }, () => ({
          x: [0.7, 5, 6, 4, -3, 9, -7],
          y: [0.2, -3, -8, 4, 5, 6, 3],
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <Box sx={{  }}>
      <Box sx={{ height: '392px' }}>
        <Line options={options} data={data} />
      </Box>
      <Box sx={{ height: '392px' }}>
        <Bar options={options} data={data} />
      </Box>
      {/* <Box sx={{ height: '392px' }}>
        <Pie data={data_pie} />
      </Box>
      <Box sx={{ height: '392px' }}>
        <Doughnut data={data_pie} />
      </Box> */}
      {/* <Box sx={{ height: '392px' }}>
        <Scatter options={options_scatter} data={data_scatter} />
      </Box> */}

      <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.columns
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(BlankPage);
