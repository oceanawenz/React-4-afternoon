import React, { Component } from 'react';
import axios from "axios";

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then(response => {
      this.setState({ posts: response.data });
    });
  }

  //because Id and text of the post will be different every time the method is called, we should
  //use an id and text parameter for the method
  //use the parameters to construct our axios request and use the returned data to update posts on state.
  //pass it down to the component as a new prop called updatePostFn
  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text }).then(response => {
      this.setState({ posts: response.data });
    });
  }

  //the endpoint uses the request query to determin the id of the post to delete. 
  //because the id of the post will be different every time, we pass id as a parameter for this method.
  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response => {
      this.setState({ posts: response.data });
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text }).then(response => {
      this.setState({ posts: response.data });
    })
  }

  render() {
    const { posts } = this.state;


    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          {/* pass this.createPost to Compose method */}
          <Compose createPostFn={this.createPost} />
          {
            //  map over the posts. render a Post component for every post in the posts array on state.
            // pass props down into the Post Component in order to see the text and date for each post.
            //then render text and date into the Post Component.
            posts.map(post => (
              <Post key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}

              />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
