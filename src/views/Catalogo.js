import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { getList, del } from '../actions/habitacion'
import FacebookProvider, { Comments } from 'react-facebook'
import YouTube from 'react-youtube';

import './index.css'
class Catalogo extends Component {


  constructor() {
    super();
    this.state = {
      profileImage: '',
      fullName: '',
      islogout: false


    }
    this.onlogout = this.onlogout.bind(this);
  }
  componentWillMount() {


    let fbData = JSON.parse(localStorage.getItem('fbData'));
    let googleData = JSON.parse(localStorage.getItem('googleData'));

    if (!fbData && !googleData) {
      this.setState({ islogout: true });
    }

    if (fbData) {
      this.setState({ profileImage: fbData.picture, fullName: fbData.name });
    } else if (googleData) {
      this.setState({ profileImage: googleData.picture, fullName: googleData.name });
    }
  }
  onlogout(e) {
    localStorage.clear();
    this.setState({ islogout: true });

  }
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    console.log(this.props);
    if (this.state.islogout) {
      return (<Redirect to="/" />);

    }
    return (

      <div className="home">

        <nav className="navs">

          <div className=" nav-wrapper">

            <a className="center brand-logo">Trivago 2.0</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a><img className="circle home-avatar" src={this.state.profileImage} /></a></li>
              <li><a className="name">{this.state.fullName}</a></li>
              <li><a>
                <i onClick={this.onlogout} className="fa fa-power-off">salir</i>
              </a>
              </li>

            </ul>


          </div>
        </nav>
        <div>
            <div className="field" id="searchform">
  <input type="text" id="searchterm" placeholder="buscar" />
   <button className="btn waves-effect waves-light  grey darken-3" type="submit" name="action">Buscar
    <i className="material-icons right">find_replace</i>
  </button>
</div>
        </div>
<div className="card">
        <div className=" card horizontal">
          <div className="card-image">
            <img src="https://lorempixel.com/100/190/nature/6" />
          </div>

          <div className="card-stacked">
            <div className="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.</p>
            </div>
            <div className="card-tabs">
              <ul className="tabs tabs-fixed-width">
                <li className="tab"><a href="#test4">Test 1</a></li>
                <li className="tab"><a class="active" href="#test5">Test 2</a></li>
                <li className="tab"><a href="#test6">Test 3</a></li>
              </ul>
            </div>
            <div className="card-content grey lighten-4">
              <div id="test4">
                <FacebookProvider appId="167296827258593">
                  <Comments href="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0&appId=167296827258593&autoLogAppEvents=1" />
                </FacebookProvider>
              </div>
              <div id="test5"><YouTube
        videoId="djV11Xbc914"
        opts={opts}
        onReady={this._onReady}
      /></div>
              <div id="test6">Test 3</div>
            </div>
          </div>

        </div>
        <div className=" card-content">

    

        </div>
        </div>

      </div>
    );
  }
}


export default (Catalogo);
