
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Camera from "./Camera";

var API_KEY = "0662a50e56ca49f7a737fcc315c536fa";
var URI_BASE = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
/*var params = {
  "returnFaceId" : "true",
  "returnFaceLandmarks" : "false",
  "returnFaceAttributes" : "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
};*/
var params = "returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=" + encodeURIComponent('age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise');
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
          <p ref="similarityCorrelation">This should change.</p>
          <button onClick={(e) => this.getFaceId(celebrityImageUrl)}>Click this</button>
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

  getFaceId(imageURL) {
    var url = URI_BASE + "?" + params;
    var faceId = "";
    var headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', API_KEY);
    headers.append('Content-Type', 'application/json');

    var request = new Request(url, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify({url: imageURL})
    })
    fetch(request).then((response) => {

      return response.json();
    })
    .then(function (json) {
      console.log(json[0].faceId);
    })
    
    // .catch((jqXHR, textStatus, errorThrown) => {
    //   var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    //   errorString += (jqXHR.responseText === "") ? "" : (JSON.parse(jqXHR.responseText).message) ? 
    //       JSON.parse(jqXHR.responseText).message : JSON.parse(jqXHR.responseText).error.message;
    //   alert(jqXHR.status);
    // });
    // this.refs.similarityCorrelation.textContent = "Face ID: " + faceId;
  }
}
export default App;
