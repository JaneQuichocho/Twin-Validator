import React, { Component } from "react";

var API_KEY = "0662a50e56ca49f7a737fcc315c536fa";
var URI_BASE = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
var URI_BASE_VERIFY = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify";
var params = "returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=" + encodeURIComponent('age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise');
var faceId1 = "";
var faceId2 = "";

class Calculate extends Component {

    render() {
        return (
            <div>
                <button ref="calculateButton" onClick={(e) => this.handleCalculateButton(e)} className="btn btn-success">Calculate Similarity!</button>
                <h4>We are % confident that these two faces are similar.</h4>
            </div>
        );
    }

    handleCalculateButton(e) {
        e.preventDefault();
        if (this.props.hasTwoPictures) {
            this.getFaceId(this.props.faceURL1, (result) => {
                if (result !== null) {
                    faceId1 = result[0].faceId;
                    console.log(faceId1);
                }
            });
            this.getFaceId(this.props.faceURL2, (result) => {
                if (result !== null) {
                    faceId2 = result[0].faceId;
                    console.log(faceId2);
                } 
                this.verifyFace(faceId1, faceId2, (result2) => {
                    console.log(result2);
                })
            });
        }
    }

    changeWebcamState(webcamState) {
        this.setState({
            isWebcamInactive: webcamState
        });
    }

    getFaceId(imageURL, callback) {
        var url = URI_BASE + "?" + params;
        var headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', API_KEY);
        headers.append('Content-Type', 'application/json');

        var request = new Request(url, {
            method: "POST",
            headers: headers,
            mode: "cors",
            body: JSON.stringify({ url: imageURL })
        })
        this.APIFetch(request, callback);
    }

    verifyFace(faceId1, faceId2, callback) {
        var url = URI_BASE_VERIFY;
        var headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', API_KEY);
        headers.append('Content-Type', 'application/json');

        var request = new Request(url, {
            method: "POST",
            headers: headers,
            mode: "cors",
            body: JSON.stringify({faceId1: faceId1, faceId2: faceId2})
        })
        this.APIFetch(request, callback);
    }

    APIFetch(request, callback) {
        var result = null;
        fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(function (json) {
                result = json;
                callback(result);
            })
            .catch((error) => {
                console.log(error.message);
                alert("Error occurred. Please try again.");
            });
    }
}

export default Calculate;