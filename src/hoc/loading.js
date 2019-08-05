import React, {Component} from 'react';

function WithLoading(WrappedComponent) {
  return class extends Component {
    render() {
      console.log('loading', this.props.isLoading);
      if(this.props.isLoading) {
        return (
          <>
          <WrappedComponent {...this.props} />
          <div id="ajax-loading-screen" className="loading">
            <span className="loading-icon none">
              <span className="default-loading-icon spin"></span>
            </span>
          </div>
          </>
        )
      } else {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}

export default WithLoading;
