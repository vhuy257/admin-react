import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if(this.props.auth === null) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/login');
      }
    }

    render() {
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />
      }
      return <Redirect to='/login' />;
    }
  }

  const mapStatetoProps = state => ({
    auth: state.auth.isAuth
  });

  return connect(mapStatetoProps)(Authentication);
}
