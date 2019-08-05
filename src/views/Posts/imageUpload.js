import React, {Component} from 'react';
import {connect} from 'react-redux';
import ROUTES from '../../constants/routes';

import {
  setTopicImage,
} from '../../redux/actions/topicActions';

import {
  startRequest,
  uploadImage,
} from '../../redux/actions/apiActions';

const apiUrl = `${ROUTES.API_BASE_URL}api/upload`;

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  uploadImageCallBack(file) {
    const formData = new FormData();

    formData.append('file', file);
    return new Promise (
       (resolve, reject) => {
         this.props.dispatch(uploadImage(apiUrl, formData)).then(data => {
           resolve(data);
         }).catch(err => {
           reject(err);
         });
       }
    )
  }

  uploadImage(e) {
    this.props.dispatch(startRequest());
    var file = e.target.files[0];
    this.uploadImageCallBack(file).then(data => {
      this.props.dispatch(setTopicImage(data.data.link))
    });
  }

  removeImage() {
    this.props.dispatch(setTopicImage(''))
  }

  render () {
    return (
      <>
        <div className="file-input">    
          <input type="file" name="file-topic" className="file-topic" onChange={this.uploadImage} accept="image/gif, image/jpeg, image/png"/>
        </div>
        {
          (this.props.topic.topicImage || this.props.topic.image) &&
          (
            <p className="image-topic--wrapper">
              <button type="button" className="remove-image" onClick={this.removeImage}><i className="icon-trash"></i></button>
              <img src={this.props.topic.topicImage || this.props.topic.image} alt=""/>
            </p>
          )
        }
      </>
    )
  }
}

const mapStatetoProps = state => ({
  topic: state.topic,
});

export default connect(mapStatetoProps)(ImageUpload);
