import React, {Component} from 'react';
import {connect} from 'react-redux';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ROUTES from '../../constants/routes';

import {
  changeField
} from '../../redux/actions/topicActions';

import {
  uploadImage
} from '../../redux/actions/apiActions';

const apiUrl = `${ROUTES.API_BASE_URL}api/upload`;

class EditorTpl extends Component {
  constructor(props) {
    super(props);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeField({
      "titleTopic": '',
      "excerptTopic": '',
    }));
  }

  onEditorStateChange(val) {
    if(!this.props.updateTopic) {
      let _val = draftToHtml(convertToRaw(val.getCurrentContent()));
      return this.props.dispatch(changeField({"contentTopic" : _val}));
    }
    return this.props.dispatch(changeField({"contentTopic" : val}));
  }

  uploadImageCallBack(file) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('editor', true);
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

  render() {
    if(!this.props.updateTopic) {
      return (
        <Editor
          toolbarClassName="__class-toolbar-editor"
          wrapperClassName="__class-wrapper-editor"
          editorClassName="__class-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              uploadCallback: this.uploadImageCallBack,
              previewImage: true,
            }
          }}
        />
      )
    }
    return (
      <Editor
        editorState={this.props.topic.contentTopic}
        toolbarClassName="__class-toolbar-editor"
        wrapperClassName="__class-wrapper-editor"
        editorClassName="__class-editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: {
            uploadCallback: this.uploadImageCallBack,
            previewImage: true,
          }
        }}
      />
    )
  }
}

const mapStatetoProps = state => ({
  topic: state.topic
});

export default connect(mapStatetoProps)(EditorTpl);
