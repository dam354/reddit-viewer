import React, { Component } from 'react';
import './PostContainer.scss';
import Post from './Post/Post';
import moment from 'moment';
class PostContainer extends Component {
  render() {
    const { posts, favorites } = this.props;

    return (
      <div className="container">
        {posts.map((x, index) => {
          let postImg = x.data.url;
          let postTitle = x.data.title;
          let postUser = x.data.author;
          let postTime = moment().from(moment.utc(x.data.created * 1000), true);
          let postView = x.data.ups;
          let postID = x.data.id;
          let isFavorite = false;
          if (favorites[postID]) {
            isFavorite = true;
          }

          return (
            <Post
              deleteFavorite={this.props.deleteFavorite}
              addFavorite={this.props.addFavorite}
              post={x}
              key={index}
              postImg={postImg}
              postID={postID}
              postTitle={postTitle}
              postUser={postUser}
              postTime={postTime}
              postView={postView}
              isFavaorite={isFavorite}
              icon="heart"
            />
          );
        })}
      </div>
    );
  }
}

export default PostContainer;
