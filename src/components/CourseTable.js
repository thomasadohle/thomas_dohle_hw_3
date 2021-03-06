import React from 'react'
import CourseRow from './CourseRow'
import ModuleListItem from "./ModuleList";
import CourseGrid from "./CourseGrid";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CourseService from '../services/CourseService'

var course = null;


//
// const CourseTable = ({courses, deleteCourse, addCourse}) =>
class CourseTable extends React.Component {
    constructor(props) {
        super(props)
        this.courseDeleted = this.courseDeleted.bind(this);
        this.courseService = CourseService
        this.state = {
            course: {title: ''},
            courses: []
        };
        console.log("State in CourseTable -> Courses: " + JSON.stringify(this.props.courses))
    }

    componentDidMount() {
        this.courseService.findAllCourses().then(courses => {
            this.setState({
                courses: courses
            })
            console.log("state in Whiteboard -> courses: " + JSON.stringify(this.state.courses))
        })
    }

    createNewCourse = () => {
        let course = this.state.course
        this.courseService.addCourse(course).then(courses => {
            this.courseService.findAllCourses().then(courses => {
                console.log("Courses found: " + JSON.stringify(courses))
                this.setState({
                    courses: courses
                })
            })
        })
    }

    courseDeleted = (course) => {
        this.courseService.deleteCourse(course).then(response => {
                this.courseService.findAllCourses().then(courses => {
                    this.setState({
                        courses: courses
                    })
                })
            }
        )

    }


    newCourseTitleChanged = (event) => {
        this.setState(
            {
                course: {courseTitle: event.target.value}
            });
    }

    render() {
        return (
            <div className="container-fluid" id="wbdv-page-container">

                <form>
                    <div className="form-group row col-lg-12" id="wbdv-top-nav">
                        <nav className="navbar col-12">

                            <Link to="/grid">
                                <div className="col-1">
                                    <ion-icon name="apps" size="large"></ion-icon>
                                </div>
                            </Link>
                            <Route path="/grid" exact
                                   render={() =>
                                       <CourseGrid
                                           addCourse={this.addCourse}
                                           deleteCourse={this.deleteCourse}
                                           courses={this.state.courses}
                                           courseService={this.courseService}/>}/>

                            <div className="col-sm-4 col-lg-3 text-right" id='wbdv-title'>
                                Course Manager
                            </div>
                            <div className="col-sm-6 col-lg-4" id="wbdv-new-course">
                                <input type="text" className="form-control"
                                       id="wbdv-new-course-title" placeholder="New course title"
                                       onChange={this.newCourseTitleChanged}></input>
                            </div>
                            <div className="col-1">
                                <ion-icon name="add-circle" size="large" id="wbdv-add-button"
                                          onClick={this.createNewCourse}
                                />
                            </div>
                        </nav>

                    </div>
                </form>

                <div className="row card" id="wbdv-page-background">
                    <div className="container col-lg-9 col-sm-12 table-responsive" id="wbdv-table-container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Update</th>
                                <th scope="col">Title</th>
                                <th scope="col">Owned By</th>
                                <th scope="col">Last Modified</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.courses.map(course =>
                                    <CourseRow
                                        key={course.id}
                                        deleteCourse={this.props.deleteCourse}
                                        courseDeleted={this.courseDeleted}
                                        course={course}
                                    />
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseTable