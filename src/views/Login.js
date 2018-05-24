import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'

import './index.css'
import 'materialize-css/dist/css/materialize.min.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: false,

        }
        this.responseFacebook = this.responseFacebook.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.onFailure = this.onFailure.bind(this);

    }
    componentWillMount() {
        if (localStorage.getItem("fbData") || localStorage.getItem("googleData")) {
            this.setState({ isLogged: true });
        }
    }
    responseFacebook(response) {
        localStorage.setItem("fbData", JSON.stringify({
            token: response.token,
            email: response.email,
            name: response.name,
            picture: response.picture.data.url,
            social: 'fb'
        }));

        this.setState({ isLogged: true });

    }
    responseGoogle(response) {
        localStorage.setItem("googleData", JSON.stringify({
            token: response.token,
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
            social: 'google'
        }));
        this.setState({ isLogged: true });
    }
    onFailure(error) {

    }

    render() {
        if (this.state.isLogged) {
            return (<Redirect to="catalogo/" />);
        }
        return (
            <div className="Login">

                <div className="Login-box">

                    <div className="card">
                        <span className="card-title">Iniciar sesion con:</span>
                        <div className=" aling card-content">
                            <FacebookLogin
                                appId="167296827258593"
                                autoload={false}
                                fields="name, email, picture.with(120)"
                                callback={this.responseFacebook}
                                onFailure={this.onFailure}
                                textButton="Iniciar con Facebook"
                                cssClass="waves-effect waves-light btn blue darken-3"
                                icon="fb fa fa-facebook-f" />

                            <br />
                            <GoogleLogin
                                clientId="110314917504-6jbcgvvbo5o6ia0q9cnjopl8mf83sm3r.apps.googleusercontent.com"
                                autoLoad={false}
                                onSuccess={this.responseGoogle}
                                onFailure={this.onFailure}
                                className="waves-effect waves-light btn grey lighten-3">
                                <i className="go fa fa-google" aria-hidden="true"></i>
                                <span id="google">Iniciar con google</span>
                            </GoogleLogin>

                        </div>
                        <div className="card-content">
                            <a>No publicaremos nada en tu Facebook o Google</a>
                        </div>


                    </div>

                </div>

                <br />

                <div className="login-box2">
                    <div className="L card">
                        <span className="card-title">Inicia sesión</span>
                        <div className="card-content">
                        Usuario:<input type="text" placeholder="ingresar tu usuario"/>
                        Contraseña:<input type="password" placeholder=" ingresar tu contraseña"/>
                            <button className="waves-effect waves-light btn">Iniciar</button>
                        </div>
                    </div>
                </div>

            
            </div>
        )

    }
}
export default Login;