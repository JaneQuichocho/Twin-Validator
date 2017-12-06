import React, { Component } from "react";
import "./App.css";
import Camera from "./Camera";
import UploadPicture from "./UploadPicture";
import Calculate from "./Calculate";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWebcamInactive: true,
            isUploading: false,
            hasTwoPictures: false,
            faceURL1: null,
            faceURL2: null,
            isUserImageBlob: null,
            isCelebImageBlob: null
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">twin validator</h1>
                    <h5 className="App-descr">Think you and your friend could be twins? <i className="em em-woman-with-bunny-ears-partying"></i> Upload your photos and find out!</h5>
                </header>
                {this.state.isUploading ? (
                    <UploadPicture goBackToWebcam={(isUploading) => this.useUploadedPicture(isUploading)} isCelebrity={false} passFaceURL={(url, isCelebrity, isBlob) => this.setUrl(url, isCelebrity, isBlob)} />
                ) : (
                        <Camera onClick={(webcamState) => this.changeWebcamState(webcamState)} webcamState={this.state.isWebcamInactive} useUploadedPicture={(isUploading) => this.useUploadedPicture(isUploading)} passFaceURL={(faceURL1) => this.setUrl(faceURL1, false, true)} />
                    )
                }
                <UploadPicture isCelebrity={true} passFaceURL={(url, isCelebrity, isBlob) => this.setUrl(url, isCelebrity, isBlob)} />
                <Calculate hasTwoPictures={this.state.hasTwoPictures} faceURL1={this.state.faceURL1} faceURL2={this.state.faceURL2} isUserImageBlob={this.state.isUserImageBlob} isCelebImageBlob={this.state.isCelebImageBlob} />
            </div>
        );
    }

    useUploadedPicture(isUploading) {
        this.setState({ isUploading: isUploading })
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

  changeWebcamState(webcamState) {
    this.setState({
      isWebcamInactive: webcamState
    });
  }
}
export default App;
