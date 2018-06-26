import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { getList, del } from '../actions/habitacion'
import FacebookProvider, { Comments, Share } from 'react-facebook'
import YouTube from 'react-youtube';
import MovieRow from '../MoviesRows'
import $ from 'jquery'
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
    this.state = {}
    // console.log("This is my initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    //    title: "Avengers: Infinity War", overview: "As the Avengers and their allies have continued to protect the world from threats too large"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    //    title: "	The Avengers", overview: "This is my second overview"},
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}

   

    this.performSearch("ant man")
  

  
   


    this.onlogout = this.onlogout.bind(this);
  }
   
  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
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

            <a className="center brand-logo">MoviesDB </a>
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



        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Buscar Pelicula...."/>

        {this.state.rows}






      </div>



    );
  }
}


export default (Catalogo);
