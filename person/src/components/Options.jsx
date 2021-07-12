import React , {useContext, useState} from 'react'
import {Button, TextField, Grid, Container} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContents';

const Options= ({children}) =>{
    const {name, me, callEnded, setName, callAccepted, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    const styleClass= useStyles();
    
    return (
        <Container className={styleClass.mainContainer}>

            {/* The form starts here which will contain all the options of setting up the name 
                and copying the ID for calling the peer */}

                <form className= {styleClass.formStyle} noValidate autoComplete="off">
                    <Grid container className=  {styleClass.gridContainer}>
                        
                        {/*1) Copying the ID grid */}
                        <Grid item xs={12} className=  {styleClass.padding}>
                            <h1> Welcome to Microsoft Teams</h1>
                            <br/><br/>
                            <h2> Type your Name</h2>
                            <br/>
                            <TextField label="Name" value={name} className={styleClass.textField} onChange={(event)=> setName(event.target.value)} fullWidth/>
                            <CopyToClipboard text ={me} className= {styleClass.CallCopyButton} >
                                <Button className= {styleClass.CallCopyButton} variant="contained" fullWidth>
                                    Click to get call ID
                                </Button> 
                            </CopyToClipboard>
                        </Grid>

                        {/*2) Making a call grid */}
                        <Grid item xs={12} className=  {styleClass.padding}>
                            <h2> Call your peer </h2>
                            <br/>
                            <TextField label="Paste Call ID here.." value={idToCall} className={styleClass.textField} onChange={(event)=> setIdToCall(event.target.value)} fullWidth/>
                            
                            {/* If the call is accepted then the hang up button will show up  
                            so that the person can switch off the call whenever she/he wants to*/}

                            {callAccepted && !callEnded ?(
                                <Button variant= "contained"
                                className= {styleClass.CallCopyButton}
                                fullWidth
                                onClick = {leaveCall}
                                >
                                    Decline..
                                </Button>    
                            ):(

                              // Otherwise the person have the option of calling peer when 
                              // the call still has not been established.

                                <Button variant= "contained" 
                                className= {styleClass.CallCopyButton}
                                fullWidth
                                onClick = {()=> callUser(idToCall)}
                                >
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>    


                </form>
                {children}   
        </Container>
    );
};

// all the styling (css styles) are present below for each component

const useStyles = makeStyles((theme) => ({

    CallCopyButton:{
      backgroundColor: '#49be25',
      color: 'black', 
      fontStyle: 'bold',
      marginTop: 20,
      width: 200,
    },
    formStyle: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    gridContainer: {
      width: '100%',
      fontFamily: 'Trebuchet MS',
    },
    mainContainer: {
      width: '680px',
      margin: '40px 0',
      padding: 0,
    },
    padding: {
      padding: 20,
    },
    button:{
      backgroundColor: 'white',
    },
    textField:{
      width: 400,
      padding: 8,
    },
   }));
  

export default Options;