/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Dotdotdot from "react-dotdotdot";
import classNames from "classnames";
import moment from "moment";
import CheckIcon from "mdi-react/CheckIcon";
import PaperclipIcon from "mdi-react/PaperclipIcon";
import StarIcon from "mdi-react/StarIcon";
import firebase, { db } from "../../../config/firebase";
import { EmailProps } from "../../../shared/prop-types/EmailProps";

export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: EmailProps.isRequired,
    onLetter: PropTypes.func.isRequired,
    itemId: PropTypes.number.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    const prevProps = state.prevProps || {};
    const isChecked =
      prevProps.isChecked !== props.isChecked
        ? props.isChecked
        : state.isChecked;
    return {
      prevProps: props,
      favorite: state.favorite,
      isChecked,
    };
  }

  constructor() {
    super();
    this.state = {
      favorite: false,
      isChecked: false,
    };
  }
  componentDidMount() {
    console.log("mounted");

    db.collection("roles")
      .doc("9mOF2BUSIXBYSZZeRiCR")
      .collection("applied")
      .orderBy("createdAt", "desc")
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

  onFavorite = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ favorite: !prevState.favorite }));
  };

  onChangeSelect = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  render() {
    const { email, onLetter, itemId } = this.props;
    const { favorite, isChecked } = this.state;
    const itemClass = classNames({
      "inbox__email-list-item": true,
      "inbox__email-list-item--unread": email.unread,
    });

    return !this.state.roles ? (
      <div />
    ) : (
      this.state.roles.map((role) => {
        return (
          <tr className={itemClass}>
            <td>
              <label
                htmlFor={role.id}
                className="checkbox-btn checkbox-btn--colored-click inbox__email-list-item-checkbox"
              >
                <input
                  id={role.id}
                  className="checkbox-btn__checkbox"
                  type="checkbox"
                  checked={isChecked}
                  onChange={this.onChangeSelect}
                />
                <span className="checkbox-btn__checkbox-custom">
                  <CheckIcon />
                </span>
              </label>
            </td>
            <td onClick={this.onFavorite}>
              <StarIcon
                className={`inbox__favorite${favorite ? " active" : ""}`}
              />
            </td>
            <td className="inbox__email-table-name" onClick={onLetter}>
              {role.name}
            </td>
            <td onClick={onLetter} className="inbox__email-table-preview">
              <Dotdotdot clamp={1}>
                <b>{role.email}</b>
              </Dotdotdot>
            </td>
            <td onClick={onLetter}>{email.attach ? <PaperclipIcon /> : ""}</td>
            <td onClick={onLetter} className="inbox__email-table-date">
              {moment(role.createdAt.toDate()).calendar()}
            </td>
          </tr>
        );
      })
    );
  }
}
