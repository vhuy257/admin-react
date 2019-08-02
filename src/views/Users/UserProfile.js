import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Form} from 'reactstrap';
import {connect} from 'react-redux';
import  {
    changeValueUser,
} from '../../redux/actions/userActions';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.updateUserProfile = this.updateUserProfile.bind(this);
        this.changeField = this.changeField.bind(this);
        this.state = {
            type: 'alert alert-success fade',
            msg: ''
        }
    }

    checkErr(type, msg) {
        this.setState({
            type: type,
            msg: msg
        });
    }

    updateUserProfile(e) {
        e.preventDefault();
        var user = {
            displayName: this.props.user.displayName,
            photoUrl : this.props.user.photoUrl
        }; var updateUser = this.props.currentUser.updateProfile(user);
        
        updateUser.then(() => {
            this.checkErr('alert alert-success fade show', 'Profile user update success!!');
        }).catch((err) => {
            this.checkErr('alert alert-warning fade show', err);
        });            
    }

    changeField(e) {
        this.props.dispatch(changeValueUser({[e.target.name]: e.target.value}))
    }
    
    render() {
    const {
        user
    } = this.props;

    return (
        <div className="animated fadeIn">
            <Row>
            <Col lg={12}>
                <Card>
                <CardBody>
                    {user && 
                        (  
                            <Form onSubmit={this.updateUserProfile}>    
                                {(this.state.msg !== '') &&
                                    <div class={this.state.type} role="alert">{this.state.msg}</div>
                                }
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Display Name</label>
                                    <input type="text" className="form-control" name="displayName" value={user.displayName || ''} onChange={this.changeField} id="exampleFormControlInput1" placeholder="Display Name"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </Form>
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
    user: state.userInit
});

export default connect(mapStateToProps)(UserProfile);
