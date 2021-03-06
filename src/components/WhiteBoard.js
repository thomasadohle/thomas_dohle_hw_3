import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import CourseGrid from './CourseGrid'
import CourseTable from './CourseTable'
import CourseService from '../services/CourseService'
import UserService from '../services/UserService'
import CourseEditor from "./CourseEditor";
import "./Styling/course-editor.style.client.css"
import "./Styling/course-list.style.client.css"

var grid = "grid"
var table = "table"

class WhiteBoard extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService
        this.userService = UserService
        this.state = {
            courses: [],
            courseView: grid
        }
    }

    componentDidMount() {
        this.courseService.findAllCourses().then(courses => {
            this.setState({
                courses: courses
            })
            console.log("state in Whiteboard -> courses: " + JSON.stringify(this.state.courses))
        })
    }

    deleteCourse = course => {
        this.courseService.deleteCourse(course)
        this.courseService.findAllCourses().then(courses => {
            this.setState({
                courses: courses
            })
       })
    }

    addCourse = (course) => {
        this.courseService.addCourse(course).then(courses => {
            this.courseService.findAllCourses().then(courses => {
                console.log("Courses found: " + JSON.stringify(courses))
                this.setState({
                    courses: courses
                })
            })
        })
    }

    toggleViews = () => {

        if (this.state.courseView === grid) {
            this.setState({
                courseView: table
            })
            return "/table"
        } else {
            this.setState({
                courseView: grid
            })
            return "/"
        }
    }

    logout = () => {
        this.userService.logoutUser()
        this.props.logoutDirector()
    }




    render() {
        return (
            <div>
                <Router>
                    <div>
                        {this.state.courseView === grid &&
                        <Link to="/table">
                            <button className="btn btn-primary"
                                    onClick={this.toggleViews}>
                                Toggle Course Views
                            </button>
                            <button className="btn btn-warning"
                                    onClick={this.logout}>Logout</button>
                        </Link>
                        }
                        {this.state.courseView === table &&
                        <Link to="/">
                            <button className="btn btn-primary"
                                    onClick={this.toggleViews}>
                                Toggle Course View
                            </button>
                            <button className="btn btn-warning"
                                    onClick={this.logout}>Logout</button>
                        </Link>
                        }

                        <Route path='/' exact
                               render={() =>
                                   <CourseGrid
                                       addCourse={this.addCourse}
                                       deleteCourse={this.deleteCourse}
                                       courses={this.state.courses}
                                       courseService={this.courseService}/>}/>
                        <Route path="/course/:id"
                               exact
                               component={CourseEditor}/>
                        <Route path='/table'
                               render={() => <CourseTable
                                   courses={this.state.courses}
                                   addCourse={this.addCourse}
                                   deleteCourse={this.deleteCourse}
                                   courseService={this.courseService}/>}/>
                    </div>
                </Router>
            </div>
        );
    };
}

export default WhiteBoard;