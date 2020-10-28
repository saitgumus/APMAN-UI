import React, {Component} from 'react';
import {GoogleLogin} from "react-google-login";
import {refreshTokenSetup} from "./refresh-token-setup";

const ClientId = "526937451548-d0q03t1ass9qgbipavmqms3ttrhpgma6.apps.googleusercontent.com";

class GoogleLoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisable: false
        }
    }

    onSuccess = (res) => {
        console.log("login successs - user : ", res.profileObj);
        refreshTokenSetup(res);
    }

    onFailure = (res) => {
        console.log("failure user : ", res);
    }

    render() {
        return (
            <div className={"google-login-div"}>
                <GoogleLogin clientId={ClientId}
                             buttonText={"Login with Google"}
                             onSuccess={this.onSuccess}
                             onFailure={this.onFailure}
                             cookiePolicy={'single_host_origin'}
                             style={{marginTop: '100px', width: "100%"}}
                             isSignedIn={true}
                             disabled={this.state.isDisable}/>
            </div>
        );
    }
}

export default GoogleLoginComponent;