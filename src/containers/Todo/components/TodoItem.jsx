import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";
import DeleteForeverIcon from "mdi-react/DeleteForeverIcon";
import classNames from "classnames";

import { db, auth } from "../../../config/firebase";
import todoCard from "../types";

class TodoItem extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      editTodo: PropTypes.func,
      completeTodo: PropTypes.func,
      deleteTodo: PropTypes.func,
      updateTodo: PropTypes.func,
    }).isRequired,
    todo: todoCard.isRequired,
  };

  constructor(props) {
    super(props);

    const { todo } = this.props;

    this.state = {
      title: todo.title,
      completed: todo.completed,
      description: todo.description,
      priority: todo.priority,
    };
  }

  componentDidMount() {
    console.log("mounted");
    db.collection("roles")
      .get()
      .then((snapshot) => {
        const roles = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          roles.push({ ...data, id: doc.id });
        });
        this.setState({ roles: roles, loading: false });
      })
      .catch((error) => console.log(error));
  }

  handleComplete() {
    const { todo, actions } = this.props;
    const { checked } = this.state;

    actions.completeTodo(todo.id);
    this.setState({
      checked: !checked,
    });
  }

  handleDelete() {
    const { todo, actions } = this.props;

    actions.deleteTodo(todo.id);
  }

  handleEdit() {
    const { todo, actions } = this.props;

    actions.editTodo(todo.id);
  }

  handleUpdate() {
    const { todo, actions } = this.props;
    const { title } = this.state;

    if (title !== "") {
      actions.updateTodo(todo.id, title);
    }
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  render() {
    const { title, completed, description, priority } = this.state;

    const priorityColorsClass = classNames({
      "todo__priority-indicator": true,
      low: priority === "low",
      medium: priority === "medium",
      high: priority === "high",
    });

    return !this.state.roles ? (
      <div />
    ) : (
      this.state.roles.map((role) => {
        return (
          <Card>
            <CardBody className="todo__item">
              <label htmlFor={role.position} className="todo__label-checkbox">
                <input
                  id={role.position}
                  type="checkbox"
                  className="todo__complete-toggle"
                  defaultChecked={completed}
                  required
                  onClick={this.handleComplete.bind(this)}
                />
                <span className="checkbox-indicator" />
              </label>
              <div className="todo__info">
                <div className="todo__header">
                  <h3>{role.position}</h3>
                  <div className="todo__additional">
                    {/* <p className="todo__due-date">Due date: 22.05.19</p> */}
                    <span className="todo__priority">{role.type}</span>
                    <span className={priorityColorsClass} />
                  </div>
                </div>
                <div className="todo__content">
                  <div className="todo__description">{role.location}</div>
                  <button
                    className="todo__delete-btn"
                    type="button"
                    onClick={this.handleDelete.bind(this)}
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })
    );
  }
}

export default TodoItem;
