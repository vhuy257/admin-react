import React, {Component} from 'react';
import { Card, CardBody, Col, Row, Button, CardHeader, Label, FormGroup, Input, Form} from 'reactstrap';
import {connect} from 'react-redux';
import EditorTpl from './editor';
import ImageTopic from './imageUpload';
import ROUTES from '../../constants/routes';
import WithLoading from '../../hoc/loading';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import Category from './category';
import {
    changeField,
    fetchTopicSuccess,
    fetchTagsCurrent,
} from '../../redux/actions/topicActions';
import {
    getData,
    updateData,
} from '../../redux/actions/apiActions';

const ImageWithLoading = WithLoading(ImageTopic);
const apiUpdate = `${ROUTES.API_BASE_URL}api/post/update`;


class EditPost extends Component {
    constructor(props) {
        super(props);
        this.changeField = this.changeField.bind(this);
        this.updatePost  = this.updatePost.bind(this);
    }

    componentDidMount() {
        const apiURL = `${ROUTES.API_BASE_URL}api/post/id/${this.props.router.match.params.id}`;
        this.props.dispatch(getData(apiURL, fetchTopicSuccess, fetchTagsCurrent));
    }

    changeField(e) {
        this.props.dispatch(changeField({[e.target.name] : e.target.value}))
    }

    updatePost(e) {
        e.preventDefault();
        var post = {
            _id: this.props.topic._id,
            user: this.props.auth.userName || undefined,
            categoryTopic: this.props.topic.category,
            titleTopic: this.props.topic.titleTopic,
            imageUrl: this.props.topic.topicImage,
            excerptTopic: this.props.topic.excerptTopic,
            contentTopic: draftToHtml(convertToRaw(this.props.topic.contentTopic.getCurrentContent())),
        };
        this.props.dispatch(updateData(apiUpdate, post));
    }

    render() {
        return (
            <div className="animated fadeIn create--post">
                <Row>
                    <Col lg={12}>
                        <Card>
                        <CardHeader>
                            <strong>Edit post</strong>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Form onSubmit={this.updatePost}>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="name">Title</Label>
                                            <Input 
                                            type="text" 
                                            id="title-post" 
                                            placeholder="Title post" 
                                            name="titleTopic" 
                                            value={ this.props.topic.titleTopic } 
                                            onChange={this.changeField} 
                                            required />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Category/>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="name">Excerpt</Label>
                                            <Input 
                                            type="text" 
                                            id="excerpt" 
                                            placeholder="Excerpt post" 
                                            name="excerptTopic" 
                                            value={ this.props.topic.excerptTopic }
                                            onChange={this.changeField} required />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="file-input">File input</Label>
                                            <ImageWithLoading
                                                isLoading={this.props.loading}
                                                topic={this.props.topic}/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="Description">Description</Label>
                                            <EditorTpl updateTopic={true}/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <div className="form-actions">
                                            <Button type="submit" color="primary">Save changes</Button>
                                            <Button color="secondary">Cancel</Button>
                                        </div>
                                    </Col>
                                </Form>
                            </Row>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    topic: state.topic,
    auth: state.auth,
    loading: state.api.isLoading,
});

export default connect(mapStateToProps)(EditPost);