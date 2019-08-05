import React, {Component} from 'react';
import { Card, CardBody, Col, Row, Button, CardHeader, Label, FormGroup, Input, Form} from 'reactstrap';
import {connect} from 'react-redux';
import EditorTpl from './editor';
import ImageTopic from './imageUpload';
import ROUTES from '../../constants/routes';
import WithLoading from '../../hoc/loading';

import {
    changeField,
    insertTopicSuccess
} from '../../redux/actions/topicActions';
import {
    addData
} from '../../redux/actions/apiActions';

const ImageWithLoading = WithLoading(ImageTopic);
const apiUrl = `${ROUTES.API_BASE_URL}api/post/add`;

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.createPost = this.createPost.bind(this);
        this.changeField         = this.changeField.bind(this);
    }

    changeField(e) {
        this.props.dispatch(changeField({[e.target.name] : e.target.value}))
    }

    createPost(e) {
        e.preventDefault();
        var post = {
            user: this.props.api.userCreateTopic || 'Anonymous',
            category: this.props.topic.category,
            title: this.props.topic.titleTopic,
            excerpt: this.props.topic.excerptTopic,
            content: this.props.topic.contentTopic,
            imageUrl: this.props.topic.topicImage,
        }
        this.props.dispatch(addData(apiUrl, post, insertTopicSuccess));
    }

    render() {
        return (
            <div className="animated fadeIn create--post">
                <Row>
                    <Col lg={12}>
                        <Card>
                        <CardHeader>
                            <strong>Create post</strong>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Form onSubmit={this.createPost}>
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
                                        <Label htmlFor="category">Category</Label>
                                        <Input type="select" name="category" vale={this.props.topic.category} id="category" onChange={this.changeField}>
                                            <option value="Miền Bắc">Miền Bắc</option>
                                            <option value="Miền Nam">Miền Nam</option>
                                            <option value="Miền Trung">Miền Trung</option>
                                        </Input>
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
                                            <EditorTpl onEditorStateChange={this.onEditorStateChange}/>
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
    api: state.api,
    loading: state.api.isLoading,
});

export default connect(mapStateToProps)(CreatePost);