import React from 'react'
import ModuleListItem from "./ModuleListItem";

class ModuleList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      module: { title: '' },
      modules: this.props.modules
    };

    // this.titleChanged = this.titleChanged.bind(this);
  }

  createModule = () => {
    this.setState(
        {
          modules: [
            ...this.state.modules,
            this.state.module
          ]
        }
    )
  }

  deleteModule = (module) => {
      console.log("Made it here")
      const modulesBeforeDelete = this.state.modules
      const modulesAfterDelete = modulesBeforeDelete.filter(
              mod => mod.title !== module.title
          )
      this.setState(
          {
              modules: [
                  ...modulesAfterDelete
              ]
          }
      )
      console.log("Module Deleted");
      console.log(this.state.modules);

  }

  titleChanged = (event) => {
    this.setState(
        {
          module: {title: event.target.value}
        });
  }

  setActive = (module) =>{
      module.classList.add("active");
  }
  render() {
    return(
        <div>
          <h3>Module List</h3>
          <ul className="nav flex-column nav-pills">
            <li className="list-group-item">
              <input
                  onChange={this.titleChanged}
                  className="form-control"/>
              <button
                  onClick={this.createModule}
                  className="btn btn-primary btn-block">Add Module</button>
            </li>
            {
              this.state.modules.map(
                  (module) => {
                    return (
                        <ModuleListItem
                            selectModule={this.props.selectModule}
                            key={module.id}
                            module={module}
                            className={"nav-link wbdv-module-list-item"}
                            setActive={this.setActive}
                            deleteModule={this.deleteModule}/>
                    )
                  }
              )
            }
          </ul>
        </div>
    )
  }
}
export default ModuleList;