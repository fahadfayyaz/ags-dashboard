/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Dotdotdot from "react-dotdotdot";
import classNames from "classnames";
import moment from "moment";
import {
  Card,
  CardBody,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import CheckIcon from "mdi-react/CheckIcon";
import PaperclipIcon from "mdi-react/PaperclipIcon";
import StarIcon from "mdi-react/StarIcon";
import firestore, { db } from "../../../config/firebase";
import { EmailProps } from "../../../shared/prop-types/EmailProps";
import { Link } from "react-router-dom";

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
      show: false,
      edit: {},
    };
  }
  componentDidMount() {
    console.log("mounted");

    // db.collection("roles").doc("kpkjHRKTIVvR34UibH6c").collection("applied")
    //   .orderBy("createdAt", "desc")
    //   .get()
    //   .then((snapshot) => {
    //     const roles = [];
    //     snapshot.forEach((doc) => {
    //       const data = doc.data();
    //       roles.push({ ...data, id: doc.id });


    //     });


    //     this.setState({ roles: roles, loading: false });
    //   })
    //   .catch((error) => console.log(error));
    
   db.collection("roles").get().then(snapshot => {
      snapshot.forEach((d) => {
        
        const roles = [];
        console.log("doc:", d)
        
      db.collection("roles").doc(d.id).collection("applied").get().then(snapshot => {
          
            snapshot.forEach((doc)=>{
              // const roles = [];
              console.log(snapshot)
              const data = doc.data();
              roles.push({ ...data, id: doc.id });

            })
            this.setState({ roles: roles, loading: false });
          })     
          .catch((error) => console.log(error));    
      })
    })


  }
  handleClose = () =>
    this.setState({
      show: false,
    });
  handleShow = (id, email, message, name, resumeRef) => {
    console.log("clicked", id, email);
    let edit = {
      email: email,
      message: message,
      name: name,
      resumeRef: resumeRef,
    };
    this.setState({
      show: true,
      edit: edit,
    });
  };

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
    const { favorite, isChecked, show, className, roles } = this.state;
    const itemClass = classNames({
      "inbox__email-list-item": true,
      "inbox__email-list-item--unread": email.unread,
    });

    return !this.state.roles ? (
      <div />
    ) : (
      this.state.roles.map((role) => {
        return (
          <tr
            className={itemClass}
            onClick={() =>
              this.handleShow(
                role.id,
                role.email,
                role.message,
                role.name,
                role.resumeRef
              )
            }
          >
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
            <td className="inbox__email-table-name">{role.name}</td>
            <td className="inbox__email-table-preview">
              <Dotdotdot clamp={1}>
                <b>{role.email}</b>
              </Dotdotdot>
            </td>
            <td>{email.attach ? <PaperclipIcon /> : ""}</td>
            <td className="inbox__email-table-date">
              {moment(role.createdAt.toDate()).calendar()}
            </td>
            <div>
              <Modal
                isOpen={show}
                toggle={this.handleShow}
                className={className}
              >
                <ModalHeader>JOB Mail</ModalHeader>
                <ModalBody>
                  <div className="typography-message">
                    <h4>
                      <b>{this.state.edit.email} </b>
                    </h4>
                    <p>{this.state.edit.message}</p>
                    <p>Best regards,</p>
                    <p>{this.state.edit.name}</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.handleClose}>
                    Cancel
                  </Button>
                  {/*<Link to= {this.state.edit.resumeRef} >*/}
                  <Button
                    color="primary"
                    onClick={(e) =>
                      (window.location = `${this.state.edit.resumeRef}`)
                    }
                  >
                    Download CV
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </tr>
        );
      })
    );
  }
}