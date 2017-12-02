import React, { Component } from 'react';


class Camera extends Component {

    render() {
        return (
            <div className="col-md-6 col-sm-12">
                <video ref="camera" className="camera"></video>
                {this.props.webcamState && (
                    <button ref="webcamButton" onClick={(e) => this.handleButtonClick(e)} className="btn btn-primary">Use Webcam</button>
                )}
            </div>
        );
    }

    handleButtonClick(e) {
        e.preventDefault();
        var video = this.refs.camera;
        var componentObject = this;
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                componentObject.props.onClick(false);
            })
            .catch(function (error) {
                console.log("An error occured! " + error);
            });
    }

}

export default Camera;