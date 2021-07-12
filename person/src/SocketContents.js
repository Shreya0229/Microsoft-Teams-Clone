import React, { createContext, useState, useRef, useEffect } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import ReactDOM from 'react-dom';


const SocketContext =  createContext();

const webrtc = io('https://microsoft-teams-shryy.herokuapp.com/');


// Below is the total functioning of the video call part

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const otherVideo = useRef();


    //1) take permission from user to make audio and video on or true
    useEffect( () =>{
        navigator.mediaDevices.getUserMedia( { video: true, audio: true})
        .then ((currentStream) =>{
            setStream(currentStream);
            //set the Stream here to current state
            myVideo.current.srcObject = currentStream;
        })


        // setting up the unique ID and calling the other person using 'callUser' here
        webrtc.on('me', (id) => setMe(id));

        webrtc.on('callUser', ({from, name: callerName, signal }) => {
            setCall({isRecievedCall: true, from, name: callerName, signal})
        });
    }, []); 
    //  ^ empty dependency at end so it can't run always


    // using the ID passed to function below for intiating a peer connection 
    // which is using constant peer and switching it on for connection
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream});

        peer.on('signal', (data) =>{
            webrtc.emit('callUser', {userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream', (currentStream)=> {
            userVideo.current.srcObject =  currentStream;
        });

        // call is accepted signal is passed on for connection

        webrtc.on('callAccepted', (signal)=> {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };


    // for answering the call and initiating the peer stream so that people can connect

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({ initiator: false, trickle: false, stream});

        //peer is like socket or webrtc
        peer.on('signal', (data) =>{
            webrtc.emit('answerCall', {signal: data, to: call.from});
        });

        //for other person video
        peer.on('stream', (currentStream)=> {
            userVideo.current.srcObject =  currentStream;
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };


    

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();  //stop receiving inputs from user
        window.location.reload();
        //after this a new page opens
    };

    // returning the socket components for use by the jsx classes for options bar,
    // video player etc given in the component folder

    return (
        <SocketContext.Provider value= {{ call, callAccepted, myVideo, userVideo, stream, name,  setName, callEnded, me, callUser, leaveCall, answerCall }}>
            {children}
        </SocketContext.Provider>
    );
};

export {ContextProvider, SocketContext};