import React from "react";
import "./Lectures.scss";
class Lectures extends React.Component {
    componentDidMount(){
        const peerConnections = {};
const configg = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};

const socket = window.io.connect(window.location.origin);

socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
});

socket.on("watcher", (id) => {
  const peerConnection = new RTCPeerConnection(configg);
  peerConnections[id] = peerConnection;

  let stream = videoElement.srcObject;
  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };

  peerConnection
    .createOffer()
    .then((sdp) => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("offer", id, peerConnection.localDescription);
    });
});

socket.on("candidate", (id, candidate) => {
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on("disconnectPeer", (id) => {
  peerConnections[id].close();
  delete peerConnections[id];
});

window.onunload = window.onbeforeunload = () => {
  socket.close();
};

// Get camera and microphone
const videoElement = document.querySelector("video");
const audioSelect = document.querySelector("select#audioSource");
const videoSelect = document.querySelector("select#videoSource");

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream().then(getDevices).then(gotDevices);

function getDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos;
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "audioinput") {
      option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === "videoinput") {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    video: { deviceId: videoSource ? { exact: videoSource } : undefined },
  };
  return navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

function gotStream(stream) {
  window.stream = stream;
  audioSelect.selectedIndex = [...audioSelect.options].findIndex(
    (option) => option.text === stream.getAudioTracks()[0].label
  );
  videoSelect.selectedIndex = [...videoSelect.options].findIndex(
    (option) => option.text === stream.getVideoTracks()[0].label
  );
  videoElement.srcObject = stream;
  socket.emit("broadcaster");
}

function handleError(error) {
  console.error("Error: ", error);
}

        var isbroadcaster = false;
        var conference = function (config) {
          if (
            typeof window.adapter === "undefined" ||
            typeof window.adapter.browserDetails === "undefined"
          ) {
            console.warn("adapter.js is recommended.");
          } else {
            window.adapter = {
              browserDetails: {
                browser: "chrome",
              },
            };
          }
        
          var self = {
              userToken: uniqueToken(),
            },
            channels = "--",
            isGetNewRoom = true,
            participants = 0,
            defaultSocket = {};
        
          var sockets = [];
        
          function openDefaultSocket() {
            defaultSocket = config.openSocket({
              onmessage: defaultSocketResponse,
              callback: function (socket) {
                defaultSocket = socket;
              },
            });
          }
        
          function defaultSocketResponse(response) {
            if (response.userToken == self.userToken) return;
        
            if (isGetNewRoom && response.roomToken && response.broadcaster)
              config.onRoomFound(response);
        
            if (response.newParticipant) onNewParticipant(response.newParticipant);
        
            if (
              response.userToken &&
              response.joinUser == self.userToken &&
              response.participant &&
              channels.indexOf(response.userToken) == -1
            ) {
              channels += response.userToken + "--";
              openSubSocket({
                isofferer: true,
                channel: response.channel || response.userToken,
                closeSocket: true,
              });
            }
          }
        
          function openSubSocket(_config) {
            if (!_config.channel) return;
            var socketConfig = {
              channel: _config.channel,
              onmessage: socketResponse,
              onopen: function () {
                if (isofferer && !peer) initPeer();
                sockets[sockets.length] = socket;
              },
            };
        
            socketConfig.callback = function (_socket) {
              socket = _socket;
              this.onopen();
            };
        
            var socket = config.openSocket(socketConfig),
              isofferer = _config.isofferer,
              gotstream,
              htmlElement = document.createElement("video"),
              inner = {},
              peer;
        
            var peerConfig = {
              oniceconnectionstatechange: function (p) {
                if (!isofferer) return;
        
                if (p && p.iceConnectionState) {
                  config.oniceconnectionstatechange(p.iceConnectionState);
                }
              },
              attachStream: config.attachStream,
              onICE: function (candidate) {
                socket &&
                  socket.send({
                    userToken: self.userToken,
                    candidate: {
                      sdpMLineIndex: candidate.sdpMLineIndex,
                      candidate: JSON.stringify(candidate.candidate),
                    },
                  });
              },
              onRemoteStream: function (stream) {
                if (isbroadcaster) return;
        
                try {
                  htmlElement.setAttributeNode(document.createAttribute("autoplay"));
                  htmlElement.setAttributeNode(document.createAttribute("playsinline"));
                  htmlElement.setAttributeNode(document.createAttribute("controls"));
                } catch (e) {
                  htmlElement.setAttribute("autoplay", true);
                  htmlElement.setAttribute("playsinline", true);
                  htmlElement.setAttribute("controls", true);
                }
        
                htmlElement.srcObject = stream;
        
                _config.stream = stream;
                afterRemoteStreamStartedFlowing();
              },
            };
        
            function initPeer(offerSDP) {
              if (!offerSDP) peerConfig.onOfferSDP = sendsdp;
              else {
                peerConfig.offerSDP = offerSDP;
                peerConfig.onAnswerSDP = sendsdp;
              }
              peer = RTCPeerConnectionHandler(peerConfig);
            }
        
            function afterRemoteStreamStartedFlowing() {
              gotstream = true;
        
              config.onRemoteStream({
                video: htmlElement,
              });
        
              /* closing sub-socket here on the offerer side */
              if (_config.closeSocket) socket = null;
            }
        
            function sendsdp(sdp) {
              sdp = JSON.stringify(sdp);
              var part = parseInt(sdp.length / 3);
        
              var firstPart = sdp.slice(0, part),
                secondPart = sdp.slice(part, sdp.length - 1),
                thirdPart = "";
        
              if (sdp.length > part + part) {
                secondPart = sdp.slice(part, part + part);
                thirdPart = sdp.slice(part + part, sdp.length);
              }
        
              socket &&
                socket.send({
                  userToken: self.userToken,
                  firstPart: firstPart,
                });
        
              socket &&
                socket.send({
                  userToken: self.userToken,
                  secondPart: secondPart,
                });
        
              socket &&
                socket.send({
                  userToken: self.userToken,
                  thirdPart: thirdPart,
                });
            }
        
            function socketResponse(response) {
              if (response.userToken == self.userToken) return;
              if (response.firstPart || response.secondPart || response.thirdPart) {
                if (response.firstPart) {
                  inner.firstPart = response.firstPart;
                  if (inner.secondPart && inner.thirdPart) selfInvoker();
                }
                if (response.secondPart) {
                  inner.secondPart = response.secondPart;
                  if (inner.firstPart && inner.thirdPart) selfInvoker();
                }
        
                if (response.thirdPart) {
                  inner.thirdPart = response.thirdPart;
                  if (inner.firstPart && inner.secondPart) selfInvoker();
                }
              }
        
              if (response.candidate && !gotstream) {
                peer &&
                  peer.addICE({
                    sdpMLineIndex: response.candidate.sdpMLineIndex,
                    candidate: JSON.parse(response.candidate.candidate),
                  });
              }
        
              if (response.left) {
                participants--;
                if (isofferer && config.onNewParticipant)
                  config.onNewParticipant(participants);
        
                if (peer && peer.peer) {
                  peer.peer.close();
                  peer.peer = null;
                }
              }
            }
        
            var invokedOnce = false;
        
            function selfInvoker() {
              if (invokedOnce) return;
        
              invokedOnce = true;
        
              inner.sdp = JSON.parse(
                inner.firstPart + inner.secondPart + inner.thirdPart
              );
              if (isofferer && inner.sdp.type == "answer") {
                peer.addAnswerSDP(inner.sdp);
                participants++;
                if (config.onNewParticipant) config.onNewParticipant(participants);
              } else initPeer(inner.sdp);
            }
          }
        
          function leave() {
            var length = sockets.length;
            for (var i = 0; i < length; i++) {
              var socket = sockets[i];
              if (socket) {
                socket.send({
                  left: true,
                  userToken: self.userToken,
                });
                delete sockets[i];
              }
            }
        
            // if owner leaves; try to remove his room from all other users side
            if (isbroadcaster) {
              defaultSocket.send({
                left: true,
                userToken: self.userToken,
                roomToken: self.roomToken,
              });
            }
        
            if (config.attachStream) config.attachStream.stop();
          }
        
          window.addEventListener(
            "beforeunload",
            function () {
              leave();
            },
            false
          );
        
          window.addEventListener(
            "keyup",
            function (e) {
              if (e.keyCode == 116) leave();
            },
            false
          );
        
          function startBroadcasting() {
            defaultSocket &&
              defaultSocket.send({
                roomToken: self.roomToken,
                roomName: self.roomName,
                broadcaster: self.userToken,
              });
            setTimeout(startBroadcasting, 3000);
          }
        
          function onNewParticipant(channel) {
            if (
              !channel ||
              channels.indexOf(channel) != -1 ||
              channel == self.userToken
            )
              return;
            channels += channel + "--";
        
            var new_channel = uniqueToken();
            openSubSocket({
              channel: new_channel,
              closeSocket: true,
            });
        
            defaultSocket.send({
              participant: true,
              userToken: self.userToken,
              joinUser: channel,
              channel: new_channel,
            });
          }
        
          function uniqueToken() {
            return Math.random().toString(36).substr(2, 35);
          }
        
          openDefaultSocket();
          return {
            createRoom: function (_config) {
              self.roomName = _config.roomName || "Anonymous";
              self.roomToken = uniqueToken();
        
              isbroadcaster = true;
              isGetNewRoom = false;
              startBroadcasting();
            },
            joinRoom: function (_config) {
              self.roomToken = _config.roomToken;
              isGetNewRoom = false;
        
              openSubSocket({
                channel: self.userToken,
              });
        
              defaultSocket.send({
                participant: true,
                userToken: self.userToken,
                joinUser: _config.joinUser,
              });
            },
          };
        };
        

        // RTCPeerConnection-v1.5.js
        
        var iceServers = [];
        
        if (typeof IceServersHandler !== "undefined") {
          iceServers = window.IceServersHandler.getIceServers();
        }
        
        iceServers = {
          iceServers: iceServers,
          iceTransportPolicy: "all",
          bundlePolicy: "max-bundle",
          iceCandidatePoolSize: 0,
        };
        
        if (window.adapter.browserDetails.browser !== "chrome") {
          iceServers = {
            iceServers: iceServers.iceServers,
          };
        }
        
        var dontDuplicateOnAddTrack = {};
        
        function RTCPeerConnectionHandler(options) {
          var w = window,
            PeerConnection =
              w.RTCPeerConnection ||
              w.mozRTCPeerConnection ||
              w.webkitRTCPeerConnection,
            SessionDescription = w.RTCSessionDescription || w.mozRTCSessionDescription,
            IceCandidate = w.RTCIceCandidate || w.mozRTCIceCandidate;
        
          var peer = new PeerConnection(iceServers);
        
          peer.onicecandidate = function (event) {
            if (event.candidate) options.onICE(event.candidate);
          };
        
          // attachStream = MediaStream;
          if (options.attachStream) {
            if ("addStream" in peer) {
              peer.addStream(options.attachStream);
            } else if ("addTrack" in peer) {
              options.attachStream.getTracks().forEach(function (track) {
                peer.addTrack(track, options.attachStream);
              });
            } else {
              throw new Error("WebRTC addStream/addTrack is not supported.");
            }
          }
        
          // attachStreams[0] = audio-stream;
          // attachStreams[1] = video-stream;
          // attachStreams[2] = screen-capturing-stream;
          if (options.attachStreams && options.attachStream.length) {
            var streams = options.attachStreams;
            for (var i = 0; i < streams.length; i++) {
              var stream = streams[i];
        
              if ("addStream" in peer) {
                peer.addStream(stream);
              } else if ("addTrack" in peer) {
                stream.getTracks().forEach(function (track) {
                  peer.addTrack(track, stream);
                });
              } else {
                throw new Error("WebRTC addStream/addTrack is not supported.");
              }
            }
          }
        
          if ("addStream" in peer) {
            peer.onaddstream = function (event) {
              var remoteMediaStream = event.stream;
        
              // onRemoteStreamEnded(MediaStream)
              addStreamStopListener(remoteMediaStream, function () {
                if (options.onRemoteStreamEnded)
                  options.onRemoteStreamEnded(remoteMediaStream);
              });
        
              // onRemoteStream(MediaStream)
              if (options.onRemoteStream) options.onRemoteStream(remoteMediaStream);
        
              console.debug("on:add:stream", remoteMediaStream);
            };
          } else if ("addTrack" in peer) {
            peer.ontrack = peer.onaddtrack = function (event) {
              event.stream = event.streams[event.streams.length - 1];
        
              if (
                dontDuplicateOnAddTrack[event.stream.id] &&
                window.adapter.browserDetails.browser !== "safari"
              )
                return;
              dontDuplicateOnAddTrack[event.stream.id] = true;
        
              var remoteMediaStream = event.stream;
        
              // onRemoteStreamEnded(MediaStream)
              addStreamStopListener(remoteMediaStream, function () {
                if (options.onRemoteStreamEnded)
                  options.onRemoteStreamEnded(remoteMediaStream);
              });
        
              // onRemoteStream(MediaStream)
              if (options.onRemoteStream) options.onRemoteStream(remoteMediaStream);
        
              console.debug("on:add:stream", remoteMediaStream);
            };
          } else {
            throw new Error("WebRTC addStream/addTrack is not supported.");
          }
        
          var sdpConstraints = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
          };
        
          if (isbroadcaster) {
            sdpConstraints = {
              OfferToReceiveAudio: false,
              OfferToReceiveVideo: false,
            };
          }
        
          // onOfferSDP(RTCSessionDescription)
        
          function createOffer() {
            if (!options.onOfferSDP) return;
        
            peer
              .createOffer(sdpConstraints)
              .then(function (sessionDescription) {
                sessionDescription.sdp = setBandwidth(sessionDescription.sdp);
                peer
                  .setLocalDescription(sessionDescription)
                  .then(function () {
                    options.onOfferSDP(sessionDescription);
                  })
                  .catch(onSdpError);
              })
              .catch(onSdpError);
          }
        
          // onAnswerSDP(RTCSessionDescription)
        
          function createAnswer() {
            if (!options.onAnswerSDP) return;
        
            //options.offerSDP.sdp = addStereo(options.offerSDP.sdp);
            peer
              .setRemoteDescription(new SessionDescription(options.offerSDP))
              .then(function () {
                peer
                  .createAnswer(sdpConstraints)
                  .then(function (sessionDescription) {
                    sessionDescription.sdp = setBandwidth(sessionDescription.sdp);
                    peer
                      .setLocalDescription(sessionDescription)
                      .then(function () {
                        options.onAnswerSDP(sessionDescription);
                      })
                      .catch(onSdpError);
                  })
                  .catch(onSdpError);
              })
              .catch(onSdpError);
          }
        
          function setBandwidth(sdp) {
            if (window.adapter.browserDetails.browser === "firefox") return sdp;
            if (window.adapter.browserDetails.browser === "safari") return sdp;
            if (isEdge) return sdp;
        

            if (typeof CodecsHandler !== "undefined") {
              sdp = window.CodecsHandler.preferCodec(sdp, "vp9");
            }
        

            if (typeof BandwidthHandler !== "undefined") {
              window.isFirefox = window.adapter.browserDetails.browser === "firefox";
        
              var bandwidth = {
                screen: 512, // 300kbits minimum
                video: 512, // 256kbits (both min-max)
              };
              var isScreenSharing = false;
        
              sdp = window.BandwidthHandler.setApplicationSpecificBandwidth(
                sdp,
                bandwidth,
                isScreenSharing
              );
              sdp = window.BandwidthHandler.setVideoBitrates(sdp, {
                min: bandwidth.video,
                max: bandwidth.video,
              });
              return sdp;
            }
        
            // removing existing bandwidth lines
            sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
        
            // "300kbit/s" for screen sharing
            sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:300\r\n");
        
            return sdp;
          }
        
          peer.isConnected = false;
          peer.oniceconnectionstatechange = peer.onsignalingstatechange = function () {
            if (peer && peer.isConnected && peer.iceConnectionState == "failed") return;
            options.oniceconnectionstatechange(peer);
          };
        
          createOffer();
          createAnswer();
        
          function onSdpError(e) {
            console.error("sdp error:", JSON.stringify(e, null, "\t"));
          }
        
          return {
            addAnswerSDP: function (sdp) {
              console.log("setting remote description", sdp.sdp);
              peer
                .setRemoteDescription(new SessionDescription(sdp))
                .catch(onSdpError)
                .then(function () {
                  peer.isConnected = true;
                });
            },
            addICE: function (candidate) {
              console.log("adding candidate", candidate.candidate);
        
              peer.addIceCandidate(
                new IceCandidate({
                  sdpMLineIndex: candidate.sdpMLineIndex,
                  candidate: candidate.candidate,
                })
              );
            },
        
            peer: peer,
          };
        }
        
        var isEdge =
          navigator.userAgent.indexOf("Edge") !== -1 &&
          (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
        
        // getUserMedia
        var video_constraints = {
          mandatory: {},
          optional: [],
        };
        
        function getUserMedia(options) {
          function streaming(stream) {
            if (typeof options.onsuccess === "function") {
              options.onsuccess(stream);
            }
        
            media = stream;
          }
        
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
              .getUserMedia(
                options.constraints || {
                  audio: false,
                  video: video_constraints,
                }
              )
              .then(streaming)
              .catch(
                options.onerror ||
                  function (e) {
                    console.error(e);
                  }
              );
            return;
          }
        
          var n = navigator,
            media;
          n.getMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
          n.getMedia(
            options.constraints || {
              audio: true,
              video: video_constraints,
            },
            streaming,
            options.onerror ||
              function (e) {
                console.error(e);
              }
          );
        
          return media;
        }
        
        function addStreamStopListener(stream, callback) {
          stream.addEventListener(
            "ended",
            function () {
              callback();
              callback = function () {};
            },
            false
          );
          stream.addEventListener(
            "inactive",
            function () {
              callback();
              callback = function () {};
            },
            false
          );
          stream.getTracks().forEach(function (track) {
            track.addEventListener(
              "ended",
              function () {
                callback();
                callback = function () {};
              },
              false
            );
            track.addEventListener(
              "inactive",
              function () {
                callback();
                callback = function () {};
              },
              false
            );
          });
        }
              var   config = {
                    openSocket: function(config) {
                        var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/';
        
                        config.channel = config.channel || window.location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
                        var sender = Math.round(Math.random() * 999999999) + 999999999;
        
                        window.io.connect(SIGNALING_SERVER).emit('new-channel', {
                            channel: config.channel,
                            sender: sender
                        });
        
                        var socket = window.io.connect(SIGNALING_SERVER + config.channel);
                        socket.channel = config.channel;
                        socket.on('connect', function () {
                            if (config.callback) config.callback(socket);
                        });
        
                        socket.send = function (message) {
                            socket.emit('message', {
                                sender: sender,
                                data: message
                            });
                        };
        
                        socket.on('message', config.onmessage);
                    },
                    onRemoteStream: function(media) {
                        if(window.isbroadcaster) return;
        
                        var video = media.video;
                        videosContainer.insertBefore(video, videosContainer.firstChild);
                        rotateVideo(video);
        
                        document.querySelector('.hide-after-join').style.display = 'none';
                    },
                    onRoomFound: function(room) {
                        if(window.isbroadcaster) return;
        
                        conferenceUI.joinRoom({
                            roomToken: room.roomToken,
                            joinUser: room.broadcaster
                        });
        
                        document.querySelector('.hide-after-join').innerHTML = '<img src="https://www.webrtc-experiment.com/images/key-press.gif" style="margint-top:10px; width:50%;" />';
                    },
                    onNewParticipant: function(numberOfParticipants) {
                        var text = numberOfParticipants + ' users are viewing your screen!';
                        
                        if(numberOfParticipants <= 0) {
                            text = 'No one is viewing your screen YET.';
                        }
                        else if(numberOfParticipants == 1) {
                            text = 'Only one user is viewing your screen!';
                        }
        
                        document.title = text;
                        showErrorMessage(document.title, 'green');
                    },
                    oniceconnectionstatechange: function(state) {
                        var text = '';
        
                        if(state == 'closed' || state == 'disconnected') {
                            text = 'One of the participants just left.';
                            document.title = text;
                            showErrorMessage(document.title);
                        }
        
                        if(state == 'failed') {
                            text = 'Failed to bypass Firewall rules. It seems that target user did not receive your screen. Please ask him reload the page and try again.';
                            document.title = text;
                            showErrorMessage(document.title);
                        }
        
                        if(state == 'connected' || state == 'completed') {
                            text = 'A user successfully received your screen.';
                            document.title = text;
                            showErrorMessage(document.title, 'green');
                        }
        
                        if(state == 'new' || state == 'checking') {
                            text = 'Someone is trying to join you.';
                            document.title = text;
                            showErrorMessage(document.title, 'green');
                        }
                    }
                }
        
                function showErrorMessage(error, color) {
                    var errorMessage = document.querySelector('#logs-message');
                    errorMessage.style.color = color || 'red';
                    errorMessage.innerHTML = error;
                    errorMessage.style.display = 'block';
                }
        
                function getDisplayMediaError(error) {
                    if (window.location.protocol === 'http:') {
                        showErrorMessage('Please test this WebRTC experiment on HTTPS.');
                    } else {
                        showErrorMessage(error.toString());
                    }
                }
        
                function captureUserMedia(callback) {
                    var video = document.createElement('video');
                    video.muted = true;
                    video.volume = 0;
                    try {
                        video.setAttributeNode(document.createAttribute('autoplay'));
                        video.setAttributeNode(document.createAttribute('playsinline'));
                        video.setAttributeNode(document.createAttribute('controls'));
                    } catch (e) {
                        video.setAttribute('autoplay', true);
                        video.setAttribute('playsinline', true);
                        video.setAttribute('controls', true);
                    }
        
                    if(navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
                        function onGettingSteam(stream) {
                            video.srcObject = stream;
                            videosContainer.insertBefore(video, videosContainer.firstChild);
        
                            window.addStreamStopListener(stream, function() {
                                window.location.reload();
                            });
        
                            config.attachStream = stream;
                            callback && callback();
                            rotateVideo(video);
        
                            window.addStreamStopListener(stream, function() {
                                window.location.reload();
                            });
        
                            showPrivateLink();
        
                            document.querySelector('.hide-after-join').style.display = 'block';
                        }
        
                        if(navigator.mediaDevices.getDisplayMedia) {
                            navigator.mediaDevices.getDisplayMedia({video: true}).then(stream => {
                                onGettingSteam(stream);
                            }, getDisplayMediaError).catch(getDisplayMediaError);
                        }
                        else if(navigator.getDisplayMedia) {
                            navigator.getDisplayMedia({video: true}).then(stream => {
                                onGettingSteam(stream);
                            }, getDisplayMediaError).catch(getDisplayMediaError);
                        }
                    }
                    else {
                        if (window.DetectRTC.browser.name === 'Chrome') {
                            if (window.DetectRTC.browser.version == 71) {
                                showErrorMessage('Please enable "Experimental WebPlatform" flag via chrome://flags.');
                            } else if (window.DetectRTC.browser.version < 71) {
                                showErrorMessage('Please upgrade your Chrome browser.');
                            } else {
                                showErrorMessage('Please make sure that you are not using Chrome on iOS.');
                            }
                        }
        
                        if (window.DetectRTC.browser.name === 'Firefox') {
                            showErrorMessage('Please upgrade your Firefox browser.');
                        }
        
                        if (window.DetectRTC.browser.name === 'Edge') {
                            showErrorMessage('Please upgrade your Edge browser.');
                        }
        
                        if (window.DetectRTC.browser.name === 'Safari') {
                            showErrorMessage('Safari does NOT supports getDisplayMedia API yet.');
                        }
                    }
                }
                var conferenceUI = conference(config);
        
                /* UI specific */
                var videosContainer = document.getElementById("videos-container") || document.body;
        
                document.getElementById('share-screen').onclick = function() {
                    var roomName = document.getElementById('room-name') || { };
                    roomName.disabled = true;
                    captureUserMedia(function() {
                        conferenceUI.createRoom({
                            roomName: (roomName.value || 'Anonymous') + ' shared his screen with you'
                        });
                    });
                    this.disabled = true;
                    document.getElementById('share-screen').style.visibility = 'hidden';
                    var elem = document.getElementById('share-screen');
                    elem.parentNode.removeChild(elem);
                    
                };
        
                function rotateVideo(video) {
                    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
                    setTimeout(function() {
                        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
                        video.style = 'width: 480px;';
                        video.style = 'height: 480px;';
                    }, 1000);
                }
        
                function showPrivateLink() {
                    var uniqueToken = document.getElementById('unique-token');
                    uniqueToken.innerHTML = '<a class="sharelink" href="' + window.location.href + '" target="_blank"> Share This Room </a>';
                    
                } 
                
    } 
    render() {
             
return(
<>
    <div className="flex">
<div className="experiment">
<section className="hide-after-join">                    
<button id="share-screen" className="setup">Share Your Screen</button></section>

<div id="videos-container" />


<small id="send-message"></small>
<div id="logs-message"></div>
</div>
<video className="videop" playsInline autoPlay></video>   
</div>

<section id="unique-token" />
<div className="flex1">
     <section className="select">
      <label htmlFor="audioSource">Audio source: </label>
      <select id="audioSource"></select>
    </section>

    <section className="select">
      <label htmlFor="videoSource">Video source: </label>
      <select id="videoSource"></select>
    </section>
    </div>
</>
)
    }
  }

  export default Lectures;