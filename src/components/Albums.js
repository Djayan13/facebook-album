import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class Albums extends Component {
  
  componentDidMount() {
    const { userID, accessToken } = this.props;
    this.props.dispatch(userActions.getAlbums(userID, accessToken));
  }
  render() {
    const { albums } = this.props;
    return (
      <Fragment>
        {albums && albums.data.map((album, index) => {
          return (
            <Link to={`/photos/${album.id}`} key={index}>
              <div className="col s5 m5 l5">
                <div className="card-panel grey lighten-5 z-depth-1">
                  <div className="row valign-wrapper">
                    <div className="col s2">
                      <img src={album.cover_photo.picture} width="50px" height="50px" alt="" className="circle" />
                    </div>
                    <div className="col s9" style={{ marginLeft: '25px' }}>
                      <span className="black-text">{album.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const { albums } = state.albums;
  return {
    albums: albums
  };
}
export default connect(mapStateToProps)(Albums); 