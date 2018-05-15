import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'

import './index.css'
class Home extends Component {
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
    if (this.state.islogout) {
      return (<Redirect to="/"/>);

    }
    return (

      <div className="home">

        <nav className="navs">

          <div className=" nav-wrapper">

            <a className="center brand-logo">Trivago 2.0</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a><img className="circle home-avatar" src={this.state.profileImage} /></a></li>
              <li><a>{this.state.fullName}</a></li>
              <li><a>
                <i onClick={ this.onlogout } className= "fa fa-power-off">salir</i>
                </a>
              </li>

            </ul>


          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
