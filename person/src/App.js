import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { ContextProvider } from './SocketContents';
import Dashboard from './Dashboard';

const App = ()=> {

  // The control goes here after the index.js file and our main Dashboard
  // is returned from App which contains all the components for video calling

  const classes= useStyles();
  return (
    <div className= {classes.mainScreen}>
      <ContextProvider>
        <Dashboard />

    </ContextProvider>
    </div>
  );
}

export default App;

// The stying for the main division of our screen component is done here
const useStyles = makeStyles((theme) => ({
  mainScreen: {
    alignItems: 'center',
    padding: '20px',
  },
 }));
