import React, {Component} from 'react';
import {connect} from 'react-redux';
import ROUTES from '../../constants/routes';

import {
  addTag,
  addTagSuggestion,
  loadTagsSuggestion,
  removeTag,
  removeTagSuggestion
} from '../../redux/actions/topicActions';

import {
  addData,
  getData,
  deleteData
} from '../../redux/actions/apiActions';

const ReactTags = require('react-tag-autocomplete');
const apiUrl = `${ROUTES.API_BASE_URL}api/tags/add`;

class TagsTpl extends Component {
    constructor(props) {
      super(props);
      this.handleDelete   = this.handleDelete.bind(this);
      this.handleAddition = this.handleAddition.bind(this);
    }

    componentDidMount() {
      const apiUrl = `${ROUTES.API_BASE_URL}api/tags`;
      this.props.dispatch(getData(apiUrl, loadTagsSuggestion));
    }

    handleDelete(i) {
      this.props.dispatch(removeTag(i));
    }

    handleAddition(tag) {
      var _index = this.props.topic.tags.suggestions.indexOf(tag);
      if( _index === -1) {
        const data = {name: tag.name}
        this.props.dispatch(addData(apiUrl, data, addTag, addTagSuggestion));
      } else {
        var _indexCurrentTags = this.props.topic.tags.current.indexOf(tag);
        if(_indexCurrentTags === -1) {
          this.props.dispatch(addTag({data: tag}));
        }
      }
    }

    addtoCurrent(tag) {
      var _indexCurrentTags = this.props.topic.tags.current.indexOf(tag);
      if(_indexCurrentTags === -1) {
        this.props.dispatch(addTag({data: tag}));
      }
    }

    removeTag(tag) {
      const apiUrl = `${ROUTES.API_BASE_URL}api/tags/remove/${tag._id}`;
      this.props.dispatch(deleteData(apiUrl, removeTagSuggestion(tag)));
    }

    render() {
      return (
        <>
          <ReactTags
          allowNew={true}
          tags={this.props.topic.tags.current}
          suggestions={this.props.topic.tags.suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition} />
          <div className="suggestions-tag-wrapper">
            {
              this.props.topic.tags.suggestions.map((item, i) => (
                <span key={i} className="tag-item" onClick={() => {this.addtoCurrent(item)}}>{item.name} <span onClick={() => {this.removeTag(item)}}><i className="icon-trash"></i></span></span>
              ))
            }
          </div>
        </>
      )
    }
}

const mapStatetoProps = state => ({
  topic: state.topic
});

export default connect(mapStatetoProps)(TagsTpl);
