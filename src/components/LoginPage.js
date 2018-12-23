import React, { Component, Fragment } from 'react';
import FBLogin from './FBLogin'
import Albums from './Albums'
import { connect } from 'react-redux';

class LoginPage extends Component {
  render() {
    const { loggingIn, user } = this.props;
    return (
      <Fragment>
        <nav style={styles.headerContainer}>
          <div className="navbar-fixed">
            <h4 style={styles.heading}>FB Albums</h4>
          </div>
        </nav>
        <div className="row">
          <div className="col s12 m4 l3">
            <FBLogin />
          </div>
          <div className="col s12 m8 l9" style={{ marginTop: '8%' }}>
            {
              loggingIn &&
              (
                <Albums userID={user.response.userID} accessToken={user.response.accessToken} />
              )
            }
          </div>
        </div>
      </Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn,
    user
  };
}
const styles = {
  headerContainer: {
    backgroundColor: '#00c1b3'
  },
  heading: {
    textAlign: 'center',
    paddingTop: '15px'
  }
}
export default connect(mapStateToProps)(LoginPage); 
