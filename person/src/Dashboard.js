import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Options from './components/Options';
import Notifs from './components/Notifs';
import VideoPlayer from './components/VideoPlayer';

const Dashboard = ()=> {
  const classStyle = useStyles();  //pulled as an hook for styling our page
  const [token, setToken] = useState();

  return (
        <div className= {classStyle.mainContainer} >
          
          {/* Heading of our App- Microsoft Teams is displayed here and the video player
          on the top with options and notifications following up are shown on screen */}

          <h2 className= {classStyle.appName} align= "center"> Microsoft Teams </h2>
          
          <VideoPlayer/>
          <Options>
            <Notifs/>
          </Options>

        </div> 
  )
};

export default Dashboard;


const useStyles = makeStyles((theme) => ({
  appName:{
    color: 'black',
    fontSize: 80,
    fontFamily: 'Trebuchet MS',
    padding: '10px',
    paddingTop: '10px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  SideWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
}));
