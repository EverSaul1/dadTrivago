import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { getList, del } from '../actions/habitacion'
import FacebookProvider, { Comments, Share } from 'react-facebook'
import YouTube from 'react-youtube';
import { Button, Modal, ButtonToolbar, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap'

import './index.css'
class Catalogo extends Component {


  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShows = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      profileImage: '',
      fullName: '',
      islogout: false,
      show: false


    }
    this.onlogout = this.onlogout.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
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
      width: '525',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    console.log(this.props);
    if (this.state.islogout) {
      return (<Redirect to="/" />);

    }
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
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
        <div className=" buscar card">
          <div className="field" id="searchform">
            <input type="text" id="searchterm" placeholder="buscar" />
            <button className="btn waves-effect waves-light  blue darken-1" type="submit" name="action">Buscar
                <i className="material-icons right">find_replace</i>
            </button>
          </div>
        </div>
        <aside>



          <div className="crds card horizontal">

            <div className="card-image">
              <img src="data:image/jpeg;base64,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" width="250" height="180" />
            </div>



            <div className="card-stacked">

              <div className="card-content">
                <span className="card-title">Estelar Miraflores</span>

                <p>Miraflores, a 0.6 km de: Centro de la ciudad</p>


              </div>
              <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.handleShows}>
                  Comentar
                 </Button>


                <Modal
                  {...this.props}
                  show={this.state.show}
                  onHide={this.handleHide}
                  dialogClassName="custom-modal"
                >

                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                      COMENTAR

                        <FacebookProvider appId="167296827258593">
                        <Comments href="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0&appId=167296827258593&autoLogAppEvents=1" />
                      </FacebookProvider>
                    </Modal.Title>
                  </Modal.Header>
                  
                  <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.handleHide}>Salir</Button>
                  </Modal.Footer>
                </Modal>
              </ButtonToolbar>



            </div>
            
      <FacebookProvider appId="167296827258593">
        <Share href="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0&appId=167296827258593&autoLogAppEvents=1">
          <button type="button">Share</button>
        </Share>
      </FacebookProvider>






          </div>


          <br />
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width">
              <li className="tab"><a href="#test4">Test 1</a></li>
              <li className="tab"><a class="active" href="#test5">Test 2</a></li>
              <li className="tab"><a href="#test6">Test 3</a></li>
            </ul>
          </div>
          <div className="card-content grey lighten-4">
            <div id="test4">

            </div>
            <div id="test5">
              <YouTube
                videoId="djV11Xbc914"
                opts={opts}
                onReady={this._onReady}
              />
            </div>
            <div id="test6">Test 3</div>
          </div>
        </aside>

      </div>
    );
  }
}


export default (Catalogo);
