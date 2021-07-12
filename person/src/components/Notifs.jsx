import React, {useContext, useState} from 'react'
import { Button } from '@material-ui/core'
import { SocketContext} from '../SocketContents'
import { makeStyles} from '@material-ui/core/styles';


const Notifs= () =>{
    const styleClass= useStyles();
    const [idToCall, setIdToCall] = useState('');

    const { me, myVideo, answerCall, call, callAccepted} = useContext(SocketContext);

    return (
        <> 

        {/* when the call is coming and not yet accepted the button shows the message Pick 
        Up until the user picks the phone. Users name is also visible whoever is calling*/}

            {call.isRecievedCall && (
                !callAccepted &&(
                <div className= {styleClass.columnAlignDiv}>
                    <div className= {styleClass.rowAlignWithButton}>
                        <h2 size= '40'>Incoming call from {call.name}..</h2>
                        <Button className={styleClass.answerButton} onClick={answerCall}>
                            Pick Up!
                        </Button>

                    </div>
                    <br/>
                    <h4 align= "center">Press 'Pick Up!' to answer {call.name}'s call</h4>
                    <br/><br/>
                </div>
                )
            )}
        </>
    )
}

// all the styling (css styles) are present below for each component

const useStyles = makeStyles((theme) => ({
    columnAlignDiv :{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Trebuchet MS',
      backgroundColor: 'White',
    },
    rowAlignWithButton: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    answerButton: {
        variant: "contained", 
        backgroundColor: "#49be25",
        textColor: "white",
    },
    
   }));

export default Notifs;