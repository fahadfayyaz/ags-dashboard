import React, { Component } from "react";
import PropTypes from "prop-types";

import { ThemeProps } from "../../../shared/prop-types/ReducerProps";

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const todoSidebarImg = `${process.env.PUBLIC_URL}/img/sidebar_img.svg`;

class TodoInput extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    togglePriorityFilter: PropTypes.func.isRequired,
    theme: ThemeProps.isRequired,
    rtl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      priority: "low",
      modal: false,
      startDate: new Date(),
    };

    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handlePriorityChange(event) {
    this.setState({
      priority: event.value,
    });
  }

  handlePriorityFilterChange(event) {
    const { togglePriorityFilter } = this.props;
    togglePriorityFilter(event.target.value);
  }

  handleDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { priority, startDate } = this.state;
    const { theme, rtl } = this.props;

    return (
      <div className="todo__input-new">
        <div className="todo__sidebar">
          <div className="todo__priority-filter">
            <p className="title">Priority</p>
            <ul className="todo__priority-filter-list">
              <li>
                <input
                  className="todo__filter-radio"
                  type="radio"
                  id="priority-all"
                  name="priority-filter"
                  value=""
                  onClick={this.handlePriorityFilterChange.bind(this)}
                  defaultChecked
                />
                <label htmlFor="priority-all">All</label>
              </li>
              <li>
                <input
                  className="todo__filter-radio"
                  type="radio"
                  id="priority-low"
                  name="priority-filter"
                  value="low"
                  onClick={this.handlePriorityFilterChange.bind(this)}
                />
                <label htmlFor="priority-low">Post</label>
              </li>
              <li>
                <input
                  className="todo__filter-radio"
                  type="radio"
                  id="priority-medium"
                  name="priority-filter"
                  value="medium"
                  onClick={this.handlePriorityFilterChange.bind(this)}
                />
                <label htmlFor="priority-medium">Pending</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default TodoInput;
