import React, { PureComponent, useState } from "react";
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
import TextEditor from "../../../../shared/components/text-editor/TextEditor";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import MatTableHead from "./MatTableHead";
import MatTableToolbar from "./MatTableToolbar";
import { db } from "../../../../config/firebase";
import { Editor } from "draft-js";

//function createData(name, calories, fat, carbs, protein) {
//  counter += 1;
//  return {
//    id: counter,
//    name,
//    calories,
//    fat,
//    carbs,
//    protein,
//  };
//}

function getSorting(order, orderBy) {
  if (order === "desc") {
    return (a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      return 0;
    };
  }
  return (a, b) => {
    if (a[orderBy] > b[orderBy]) {
      return -1;
    }
    if (a[orderBy] < b[orderBy]) {
      return 1;
    }
    return 0;
  };
}

export default class MatTable extends PureComponent {
  state = {
    order: "asc",
    orderBy: "calories",
    key: "",
    selected: new Map([]),
    show: false,
    edit: {},

    data: [
      //  createData("Cupcake", 305, 3.7, 67, 4.3),
      //  createData("Donut", 452, 25.0, 51, 4.9),
      //  createData("Eclair", 262, 16.0, 24, 6.0),
      //  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      //  createData("Gingerbread", 356, 16.0, 49, 3.9),
      //  createData("Honeycomb", 408, 3.2, 87, 6.5),
      //  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      //  createData("Jelly Bean", 375, 0.0, 94, 0.0),
      //  createData("ftafat", 518, 26.0, 65, 7.0),
      //  createData("Lollipop", 392, 0.2, 98, 0.0),
      //  createData("Marshmallow", 318, 0, 81, 2.0),
      //  createData("Nougat", 360, 19.0, 9, 37.0),
      //  createData("Oreo", 437, 18.0, 63, 4.0),
    ],
    page: 0,
    rowsPerPage: 5,
  };

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
        this.setState({ data: roles, loading: false });
        console.log(this.state.data);
      })
      .catch((error) => console.log(error));
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClose = () =>
    this.setState({
      show: false,
    });
  handleShow = (id, position, type, location, content) => {
    console.log("clicked", id, position);
    let edit = {
      position: position,
      type: type,
      location: location,
      content: content,
    };
    this.setState({
      show: true,
      edit: edit,
    });
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const { data } = this.state;
      const newSelected = new Map();
      data.map((n) => newSelected.set(n.id, true));
      this.setState({ selected: newSelected });
      return;
    }
    this.setState({ selected: new Map([]) });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const newSelected = new Map(selected);
    const value = newSelected.get(id);
    let isActive = true;
    if (value) {
      isActive = false;
    }
    newSelected.set(id, isActive);
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteSelected = () => {
    const { data } = this.state;
    let copyData = [...data];
    const { selected } = this.state;

    for (let i = 0; i < [...selected].filter((el) => el[1]).length; i += 1) {
      copyData = copyData.filter((obj) => obj.id !== selected[i]);
    }

    this.setState({ data: copyData, selected: new Map([]) });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return !!selected.get(id);
  };

  delete(id) {
    db.collection("roles")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  // Example() {
  //   // const [show, setShow] = useState(false);

  //   // const handleClose = () => setShow(false);
  //   // const handleShow = () => setShow(true);

  //   return (
  //     <>
  //       {console.log("log")}
  //       <Modal show={show} onHide={handleClose}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Modal heading</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={handleClose}>
  //             Close
  //           </Button>
  //           <Button variant="primary" onClick={handleClose}>
  //             Save Changes
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </>
  //   );
  // }
  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      show,
    } = this.state;
    const { buttonLabel, className } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log("render data ", data);

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Material table</h5>
            </div>
            <MatTableToolbar
              numSelected={[...selected].filter((el) => el[1]).length}
              handleDeleteSelected={this.handleDeleteSelected}
              onRequestSort={this.handleRequestSort}
            />
            <div className="material-table__wrap">
              <Table className="material-table">
                <MatTableHead
                  numSelected={[...selected].filter((el) => el[1]).length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((d) => {
                      const isSelected = this.isSelected(d.id);
                      return (
                        <TableRow
                          className="material-table__row"
                          role="checkbox"
                          onClick={(event) => this.handleClick(event, d.id)}
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={d.id}
                          selected={isSelected}
                        >
                          <TableCell
                            className="material-table__cell"
                            padding="checkbox"
                          >
                            <Checkbox
                              checked={isSelected}
                              className="material-table__checkbox"
                            />
                          </TableCell>
                          <TableCell
                            className="material-table__cell material-table__cell-right"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {d.position}
                          </TableCell>
                          <TableCell className="material-table__cell material-table__cell-right">
                            {d.type}
                          </TableCell>
                          <TableCell className="material-table__cell material-table__cell-right">
                            {d.location}
                          </TableCell>
                          <TableCell className="material-table__cell material-table__cell-right">
                            <DeleteIcon
                              onClick={this.delete.bind(this, d.id)}
                            />
                          </TableCell>
                          <TableCell className="material-table__cell material-table__cell-right">
                            <EditIcon
                              onClick={() =>
                                this.handleShow(
                                  d.id,
                                  d.position,
                                  d.type,
                                  d.location,
                                  d.content
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              className="material-table__pagination"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              dir="ltr"
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
            />
          </CardBody>
        </Card>
        <div>
          <Modal isOpen={show} toggle={this.handleShow} className={className}>
            <ModalHeader>Edit Job</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="Position">Position</Label>
                  <Input
                    type="Text"
                    name="Position"
                    id="Position"
                    placeholder="Position"
                    value={this.state.edit.position}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Type">Type</Label>
                  <Input
                    type="Text"
                    name="Type"
                    id="Type"
                    placeholder="Type"
                    value={this.state.edit.type}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Type">Location</Label>
                  <Input
                    type="Text"
                    name="Location"
                    id="Location"
                    placeholder="Location"
                    value={this.state.edit.location}
                    onChange={this.onInputchange.bind(this)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleText">Text Area</Label>
                  {/* <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    value={this.state.edit.content}
                  /> */}
                </FormGroup>
                <CardBody>
                  <TextEditor value={this.state.edit.content}></TextEditor>
                </CardBody>
                <Button style={{ marginRight: "40px" }}>Submit</Button>
                <Button color="secondary" onClick={this.handleClose}>
                  Cancel
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        </div>
      </Col>
    );
  }
}
