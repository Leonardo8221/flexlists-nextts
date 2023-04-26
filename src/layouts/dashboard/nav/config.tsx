// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name:string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  //@dashboard-menu//
 
];

export default navConfig;
