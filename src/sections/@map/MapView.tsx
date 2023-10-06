import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { fetchRows } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import GoogleMapReact from 'google-map-react';
import LocationPin from "./LocationPin";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import Head from 'next/head';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_FLEXLIST_GOOGLE_MAPS_API_KEY;

const CENTER = {
  lat: 49.84120,
  lng: 24.02975
};

type Props = {
  columns: any;
  rows: any;
  translations: TranslationText[];
  open: boolean;
  refresh: Boolean;
  fetchRows: () => void;
  clearRefresh: () => void;
};

const MapView = (props: Props) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const { columns, rows, translations, open, refresh, fetchRows, clearRefresh } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [center, setCenter] = useState(CENTER);
  const [windowHeight, setWindowHeight] = useState(0);
  const [mode, setMode] = useState<"view" | "create" | "update" | "comment">("view");

  useEffect(() => {
    if (refresh) fetchRows();
  }, [refresh]);

  useEffect(() => {
    clearRefresh();
  }, [rows]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const setLocation = (location: any) => {
    setCenter(location);
  };

  return (
    <Box sx={{ p: {xs: 0.5, md: 1} }}>
      <Head>
        <title>{t("Map Page Title")}</title>
        <meta name="description" content={t("Map Meta Description")} />
        <meta name="keywords" content={t("Map Meta Keywords")} />
      </Head>
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

      <ViewFooter translations={translations} visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} mode={mode} setMode={setMode} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.rows
});

const mapDispatchToProps = {
  fetchRows
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
