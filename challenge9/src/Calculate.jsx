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
                <h4 ref="confidenceLevel">We are % confident that these two faces are similar.</h4>
            </div>
        );
    }

    handleCalculateButton(e) {
        e.preventDefault();
        var componentObject = this;
        if (this.props.hasTwoPictures) {
            if (this.props.isUsingBlob) {
                this.getFaceIdFromBlob(this.props.faceURL1, (result, hasError) => {
                    if (!hasError) {
                        faceId1 = result[0].faceId;
                        this.getFaceId(this.props.faceURL2, (result, hasError) => {
                            if (!hasError) {
                                faceId2 = result[0].faceId;
                            }
                            if (faceId2 !== "") {
                                this.verifyFace(faceId1, faceId2, (result2, hasError) => {
                                    if (!hasError) {
                                        componentObject.refs.confidenceLevel.textContent = "We are " + (Math.round(result2.confidence * 100)) + "% confident these two faces are similar.";
                                    }
                                });
                            }
    
                        });
                    }
    
                });
            } else {
                this.getFaceIdFromBlob(this.props.faceURL1, (result, hasError) => {
                    if (!hasError) {
                        faceId1 = result[0].faceId;
                        this.getFaceId(this.props.faceURL2, (result, hasError) => {
                            if (!hasError) {
                                faceId2 = result[0].faceId;
                            }
                            if (faceId2 !== "") {
                                this.verifyFace(faceId1, faceId2, (result2, hasError) => {
                                    if (!hasError) {
                                        componentObject.refs.confidenceLevel.textContent = "We are " + (Math.round(result2.confidence * 100)) + "% confident these two faces are similar.";
                                    }
                                });
                            }
    
                        });
                    }
    
                });
            }
        }
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

    getFaceIdFromBlob(blob, callback) {
        var url = URI_BASE + "?" + params;
        var headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', API_KEY);
        headers.append('Content-Type', 'application/octet-stream');

        var request = new Request(url, {
            method: "POST",
            headers: headers,
            mode: "cors",
            body: blob
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
        fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(function (json) {
                result = json;
                callback(result, false);
            })
            .catch((error) => {
                alert("No face detected. Please try again.");
                callback(result, true);
            });
    }
}
export default Calculate;