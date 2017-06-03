var skylink = new Skylink();
skylink.setLogLevel(4);
skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});

skylink.on('incomingStream', function(peerId, stream, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  attachMediaStream(vid, stream);
});

skylink.on('peerLeft', function(peerId) {
  var vid = document.getElementById(peerId);
  document.body.removeChild(vid);
});

skylink.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});

skylink.init({
  apiKey: 'a66675f5-07de-4983-aba7-a92a91dff829', // Get your own key at https://console.temasys.io
  defaultRoom: 'test'//getRoomId()
}, function (error, success) {
  if (error) {
    document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
  } else {
       document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
    document.getElementById('start').style.display = 'block';
  }
});

function start(event) {
  event.target.style.visibility = 'hidden';
  
  skylink.joinRoom({
    audio: true,
    video: true
  }, function (error, success) {
    if (error) {
      document.getElementById('status').innerHTML = 'Failed joining room.<br>' +
  'Error: ' + (error.error.message || error.error);
    } else {
      document.getElementById('status').innerHTML = 'Joined room.';
    }
  });
}


/* Helper functions */

function getRoomId() {
  var roomId = document.cookie.match(/roomId=([a-z0-9-]{36})/);
  if(roomId) {
    return roomId[1];
  }
  else {
    roomId = skylink.generateUUID();
    var date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    document.cookie = 'roomId=' + roomId + '; expires=' + date.toGMTString() + '; path=/';
    return roomId;
  }
};
