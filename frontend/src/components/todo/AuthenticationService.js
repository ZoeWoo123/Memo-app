import axios from "axios"
import {API_URL} from '../../Constants.js'


export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_TOKEN = 'authenticatedToken'

class AuthenticationService{
    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`, {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }
    executeJWTAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
            username:username,
            password:password
        })
    }
    createBasicAuthToken(username, password){
        //encode
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    createJWTToken(token){
        //encode
        return "Bearer "  + token
    }
    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptor(this.createBasicAuthToken(username, password))
    }
    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_TOKEN, token)
        this.setupAxiosInterceptor()
    }
    
    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        sessionStorage.removeItem(USER_TOKEN)
    }
    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null)
            return false;
        return true;
    }
    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null)
            return "";
        return user;
    }
    setupAxiosInterceptor(){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = this.createJWTToken(sessionStorage.getItem(USER_TOKEN))
                }
                return config
            }
        )
        
        
    }
}
export default new AuthenticationService();