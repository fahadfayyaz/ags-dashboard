/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Dotdotdot from "react-dotdotdot";
import classNames from "classnames";
import moment from "moment";
import CheckIcon from "mdi-react/CheckIcon";
import PaperclipIcon from "mdi-react/PaperclipIcon";
import StarIcon from "mdi-react/StarIcon";
import { db, auth } from "../../../config/firebase";
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
    db.collection("contacts")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const contacts = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          contacts.push({ ...data, id: doc.id });
        });
        this.setState({ contacts: contacts, loading: false });
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

    return !this.state.contacts ? (
      <div />
    ) : (
      this.state.contacts.map((contact) => {
        return (
          <tr className={itemClass}>
            <td>
              <label
                htmlFor={contact.id}
                className="checkbox-btn checkbox-btn--colored-click inbox__email-list-item-checkbox"
              >
                <input
                  id={contact.id}
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
              {contact.name}
            </td>
            <td onClick={onLetter} className="inbox__email-table-preview">
              <Dotdotdot clamp={1}>
                <b>{contact.service}</b>
              </Dotdotdot>
            </td>
            <td onClick={onLetter}>{email.attach ? <PaperclipIcon /> : ""}</td>
            <td onClick={onLetter} className="inbox__email-table-date">
              {moment(contact.createdAt.toDate()).calendar()}
            </td>
          </tr>
        );
      })
    );
  }
}
