import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  onHandleChange = (e) => {
    let {dispatch} = this.props;
    dispatch({type: 'UPDATE_USERNAME', username: e.target.value})
  }

  onUserSearch = () => {
    let {dispatch} = this.props;
    let {username} = this.props;
    fetch(`https://api.github.com/users/${username}`)
      .then( res => {
        return res.json()
      })
      .then( res => {
        console.log('HERE', res.avatar_url)
        // <img src={res.avatar_url} />
        dispatch({type: 'UPDATE_USERPROFILE', userprofile: res})
      })
  }

  onRepoFetch = () => {
    let {dispatch} = this.props;
    let {repos_url} = this.props.userprofile;

    fetch(repos_url)
      .then(res => {
        return res.json
      })
      .then(res => {
        dispatch({type: 'UPDATE_REPOS', repos: res})
      })
  }

  render() {
    let {userprofile} = this.props;
    let repos = this.props.repos.map( (repo, i) => {
      return <li key={i}>{repo.name}</li>
      console.log('???????????????',repos);

    });
    return (
      <div className="App">
        <input type='text'
               onChange={this.onHandleChange}
               value={this.props.user} />
        <h2>{this.props.username}</h2>
        <button type='button' className='btn btn-promary' onClick={this.onUserSearch}>Search</button>
        <hr />
        <img src={userprofile.avatar_url}
             alt=''
             style={{borderRadius: '50%',
                     display: 'inline-block',
                     inlineheight: '50px',
                     backGround: 'green'}}/>
        <h4>{userprofile.location}</h4>
        <button type='button' className='btn btn-info' onClick={this.onRepoFetch}>Fetch Repos</button>
        {repos}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  }
};

export default connect(mapStateToProps)(App);
