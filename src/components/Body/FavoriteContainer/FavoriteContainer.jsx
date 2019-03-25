import React, { Component } from 'react';
import '../FavoriteContainer/FavoriteContainer.scss';
import Post from '../PostContainer/Post/Post';
import moment from 'moment';
class Favorite extends Component {
  render() {
    const { posts } = this.props;
    let postLength = posts.lengths;

    if (postLength === 0) {
      return <h1>No Posts</h1>;
    }

    return (
      <div className="container">
        {Object.keys(posts).map((x, index) => {
          let postImg = posts[x].data.url;

          let postTitle = posts[x].data.title;
          let postUser = posts[x].data.author;
          let postTime = moment().from(
            moment.utc(posts[x].data.created * 1000),
            true
          );
          let postView = posts[x].data.ups;
          let postID = posts[x].data.id;

          return (
            <Post
              deleteFavorite={this.props.deleteFavorite}
              post={x}
              key={index}
              postImg={postImg}
              postID={postID}
              postTitle={postTitle}
              postUser={postUser}
              postTime={postTime}
              postView={postView}
              isFavaorite={true}
              icon="trash"
            />
          );
        })}
      </div>
    );
  }
}

export default Favorite;
