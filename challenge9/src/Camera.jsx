import React, { Component } from 'react';
import UploadPicture from "./UploadPicture";

var localStream;

class Camera extends Component {

    render() {
        return (
            <div className="col-md-6 col-sm-12">
                <video ref="camera" className="camera"></video>
                <canvas ref="imageHolder" className="hidden"></canvas>
                <img ref="image" src="" alt="snapshot" className="hidden" />
                {this.props.webcamState ? (
                    <div>
                        <button ref="webcamButton" onClick={(e) => this.handleWebcamButton(e)} className="btn btn-primary">Use Webcam</button>
                        <button ref="uploadPicButton" onClick={(e) => this.handleUploadButton(e)} className="btn btn-primary">Upload Picture</button>
                    </div>

                ) : (
                        <div>
                            <button ref="cancelButton" onClick={(e) => this.handleCancelButton(e)} className="btn btn-default">Cancel</button>
                            <button ref="takePicButton" onClick={(e) => this.handleTakePicButton(e)} className="btn btn-default">Take Picture</button>
                            <button ref="usePicButton" onClick={(e) => this.handleUsePicButton(e)} className="btn btn-default hidden">Use Picture</button>
                        </div>
                    )
                }
            </div>
        );
    }

    handleWebcamButton(e) {
        e.preventDefault();
        var video = this.refs.camera;
        var componentObject = this;
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                componentObject.props.onClick(false);
                localStream = stream;
            })
            .catch(function (error) {
                window.alert("Error occurred; please try again.");
            });
    }

    handleCancelButton(e) {
        e.preventDefault();
        var video = this.refs.camera;
        this.props.onClick(true);
        // takes out video streaming
        video.srcObject = null;
        // turns off camera
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
        this.refs.takePicButton.classList.add("hidden");
        this.refs.usePicButton.classList.remove("hidden");

        var canvas = this.refs.imageHolder;
        var photo = this.refs.image;
        var context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, video.width, video.height);
        var data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    }

    // give pic to api (connecting it)
    handleUsePicButton(e) {
        e.preventDefault();
    }

    handleUploadButton(e) {
        this.props.useUploadedPicture(true);
    }
}

export default Camera;