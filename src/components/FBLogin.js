import React, { Component } from "react";
import FacebookLoginWithButton from "react-facebook-login";
import { connect } from 'react-redux';

import { userActions } from '../actions';
import config from '../config';

class Facebook extends Component {

  fbLogin = response => {
    const { dispatch } = this.props;
    if (response) {
      dispatch(userActions.login(response));
    }
  };

  fbLogout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
  render() {
    let fbContent;
    const { loggingIn, user } = this.props;
    if (loggingIn) {
      fbContent = (
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" alt="profile pic" style={styles.profileImg} src={user.response.picture.data.url} />
          </div>
          <div className="card-content" style={{padding:'10px'}}>
            <p style={{fontWeight:'bold'}}>Welcome,</p>
            <p style={{fontWeight:'bold'}}>{user.response.name} </p>
            <button style={styles.btnLogout} onClick={this.fbLogout}><i className="tiny material-icons">exit_to_app</i> Logout</button>
          </div>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLoginWithButton
            appId={config.appId}
            autoLoad={true}
            fields="name,email,picture"
            callback={this.fbLogin}
            icon="fa-facebook"
          />
      );
    }

    return <div style={{marginTop:'20%'}}>{fbContent}</div>;
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
  profileImg : {
    borderRadius: '50%',
    padding: '10px'
  },
  btnLogout : {
    backgroundColor: '#00c5b3',
    padding: '5px',
    color: 'white',
    order: 'none',
    cursor: 'pointer'
  }
}
export default connect(mapStateToProps)(Facebook); 