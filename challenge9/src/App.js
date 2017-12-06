import React, { Component } from "react";
import "./App.css";
import Camera from "./Camera";
import UploadPicture from "./UploadPicture";
import Calculate from "./Calculate";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWebcam1Inactive: true,
            isWebcam2Inactive: true,
            isUploading1: false,
            hasTwoPictures: false,
            faceURL1: null,
            faceURL2: null,
            isUserImageBlob: null,
            isCelebImageBlob: null
        }
    }

    render() {
        console.log("isUserImageBlob: " + this.state.isUserImageBlob);
        console.log("isCelebImageBlob: " + this.state.isCelebImageBlob);
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">twin validator</h1>
                    <h5 className="App-descr">Think you and your friend could be twins? <i className="em em-woman-with-bunny-ears-partying"></i> Upload your photos and find out!</h5>
                </header>
                {this.state.isUploading1 ? (
                    <UploadPicture 
                        goBackToWebcam={(isUploading) => this.useUploadedPicture(isUploading, true)} passFaceURL={(url, isBlob) => this.setUrl(url, false, isBlob)} 
                    />
                ) : (
                        <Camera 
                            changeWebcamState={(webcamState) => this.changeWebcamState(webcamState, true)}webcamState={this.state.isWebcam1Inactive} 
                            useUploadedPicture={(isUploading) => this.useUploadedPicture(isUploading, true)} 
                            passFaceURL={(url) => this.setUrl(url, false, true)} isOtherCameraOn={!this.state.isWebcam2Inactive}
                        />
                    )
                }
                {this.state.isUploading2 ? (
                    <UploadPicture 
                        goBackToWebcam={(isUploading) => this.useUploadedPicture(isUploading, false)}
                        passFaceURL={(url, isBlob) => this.setUrl(url, true, isBlob)} 
                    />
                ) : (
                    <Camera 
                        changeWebcamState={(webcamState) => this.changeWebcamState(webcamState, false)} webcamState={this.state.isWebcam2Inactive} 
                        useUploadedPicture={(isUploading) => this.useUploadedPicture(isUploading, false)} passFaceURL={(url) => this.setUrl(url, true, true)} 
                        isOtherCameraOn={!this.state.isWebcam1Inactive}
                    />
                )}
                <Calculate 
                    hasTwoPictures={this.state.hasTwoPictures} 
                    faceURL1={this.state.faceURL1} 
                    faceURL2={this.state.faceURL2} 
                    isUserImageBlob={this.state.isUserImageBlob} 
                    isCelebImageBlob={this.state.isCelebImageBlob} 
                />
            </div>
        );
    }

    useUploadedPicture(isUploading, isUser) {
        if (isUser) {
            this.setState({ isUploading1: isUploading });
        } else {
            this.setState({ isUploading2: isUploading });
        }
    }

    setUrl(url, isCelebrity, isBlob) {
        if (!isCelebrity) {
            this.setState({ 
                faceURL1: url,
                isUserImageBlob: isBlob
            });
        } else {
            this.setState({ 
                faceURL2: url,
                isCelebImageBlob: isBlob
            });
        }
        if (this.state.faceURL1 && this.state.faceURL2) {
            this.setState({ hasTwoPictures: true });
        } else {
            this.setState({ hasTwoPictures: false });
        }
    }

  changeWebcamState(webcamState, isUser) {
    if (isUser) {
        this.setState({
            isWebcam1Inactive: webcamState
        });
    } else {
        this.setState({
            isWebcam2Inactive: webcamState
        });
    }
  }
}
export default App;
