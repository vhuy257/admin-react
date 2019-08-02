import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ROUTES from '../../constants/routes';
import {
    getData
} from '../../redux/actions/apiActions';
import {
    getListTopicSuccess
} from '../../redux/actions/topicActions';

const apiURLGetList = `${ROUTES.API_BASE_URL}api/topics/listopic/20`;

class ListPosts extends Component {
    componentDidMount() {
        this.props.dispatch(getData(apiURLGetList, getListTopicSuccess))
    }

    render() {
    return (
        <div className="animated fadeIn">
            <Row>
            <Col lg={12}>
                <Card>
                <CardBody>
                <h2>Posts</h2>
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
                                <th>#Id</th>
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
                                        <th scope="row">{item._id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.user}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td><button className="btn btn-light btn-block">Edit</button> <button className="btn btn-ghost-danger btn-block">Remove</button></td>
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
