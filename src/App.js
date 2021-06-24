import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import 'react-virtualized/styles.css';
import Lyrics from './pages/Lyrics';
import { Spinner } from 'reactstrap';


const App = () => (
  <React.Suspense fallback={ <Spinner color="primary" />}>
    <ToastProvider autoDismissTimeout={10000} autoDismiss>
      <Lyrics />
    </ToastProvider>
  </React.Suspense>
);
export default App;
