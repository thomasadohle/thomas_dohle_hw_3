import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({course, deleteCourse, courseDeleted}) =>
<div className="col-sm-12 col-md-4 col-lg-2">
        <div className="card"
             styles={{width: '18rem'}}>
            <img className="card-img-top"
                 src="https://picsum.photos/300/200"/>
            <div className="card-body">
                <h5 className="card-title">{course.courseTitle}</h5>
                <p className="card-text">Card text.</p>
                <Link className="btn btn-primary" to={`/course/${course.id}`}>Edit</Link>
                <a onClick={() => {
                    deleteCourse(course)
                    courseDeleted(course)
                }}
                   className="btn btn-danger">Delete</a>
            </div>
        </div>
</div>

export default CourseCard;