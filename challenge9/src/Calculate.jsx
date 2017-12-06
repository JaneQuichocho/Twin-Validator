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
            <div className="buttonDiv">
                <button ref="calculateButton" onClick={(e) => this.handleCalculateButton(e)} className="btnCalculate">Calculate Similarity!</button>
                <h4 ref="confidenceLevel"></h4>
                <progress className="hidden" ref="progress"></progress>
            </div>
        );
    }

    handleCalculateButton(e) {
        e.preventDefault();
        var componentObject = this;
        if (this.props.hasTwoPictures) {
            this.getFaceId(this.props.faceURL1, this.props.isUserImageBlob, (result, hasError) => {
                if (!hasError) {
                    faceId1 = result[0].faceId;
                    this.getFaceId(this.props.faceURL2, this.props.isCelebImageBlob, (result, hasError) => {
                        if (!hasError) {
                            faceId2 = result[0].faceId;
                        }
                        if (faceId2 !== "") {
                            this.verifyFace(faceId1, faceId2, (result2, hasError) => {
                                if (!hasError) {
                                    componentObject.refs.confidenceLevel.innerHTML = "There's a <span class=\"confidencePercentage\">" + (Math.round(result2.confidence * 100)) + "%</span> chance that you could pass off as twins.";
                                }
                            });
                        }
                    });
                }
            });
        } else {
            alert("You must upload 2 pictures before performing calculation.");
        }
    }

    getFaceId(urlOrBlob, isBlob, callback) {
        var headers = new Headers();
        var contentType = "application/json";
        var requestBody = JSON.stringify({ url: urlOrBlob });
        if (isBlob) {
            contentType = "application/octet-stream";
            requestBody = urlOrBlob;
            headers.append("Content-Length", urlOrBlob.size);
        }
        
        var url = URI_BASE + "?" + params;
        headers.append('Ocp-Apim-Subscription-Key', API_KEY);
        headers.append('Content-Type', contentType);

        var request = new Request(url, {
            method: "POST",
            headers: headers,
            mode: "cors",
            body: requestBody
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
            body: JSON.stringify({ faceId1: faceId1, faceId2: faceId2 })
        })
        this.APIFetch(request, callback);
    }

    APIFetch(request, callback) {
        var result = null;
        var componentObject = this;
        fetch(request)
            .then((response) => {
                componentObject.refs.progress.classList.remove("hidden");
                return response.json();
            })
            .then(function (json) {
                componentObject.refs.progress.classList.add("hidden");
                result = json;
                callback(result, false);
            })
            .catch((error) => {
                alert("No face detected. Please try again.");
                componentObject.refs.progress.classList.add("hidden");
                console.log(error.message);
                callback(result, true);
            });
    }
}
export default Calculate;