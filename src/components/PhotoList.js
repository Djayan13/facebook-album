import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import 'lightbox-react/style.css';

class PhotoList extends Component {
  state = {
    currentImage: 0
  };

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  componentDidMount() {
    let albumid = this.props.match.params.albumId;
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.dispatch(userActions.getPhotos(albumid, user.accessToken));
  }
  render() {
    const { galleryImg } = this.props
    return (
      <Fragment>
        <nav style={styles.headerContainer}>
          <div className="navbar-fixed">
            <Link to="/" style={{ color: 'white'}}>
              <i className="large material-icons" style={{fontSize:'42px'}}>arrow_back</i>
            </Link>
          </div>
        </nav>

        {galleryImg ? (
          <div style={styles.gallery}>
            <Gallery photos={galleryImg} onClick={this.openLightbox} />
            <Lightbox images={galleryImg}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </div>
        ) : (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )
        }
      </Fragment>
    );
  }
}

const styles = {
  headerContainer: {
    backgroundColor: '#00c1b3',
    marginTop:'20px'
  },
  heading: {
    textAlign: 'left',
    paddingTop: '10px'
  },
  gallery:{
    marginTop:'5%'
  }
}
const mapStateToProps = (state) => {
  let galleryImg
  const { photos } = state.photos;
  if (photos) {
    galleryImg = photos.data.map(photo => ({
      src: photo.images[0].source,
      width: 1,
      height: 1
    }))
  }
  return {
    galleryImg: galleryImg
  };
}
export default connect(mapStateToProps)(PhotoList); 