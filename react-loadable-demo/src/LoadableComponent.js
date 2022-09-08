import Loadable from 'react-loadable';
function Loading() {
  return 'loading';
}

const LoadableComponent = Loadable({
  loader: () => import('./MyComponent'),
  loading: Loading,
});
export default LoadableComponent;