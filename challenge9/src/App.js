
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Camera from "./Camera";

var API_KEY = "77e715f694904815b1de41f852ea82df";
var URI_BASE = "https://azure.microsoft.com/en-us/try/cognitive-services/?api=face-api";
var params = {
  "returnFaceId": "true",
  "returnFaceLandmarks": "false",
  "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
};
var userImageUrl = "photo.jpg";
var celebrityImageUrl = "https://www.billboard.com/files/media/beyonce-grammys-red-carpet-billboard-1548.jpg";

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
        <div>
          {/* <p ref="similarityCorrelation">This should change.</p>
          <button onClick={(e) => this.getSimilarityCorrelation(userImageUrl)}>Click this</button> */}
        </div>
        <Camera onClick={(webcamState) => this.changeWebcamState(webcamState)} webcamState={this.state.isWebcamInactive} />
      </div>
    );
  }
  changeWebcamState(webcamState) {
    this.setState({
      isWebcamInactive: webcamState
    });
  }
  /*getSimilarityCorrelation(imageURL) {
    var url = URI_BASE + "?" + JSON.stringify(params);
    var faceId = "";
    fetch(url, {
      url: URI_BASE + "?" + JSON.stringify(params),
      headers: new Headers({
        "Content-type" : "application/json",
        "Ocp-Apim-Subscription-Key" : API_KEY
      }),
      type: "POST",
      data: '{"url": ' + '"' + imageURL + '"}',
      mode: "no-cors"
    }).then((responseJson) => {
      faceId = JSON.stringify(responseJson);
      console.log(faceId);
    }).catch((jqXHR, textStatus, errorThrown) => {
      var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" : (JSON.parse(jqXHR.responseText).message) ? 
          JSON.parse(jqXHR.responseText).message : JSON.parse(jqXHR.responseText).error.message;
      alert(jqXHR.status);
    });
    this.refs.similarityCorrelation.textContent = "Face ID: " + faceId;
  }*/
}
export default App;
