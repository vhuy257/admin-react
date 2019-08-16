import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, CardHeader} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import {
    getData,
    deleteData
} from '../../redux/actions/apiActions';
import {
    getListTopicSuccess,
    removeTopic 
} from '../../redux/actions/topicActions';

const apiURLGetList = `${ROUTES.API_BASE_URL}api/post/listposts/20`;

class ListPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            danger: false,
            itemSelect: {}
        }
        this.toggleDanger = this.toggleDanger.bind(this);
        this.removePost = this.removePost.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getData(apiURLGetList, getListTopicSuccess))
    }

    toggleDanger(item) {
        this.setState({
          danger: !this.state.danger,
          itemSelect: item
        });
    }

    removePost() {
        const apiURL = `${ROUTES.API_BASE_URL}api/post/remove/${this.state.itemSelect._id}`;
        this.props.dispatch(deleteData(apiURL, removeTopic(this.state.itemSelect)));
        this.setState({
            danger: !this.state.danger,
        });
    }

    render() {
    return (
        <div className="animated fadeIn">
            <Row>
            <Col lg={12}>
                <Card>
                    <CardHeader className="list--post-header">
                        <div className="d-flex">
                            <strong>List posts</strong>
                            <button className="btn btn-outline-primary btn-block"><Link to="/post/create">Create</Link></button>
                        </div>
                    </CardHeader>
                <CardBody>
                {this.props.loading && 
                    <div className="text-center"><h5>Loading data...</h5></div>
                }
                {
                    !this.props.loading &&
                    (
                        <>
                        <Table hover responsive bordered className="table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>Tags</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Create by</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {   
                                this.props.topic && this.props.topic.listTopic.map((item, key) => (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>
                                            {item.tags.map((item, key) => (
                                                <span key={key} className="tag-item">{item.name}</span>
                                            ))}
                                        </td>
                                        <td>
                                            {
                                                item.image && 
                                                <LazyLoadImage 
                                                src={item.image} 
                                                effect="blur"
                                                width="200"
                                                alt={item.title}/>
                                            }
                                            {
                                                !item.image && <span>No Image</span>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.user}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <button className="btn btn-light btn-block">
                                                <Link to={`/post/edit/${item._id}`}>
                                                Edit</Link>
                                            </button> 
                                            <button className="btn btn-ghost-danger btn-block" onClick={() => this.toggleDanger(item)}>Remove</button>
                                        </td>
                                    </tr>
                                ))
                            } 
                            </tbody>
                        </Table>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item"><Link to="/" className="page-link">Previous</Link></li>
                                <li className="page-item"><Link to="/" className="page-link">1</Link></li>
                                <li className="page-item"><Link to="/" className="page-link">2</Link></li>
                                <li className="page-item"><Link to="/" className="page-link">3</Link></li>
                                <li className="page-item"><Link to="/" className="page-link">Next</Link></li>
                            </ul>
                        </nav>
                        </>
                    )
                }
                </CardBody>
                </Card>
            </Col>
            </Row>
            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Remove post</ModalHeader>
                  <ModalBody>
                    Are you sure you want to remove this?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.removePost}>Yes</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
                  </ModalFooter>
            </Modal>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userInit,
    topic: state.topic,
    loading: state.api.isLoading
});

export default connect(mapStateToProps)(ListPosts);
