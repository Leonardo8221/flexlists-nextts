import SvgColor from '../../../components/svg-color';

const icon = (name:string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'main',
    path: '/main/list',
    icon: icon('ic_analytics'),
  },
  {
    title: 'tour',
    path: '/main/tour',
    icon: icon('ic_analytics'),
  }
];

export default navConfig;
