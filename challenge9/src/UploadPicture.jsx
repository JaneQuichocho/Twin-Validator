import React, { Component } from 'react';

class UploadPicture extends Component {
    render() {
        return (
            <div className="col-md-6 col-sm-12">
                {this.props.isCelebrity ? (<h3 className="photo">Other Photo</h3>) : (<h3 className="photo">Your Photo</h3>)}
                <div className="cameraDiv"><img id="celebrity" alt="Please upload valid image URL" ref="uploadImage" src="https://www.eldersinsurance.com.au/images/person1.png?width=368&height=278&crop=1"/></div>
                <form>
                    <input type="text" ref="textBox" placeholder="Image URL" />
                    <button ref="SubmitButton" type="submit" onClick={(e) => this.handleUploadButton(e)} className="btn btn-primary">Submit</button>
                    <input type="file" ref="fileUpload" onChange={(e) => this.handleUploadImage(e)} />
                    <button id="goBack" ref="GoBack" type="goBack" onClick={(e) => this.handleGoBackButton(e)} className="btn btn-primary">Go Back</button>
                </form>
            </div>
        );
    }

    handleUploadImage(e) {
        e.preventDefault();
        var reader = new FileReader();
        var componentObject = this;
        var image = this.refs.uploadImage;
        reader.onload = function (e) {
            componentObject.refs.uploadImage.setAttribute('src', e.target.result);
            componentObject.refs.uploadImage.onload = function(e) {
                if (componentObject.refs.fileUpload.value !== "") {
                    var canvas = document.createElement("canvas");
                    canvas.setAttribute("width", image.clientWidth);
                    canvas.setAttribute("height", image.clientHeight);
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.clientWidth, image.clientHeight);
                    canvas.toBlob((blob) => {
                        componentObject.props.passFaceURL(blob, true);
                    });
                }
            }
        }
        if (this.refs.fileUpload.files.length !== 0) {
            reader.readAsDataURL(this.refs.fileUpload.files[0]);
            this.refs.textBox.value = "";
        }
        // }
    }

    imageExists(url, callback) {
        var image = new Image();
        image.onload = function() { callback(true); };
        image.onerror = function() { callback(false); };
        image.src = url;
    }

    handleUploadButton(e) {
        e.preventDefault();
        var url = this.refs.textBox.value;
        this.refs.fileUpload.value = "";
        this.imageExists(url, (exists) => {
            if (exists) {
                this.refs.uploadImage.src = url;
                this.refs.textBox.value = "";
                this.props.passFaceURL(url, false);
            } else {
                alert("Invalid image. Please try again.");
                this.props.passFaceURL(null, false);
            }  
        });
    } 

    handleGoBackButton(e) {
        e.preventDefault();
        this.props.goBackToWebcam(false);
    }  
}
export default UploadPicture;

