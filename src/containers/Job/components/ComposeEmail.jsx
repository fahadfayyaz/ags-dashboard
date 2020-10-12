import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, ButtonToolbar } from "reactstrap";
import PropTypes from "prop-types";
import TextEditor from "../../../shared/components/text-editor/TextEditor";
import firebase, { db, auth } from "../../../config/firebase";
// import ReactQuill from "react-quill";
const renderTextEditor = ({ input }) => <TextEditor {...input} />;

renderTextEditor.propTypes = {
  input: PropTypes.shape().isRequired,
};

const ComposeEmail = () => {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("roles")
      .add({
        content: content,
        location: location,
        type: type,
        position: position,
      })
      .then(() => {
        alert("Successfully Added");
        setLoader(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setContent("");
    setLocation("");
    setPosition("");
    setType("");
  };
  return (
    <>
      <form className="form inbox__content" onSubmit={handleSubmit}>
        <h5 className="inbox__compose-title bold-text">Compose new message</h5>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="Position"
              component="input"
              type="text"
              placeholder="Position:"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="form__form-group-field">
            <Field
              name="Location"
              component="input"
              type="text"
              placeholder="Location:"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form__form-group-field">
            <Field
              name="to"
              component="input"
              type="text"
              placeholder="Type:"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
        </div>
        {/* <div className="form__form-group">
      <div className="form__form-group-field">
        <Field
          name="subject"
          component="input"
          type="text"
          placeholder="Subject:"
        />
      </div>
    </div> */}
        <div className="form__form-group" dir="ltr">
          {/* <Field
            name="text"
            component="input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          /> */}


           <TextEditor
            editorState={content}
            onChange={(e) => setContent(e.target.value)}
            ></TextEditor>
        </div>
        {/* <div className="form__form-group">
      <Button
        outline
        onClick={(e) => {
          e.preventDefault();
        }}
        className="inbox__files-btn"
        size="sm"
      >
        Add files
      </Button>
    </div> */}
        <ButtonToolbar className="form__button-toolbar">
          <Button color="primary" type="submit" onClick={() => setLoader(true)}>
            Send
          </Button>
          <Button type="submit">Cancel</Button>
        </ButtonToolbar>
      </form>
    </>
  );
};
ComposeEmail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "compose_email_form", // a unique identifier for this form
})(ComposeEmail);
