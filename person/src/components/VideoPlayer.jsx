import React, { useContext, useState} from 'react'
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SocketContext } from '../SocketContents';


const VideoPlayer= () =>{
    const{name, callAccepted, myVideo, userVideo, callEnded, stream, call}= useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    const styleClass =  useStyles();
    return (
      
        <Grid container className= {styleClass.gridContainer}>
          <div  className= {styleClass.topDivisionBox}>
             {/*The User/First Person's Video*/}
            {    
            stream && (   
                <Grid item xs={12} md={6}>
                    <h2>{name || 'Name'}</h2>
                    <video playsInline muted ref={myVideo} autoPlay className={styleClass.videoStyle}/>
                </Grid>
            
            )}

 
            {/*The Other Person's Video*/}
            { callAccepted && !callEnded &&(
                /*Only if the call is accepted or the call is still on show other person video*/
            
              <Grid item xs={12} md={6}>
                  <h2>{call.name || 'Name'}</h2>
                  <video playsInline muted ref={userVideo} autoPlay className={styleClass.videoStyle}/>
              </Grid>
          
            )}
          </div>
        </Grid>
        
    );
};

// all the styling (css styles) are present below for each component

const useStyles = makeStyles((theme) => ({
    videoStyle: {
      width: '630px',
    },
    gridContainer: {
      justifyContent: 'center',
    },
    topDivisionBox:{
        display: 'flex',
        flexDirection: 'row',
        gridGap: '50px',
        align:'center',
        padding: '10px',
        fontFamily: 'Trebuchet MS',
    },
    
  }));
export default VideoPlayer;