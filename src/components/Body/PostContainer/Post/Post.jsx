import React, { Component } from 'react';
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Post extends Component {
  state = {
    addClass: false,
    likeIcon: 'heart'
  };

  onFav() {
    this.setState({ addClass: !this.state.addClass });
    // e.target.classList.add('fav');
  }
  componentDidMount() {
    if (this.props.isFavaorite == true) {
      this.setState({ likeIcon: 'trash' });
    }
  }
  render() {
    const {
      postImg,
      postTitle,
      postUser,
      postTime,
      postView,
      post,
      addFavorite,
      deleteFavorite,
      postID,
      isFavaorite
    } = this.props;

    let boxClass = ['image-heart'];
    if (this.props.isFavaorite === true) {
      boxClass.push('fav');
    }
    return (
      <div className="post-container">
        <div className="post-image-container">
          <img className="post-image" src={postImg} alt="" />
          <FontAwesomeIcon
            onClick={() => {
              this.onFav();
              if (!this.state.addClass && this.props.isFavaorite === false)
                addFavorite(post, postID);
              if (this.state.addClass || this.props.isFavaorite === true)
                deleteFavorite(postID);
            }}
            className={boxClass.join(' ')}
            icon={this.props.icon}
          />
        </div>
        <div className="post-body">
          <h2 className="post-title">{postTitle}</h2>
        </div>
        <div className="post-footer">
          <p className="post-stats">
            <FontAwesomeIcon
              style={{ color: '#999', fontSize: '9px', marginRight: '5px' }}
              icon="user"
            />
            /u/{postUser} &bull;
            <FontAwesomeIcon
              style={{ color: '#999', fontSize: '9px', margin: '0 5px' }}
              icon="clock"
            />
            {postTime} ago
            <FontAwesomeIcon
              style={{ color: '#999', fontSize: '9px', margin: '0 5px' }}
              icon="bolt"
            />
            {postView}
          </p>
        </div>
      </div>
    );
  }
}

export default Post;
