import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            username: 'woo',
            password: 'password',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handerChange = this.handerChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    render(){
        return(
            <div className="container">
                <h1>Login</h1>
                <div>
                    {/* <ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage}></ShowLoginSuccess> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/* Because true && "String" return "String"/false && "String" return false */}
                    {this.state.showSuccessMessage && <div>Login Success</div>}
                    User Name: <input type="text" name="username" onChange={this.handerChange}></input>
                    PassWord: <input type="password" name="password" onChange={this.handerChange}></input>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
    handerChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }    
        );
    }
   loginClicked(){
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     }
        // )
        // .catch(
        //     () => {
        //         this.setState(
        //             {
        //                 showSuccessMessage: false,
        //                 hasLoginFailed: true
        //             }
        //         )
        //     }
        // )
        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                this.props.history.push(`/todos`)
            }
        )
        .catch(
            () => {
                this.setState(
                    {
                        showSuccessMessage: false,
                        hasLoginFailed: true
                    }
                )
            }
        )
   }
}
// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null;
// }

export default LoginComponent;