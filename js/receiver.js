'use strict';
const skylink = new Skylink();
skylink.setLogLevel(1);

skylink.on('peerJoined', (peerId, peerInfo, isSelf) => {
    if (isSelf) { return; }
    console.log('Peer joined');
});

skylink.on('incomingStream', (peerId, stream, isSelf) => {
    if (isSelf) { return; }
    const url = URL.createObjectURL(stream);
    THETA_GL.setVideoSrc(url);
    THETA_GL.startAnimate();
});

skylink.on('peerLeft', (peerId) => {
    THETA_GL.stopVideoSrc();
});

skylink.init({
    apiKey: 'a66675f5-07de-4983-aba7-a92a91dff829', // Get your own key at https://console.temasys.io
    defaultRoom: 'MyRoom'
}, (error, success) => {
  if (error) {
      console.log('Failed retrieval for room information. Error: ', error.error.message || error.error);
  } else {
      console.log('Room information has been loaded. Room is ready for user to join.');
  }
});

skylink.joinRoom({
    audio: true,
    video: false
}, (error, success) => {
    if (error) {
        console.log('Failed to join room. Error: ', error.error.message || error.error);
    } else {
        console.log('Joined room.');
    }
});

THETA_GL.init('container', true);
