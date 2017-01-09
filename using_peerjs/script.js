navigator.getWebcam = ( navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia);

// PeerJS object ** FOR PRODUCTION, GET YOUR OWN KEY at http://peerjs.com/peerserver **

// lwjd5qra8257b9
var peer = new Peer({
    key: '2p9ffp7ol6p3nmi',
    debug: 3,
    config: {
        'iceServers': [
            {url: 'stun: stun.l.google.com:19302'},
            {url: 'stun: stun1.l.google.com:19302'},
            {url: 'turn: numb.viagenie.ca', username: "lisa@learnfromlisa.com", credential: '22paris22'}
        ]
    }
});

function step1(){
    navigator.getWebcam({audio: false, video: true}, function(stream){
        $('#my-video').prop('src', URL.createObjectURL(stream));

        window.localStream = stream;
        step2();
    }, function(){$('#step1-error').show();})
}


peer.on('open', function(){
    $('#my-id').text(peer.id);
});

peer.on('call', function(call){
    call.answer(window.localStream);
    step3(call);
});

$(function(){
    $('#make-call').click(function(){
        var call = peer.call($('#callto-id').val(), window.localStream);

        step3(call);
    });
    $('#end-call').click(function(){
        if(window.existingCall){
            window.existingCall.close();
        }
        step2();
    });

    $('#step1-retry').click(function(){
        $('#step1-error').hide();
        step1();
    })

    step1();
});

function step2(){
    $('#step1', '#step3').hide();
    $('#step2').show();
}

function step3(call){
    if(window.existingCall){
        window.existingCall.close();
    }

    call.on('stream', function(stream) {
        $('#thier-video').prop('src', URL.createObjectURL(stream));
    });
    $('#step1', '#step2').hide();
    $('#step3').show();
}





