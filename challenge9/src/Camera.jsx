import React, { Component } from 'react';

var localStream;

class Camera extends Component {

    render() {
        return (
            <div className="col-md-6 col-sm-12">
                {this.props.isCelebrity ? (<h3 className="photo">Other Photo</h3>) : (<h3 className="photo">Your Photo</h3>)}
                <div className="cameraDiv" ref="cameraDiv">
                    <video ref="camera" className="camera"></video>
                </div>
                <img ref="image" src="" alt="snapshot" className="hidden" />
                <div ref="controls1">
                    {!this.props.isOtherCameraOn && (
                        <button ref="webcamButton" onClick={(e) => this.handleWebcamButton(e)} className="btn btn-primary">Use Webcam</button>
                    )}
                    <button ref="uploadPicButton" onClick={(e) => this.handleUploadButton(e)} className="btn btn-primary">Input Picture URL</button>
                </div>
                <div ref="controls2" className="hidden">
                    <button ref="cancelButton" onClick={(e) => this.handleCancelButton(e)} className="btn btn-default">Cancel</button>
                    <button ref="takePicButton" onClick={(e) => this.handleTakePicButton(e)} className="btn btn-default">Take Picture</button>
                </div>
            </div>
        );
    }

    handleWebcamButton(e) {
        e.preventDefault();
        var video = this.refs.camera;
        var componentObject = this;
        this.refs.controls1.classList.add("hidden");
        this.refs.controls2.classList.remove("hidden");
        this.refs.takePicButton.classList.remove("hidden");
        this.refs.cameraDiv.classList.add("remove-background");
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                componentObject.props.changeWebcamState(false);
                localStream = stream;
            })
            .catch(function (error) {
                window.alert("Error occured. Please try again.");
                console.log(error.message);
            }); 
    }

    handleCancelButton(e) {
        e.preventDefault();
        this.refs.cameraDiv.classList.remove("remove-background");
        var video = this.refs.camera;
        this.props.changeWebcamState(true);
        video.srcObject = null;
        this.refs.controls1.classList.remove("hidden");
        this.refs.controls2.classList.add("hidden");
        localStream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    handleTakePicButton(e) {
        e.preventDefault();
        var video = this.refs.camera;
        video.pause();
        localStream.getTracks().forEach(function (track) {
            track.stop();
        });
        this.props.changeWebcamState(true);

        this.refs.takePicButton.classList.add("hidden");
        var canvas = document.createElement("canvas");
        canvas.setAttribute("height", video.clientHeight);
        canvas.setAttribute("width", video.clientWidth);
        var photo = this.refs.image;
        var context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        var data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);

        canvas.toBlob((blob) => {
            this.props.passFaceURL(blob);
        })
        
    }

    handleUploadButton(e) {
        this.props.useUploadedPicture(true);
    }
}

export default Camera;