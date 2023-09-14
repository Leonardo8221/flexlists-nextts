import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/viewActions';
import { setRows } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_FLEXLIST_GOOGLE_MAPS_API_KEY;

const CENTER = {
  lat: 49.84120,
  lng: 24.02975
};

type Props = {
  columns: any;
  rows: any;
  translations: TranslationText[];
  setColumns: (columns: any) => void;
  setRows: (columns: any) => void;
  open: boolean;
};

const MapView = (props: Props) => {
  const { columns, rows, translations, setRows, open } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [center, setCenter] = useState(CENTER);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const setLocation = (location: any) => {
    setCenter(location);
  };

  return (
    <Box sx={{ p: {xs: 0.5, md: 1} }}>
      <Box sx={{ height: {xs: `${windowHeight - (open ? 310 : 264)}px`, md: `${windowHeight - 217}px`} }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY as string, libraries: 'places' }}
          center={center}
          defaultZoom={12}
        >
          {rows.map((row: any) => (
            row.location && <LocationPin
              key={`map-${row.id}`}
              lat={row.location.lat}
              lng={row.location.lng}
              row={row}
              setLocation={setLocation}
            />
          ))}
        </GoogleMapReact>
      </Box>

      <ViewFooter translations={translations} visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.rows
});

const mapDispatchToProps = {
  setColumns,
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
