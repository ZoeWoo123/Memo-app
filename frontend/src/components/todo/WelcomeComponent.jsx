import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'
import './todo.css'
class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state ={
            welcomeMessage:""
        }
    }
    render(){
        return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>
                </div>
                {/* <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="botton">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div> */}
                <div className="img-containter mx-auto">
                    <img src="https://blog.asana.com/wp-content/post-images/Asana-productivity-tips.png" className="img-fluid"/>
                </div>
            </>
        )
    }
    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // //if the request successful
        // .then(response => this.handleSuccessfulResponse(response))
        // //if not successful
        // //.catch()
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        //if the request successful
        .then(response => this.handleSuccessfulResponse(response))
        //if not successful
        .catch(error => this.handleError(error))
    }
    handleSuccessfulResponse(response){
        this.setState(
            {
                welcomeMessage:response.data.message
            }
        )
    }
    handleError(error){
        console.log(error.response);
        let errorMessage = "";
        if(error.message)
            errorMessage += error.message
        if(error.response && error.response.data)
        errorMessage += error.response.data.message
        this.setState({
            welcomeMessage: errorMessage
        })
    }
}
export default WelcomeComponent;