import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Main from './Main';
import Simple from './simple/Simple';
import EventDemo from './event/EventDemo';
import LinkWithArchor from './archor/LinkWithArchor';
import GroupDemo from './group/GroupDemo';
import UpdateCanvas from './update-canvas/UpdateCanvas';
import TooltipMenu from './tooltip-menu/TooltipMenu';
import LineStyle from './line-style/LineStyle';
import Tabs from './tabs/Tabs';
import Topo from './topo/Topo';
import ThemeDemo from './theme/ThemeDemo';
export default function Router() {

  const router = createBrowserRouter([{
    path: '/main/',
    element: <Main />,
    children: [{
      path: 'simple',
      element: <Simple />,
    }, {
      path: 'event',
      element: <EventDemo />,
    }, {
      path: 'archor',
      element: <LinkWithArchor />,
    }, {
      path: 'group',
      element: <GroupDemo />,
    }, {
      path: 'updateCanvas',
      element: <UpdateCanvas />
    }, {
      path: 'tooltip',
      element: <TooltipMenu />,
    }, {
      path: 'line-style',
      element: <LineStyle />,
    }, {
      path: 'tabs',
      element: <Tabs />,
    }, {
      path: 'theme',
      element: <ThemeDemo />,
    }, {
      path: 'topo',
      element: <Topo />,
    }],
  }]);

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}
