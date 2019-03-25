import React, { Component } from 'react';
import './sass/app.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Switch, Route } from 'react-router-dom';
import {
  faUser,
  faClock,
  faBolt,
  faHeart,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from './components/Header/Header';
import PostContainer from './components/Body/PostContainer/PostContainer';
import FavoriteContainer from './components/Body/FavoriteContainer/FavoriteContainer';

library.add(faUser, faClock, faBolt, faHeart, faTrash);

class App extends Component {
  state = {
    subreddit: 'analog',
    isLoading: true,
    favoritesCount: 0,
    favorites: {}
  };
  componentDidMount() {
    const { subreddit } = this.state;
    const localStorageRef = localStorage.getItem('favorites');
    const URL = `https://www.reddit.com/r/${subreddit}/top/.json`;

    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (localStorageRef) {
          this.setState({
            isLoading: false,
            posts: data.data.children,
            favorites: JSON.parse(localStorageRef),
            favoritesCount: Object.keys(JSON.parse(localStorageRef)).length
          });
        } else {
          this.setState({
            isLoading: false,
            posts: data.data.children
          });
        }
      });
  }
  componentDidUpdate() {
    localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
  }
  addFavorite = (favorite, postID) => {
    // 1. Take a copy of the existing state
    const favorites = { ...this.state.favorites };
    // 2. Add our new fish to that fishes variable
    if (favorites[postID]) {
    } else {
      favorites[postID] = favorite;
    }

    let favoritesCount = Object.keys(favorites).length;
    // 3. Set the new fishes object to state
    this.setState({ favorites, favoritesCount });
  };

  deleteFavorite = key => {
    // 1. take a copy of state
    const favorites = { ...this.state.favorites };
    // 2. update the state
    delete favorites[key];
    // 3.  update state
    let favoritesCount = Object.keys(favorites).length;
    // 3. Set the new fishes object to state
    this.setState({ favorites, favoritesCount });
  };

  render() {
    return (
      <div className="App">
        <Header
          subreddit={this.state.subreddit}
          favoritesCount={this.state.favoritesCount}
        />
        {this.state.isLoading && <h3>loading...</h3>}
        {!this.state.isLoading && (
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <PostContainer
                  {...props}
                  deleteFavorite={this.deleteFavorite}
                  addFavorite={this.addFavorite}
                  posts={this.state.posts}
                  favorites={this.state.favorites}
                />
              )}
            />
            <Route
              exact
              path="/favorites"
              render={props => (
                <FavoriteContainer
                  {...props}
                  deleteFavorite={this.deleteFavorite}
                  addFavorite={this.addFavorite}
                  posts={this.state.favorites}
                />
              )}
            />
            {/* <Route path="/store/:storeId" component={App} /> */}
            {/* <Route component={NotFound} /> */}
          </Switch>

          // <PostContainer
          //   deleteFavorite={this.deleteFavorite}
          //   addFavorite={this.addFavorite}
          //   posts={this.state.posts}
          // />
        )}
      </div>
    );
  }
}

export default App;
