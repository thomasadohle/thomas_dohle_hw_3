import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import CourseGrid from "./WhiteBoard";
import CourseEditor from "./CourseEditor";
import Login from "./Login"
import Register from "./Register"
import UserService from '../services/UserService'
import ReactDOM from 'react-dom'
import WhiteBoard from "./WhiteBoard";

class notLoggedIn extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService;
        this.state = {
            loginView: "login"
        }
        //this.registerUser=this.registerUser.bind(this)
    }


    registerUser = (firstName,lastName,role,username,password) => {
        console.log("registerUser was called from NotLoggedIn")
        let newUser = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            role: role
        }
        this.userService.registerUser(newUser)
       // this.userService.registerUser(newUser)
    }

    loginUser = (username,password) =>{
        console.log("login user was called with un: " + username + " and pw: " + password)
        let login = {
            username: username,
            password: password
        }
        let currentUser = this.userService.loginUser(login)
        console.log("here")
            this.setState({
                user: currentUser
            })
        }


    test = () =>{
        console.log("test was called")
        fetch('http://localhost:8080/test')
            .then(response => response.json())
            .then(json => console.log(json)).catch(function(error){
            console.log("error: " + error)
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/"
                           render = {() =>
                               <Login
                                login = {this.loginUser}
                                test = {this.userService.currentUser}/>}/>
                    <Route path="/register"
                           render = {() =>
                           <Register
                           registerUser={this.registerUser}
                            test = {this.test}/>}/>
                    <Link to="/register">
                        <button className="btn btn-primary">Register</button>
                    </Link>

                </div>
            </Router>
        );
    };
}

export default notLoggedIn