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

  loadMorePhotos = (e) => {
    const { paging } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    if (e.target.name === 'previous') {
      if (paging.hasOwnProperty('previous')) {
        this.props.dispatch(userActions.getMorePhotos(paging.previous, user.accessToken));
      } else {
        window.M.toast({ html: 'No more Photos to Load' }, 2000);
      }
    }

    if (e.target.name === 'next') {
      if (paging.hasOwnProperty('next')) {
        this.props.dispatch(userActions.getMorePhotos(paging.next, user.accessToken));
      } else {
        window.M.toast({ html: 'No more Photos to Load' }, 2000);
      }
    }



  }
  render() {
    const { galleryImg } = this.props;
    return (
      <Fragment>
        <nav style={styles.headerContainer}>
          <div className="navbar-fixed">
            <Link to="/" style={{ color: 'white' }}>
              <i className="large material-icons" style={{ fontSize: '42px' }}>arrow_back</i>
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
            <div style={{ margin: '20px', display: 'flex', justifyContent:'space-between'}}>
              <button className="btn waves-effect waves-light" onClick={this.loadMorePhotos} name="previous">Previous
              </button>
              <button className="btn waves-effect waves-light" onClick={this.loadMorePhotos} name="next">Next
              </button>
            </div>
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
    marginTop: '20px'
  },
  heading: {
    textAlign: 'left',
    paddingTop: '10px'
  },
  gallery: {
    marginTop: '5%'
  }
}
const mapStateToProps = (state) => {
  let galleryImg
  let paging
  const { photos } = state.photos;
  if (photos) {
    galleryImg = photos.data.map(photo => ({
      src: photo.images[0].source,
      width: 1,
      height: 1
    }));
    paging = photos.paging
  }
  return {
    galleryImg: galleryImg,
    paging: paging
  };
}
export default connect(mapStateToProps)(PhotoList); 