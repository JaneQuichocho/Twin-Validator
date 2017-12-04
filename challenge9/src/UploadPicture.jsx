import React, { Component } from 'react';

var localStream;

class UploadPicture extends Component {
    render() {
        return (
            <div className="col-md-6 col-sm-12">
                <img id="celebrity" alt="Please upload valid image URL" ref="uploadImage" src="https://www.eldersinsurance.com.au/images/person1.png?width=368&height=278&crop=1" />
                <form>
                    <input type="text" ref="textBox" placeholder="Image URL" />
                    <button ref="SubmitButton" type="submit" onClick={(e) => this.handleUploadButton(e)} className="btn btn-primary">Submit</button>
                    {!this.props.isCelebrity && (<button ref="GoBack" type="goBack" onClick={(e) => this.handleGoBackButton(e)} className="btn btn-primary">Go Back to Webcam</button>)}
                    <input type="file" ref="fileUpload" />
                </form>

            </div>
        );
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
        this.imageExists(url, (exists) => {
            if (exists) {
                this.refs.uploadImage.src = url;
                this.refs.textBox.value = "";
                this.props.passFaceURL(url, this.props.isCelebrity);
            } else {
                alert("Invalid image. Please try again.");
                this.props.passFaceURL(null, this.props.isCelebrity);
            }  
        });
    } 
    handleGoBackButton(e) {
        e.preventDefault();
        this.props.goBackToWebcam(false);
    }  
}
export default UploadPicture;

