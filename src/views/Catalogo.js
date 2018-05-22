import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect} from 'react-router-dom'
import { getList, del } from '../actions/habitacion'


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
    console.log(this.props);
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
           
          <div className=" card horizontal">
            <div className="card-image">
        <img src="https://lorempixel.com/100/190/nature/6"/>
            </div>

            <div class="card-stacked">
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
      <div id="test4">Test 1</div>
      <div id="test5">Test 2</div>
      <div id="test6">Test 3</div>
    </div>
            </div>
           
          </div>
      </div>
    );
  }
}


export default (Catalogo);
