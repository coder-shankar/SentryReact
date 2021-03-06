import React, { Component } from "react";

import * as projectServices from "../services/projectServices";
import Header from '../component/Header';


export default class ProjectInstance extends Component {
  constructor() {
    super();
    this.state = {
      instanceName: ""
    };
  }

  addNewProject = () => {
    return (
      <div className="add-new-project-instance">
        <p>
          <strong>Add a new Project Instance</strong>
        </p>

        <label>Instance Name : </label>
        <input
          value={this.state.instanceName}
          onChange={this.onChange}
          type="text"
          name="instanceName"
        />

        <div>
          <input
            type="submit"
            value="CREATE INSTANCE"
            onClick={this.onSubmit}
          />
          <button
            type="button"
            value="DashBoard"
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  };

  onChange = e => {
    this.setState({
      instanceName: e.target.value,
      instanceKey: ""
    });
  };

  onSubmit = async () => {
    console.log("clicked", this.state.instanceName);
    if (this.state.instanceName === '') {
      return alert("Empty Field")
    }
    //here write api call to create a new instance
    const respond = await projectServices
      .createNewProjectInstance(
        this.state.instanceName,
        this.props.activeProject
      )
      .then(res => {
        console.log("here", res)
        return res.data.data;
      });

    console.log("the respond from api is ", respond);

    this.setState({
      instanceKey: respond.instance_key
    });
  };


  render() {
    return (
      <div>
        <Header {...this.props} />
        <div className="dashboard-wrapper">
          <p> Project : {this.props.activeProject}</p>
          {this.addNewProject()}
          <div className="instance-key-wrapper">
            your instance key is:
          {this.state.instanceKey}
          </div>
        </div>
      </div>
    );
  }
}
