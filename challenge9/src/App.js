import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Camera from "./Camera";
import UploadPicture from "./UploadPicture";

var API_KEY = "0662a50e56ca49f7a737fcc315c536fa";
var URI_BASE = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
var URI_BASE_VERIFY = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify";
/*var params = {
  "returnFaceId" : "true",
  "returnFaceLandmarks" : "false",
  "returnFaceAttributes" : "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
};*/
var params = "returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=" + encodeURIComponent('age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise');
var userImageUrl = "https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/beyonce-hero-487073444_copy.jpg?itok=RTg0LU3d";
var celebrityImageUrl = "https://www.billboard.com/files/media/beyonce-grammys-red-carpet-billboard-1548.jpg";
var faceId1 = "";
var faceId2 = "";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWebcamInactive: true
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Who's Your Celebrity Doppleganger?</h1>
                </header>
                {/* <div>
          <p ref="similarityCorrelation">This should change.</p>
          <button onClick={(e) => this.getFaceId(celebrityImageUrl)}>Click this</button>
        </div> */}
                <Camera onClick={(webcamState) => this.changeWebcamState(webcamState)} webcamState={this.state.isWebcamInactive} />
                <button onClick={() => this.getFaceId(userImageUrl, true)}>TEST</button>
                <UploadPicture />
            </div>
        );
    }

    changeWebcamState(webcamState) {
        this.setState({
            isWebcamInactive: webcamState
        });
    }

    getFaceId(imageURL, isFaceId1) {
        var url = URI_BASE + "?" + params;
        var faceId = "";
        var headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', API_KEY);
        headers.append('Content-Type', 'application/json');

        var request = new Request(url, {
            method: "POST",
            headers: headers,
            mode: "cors",
            body: JSON.stringify({ url: imageURL })
        })
        if (isFaceId1) {
            faceId1 = this.APIFetch(request);
            console.log(faceId1);
        } else {
            faceId2 = this.APIFetch(request);
            console.log("faceId2");
        }
    }

    verifyFace(faceId1, faceId2) {
        var url = URI_BASE_VERIFY + "?" + params;
        var headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', API_KEY);
        headers.append('Content-Type', 'application/json');

        var request = new Request(url, {
            method: "POST",
            headers: headers,
            mode: "cors",
            faceId1: faceId1,
            faceId2: faceId2
        })
        this.APIFetch(request);
    }

    APIFetch(request) {
        var result = "";
        fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(function (json) {
                result = json[0].faceId;
            })
            .catch(() => {
                alert("Error occured. Please try again.");
                return result;
            });
    }
}
export default App;
