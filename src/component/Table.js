import React, { useState, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddUpdateBook from "../component/AddUpdateBook";
import Tooltip from "@material-ui/core/Tooltip";
import { URLContext } from "../Context";
import Axios from "axios";

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#172b4d",

    color: "white",
  },
  body: {
    fontSize: 22,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [url, setURL] = useContext(URLContext);

  const classes = useStyles();
  const [editingBook, seteditingBook] = useState(false);

  function DeleteBookHandler() {
    setURL(`${url}${row.ISBN}`);
    Axios.delete(
      `https://sheltered-taiga-67637.herokuapp.com/book/${row.ISBN}`
    );

    setTimeout(
      () =>
        setURL(
          "https://sheltered-taiga-67637.herokuapp.com/book/?sort=book_title"
        ),
      400
    );
  }

  function handleChange(newValue) {
    seteditingBook(newValue);
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <StyledTableCell>
          <Tooltip title="Expand">
            <IconButton
              color="primary"
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {props.counter}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.book_title}
        </StyledTableCell>
        <StyledTableCell align="right">{row.ISBN}</StyledTableCell>
        <StyledTableCell align="right">{row.author}</StyledTableCell>
        <StyledTableCell align="right">{row.publisher}</StyledTableCell>
        <StyledTableCell align="right">{row.category}</StyledTableCell>
        <StyledTableCell align="right">{row.price}</StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No</StyledTableCell>
                    <StyledTableCell>Book Title</StyledTableCell>
                    <StyledTableCell align="right">ISBN</StyledTableCell>
                    <StyledTableCell align="right">Author</StyledTableCell>
                    <StyledTableCell align="right">Category</StyledTableCell>
                    <StyledTableCell align="right">Publisher</StyledTableCell>
                    <StyledTableCell align="center">Synopsis</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Stack Count</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                {editingBook ? (
                  <AddUpdateBook
                    req="put"
                    ISBN={row.ISBN}
                    book_title={row.book_title}
                    author={row.author}
                    category={row.category}
                    publisher={row.publisher}
                    synopsis={row.synopsis}
                    price={row.price}
                    stack_count={row.stack_count}
                    onChange={handleChange}
                  />
                ) : (
                  <TableBody>
                    <TableRow>
                      <StyledTableCell align="right">
                        {props.counter}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.book_title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.ISBN}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.author}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.category}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.publisher}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.synopsis}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.stack_count}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Tooltip title="Edit">
                          <EditOutlinedIcon
                            color="primary"
                            style={{ marginLeft: "15px" }}
                            onClick={() => seteditingBook(true)}
                          />
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Tooltip title="Delete">
                          <DeleteOutlinedIcon
                            color="primary"
                            onClick={DeleteBookHandler}
                          />
                        </Tooltip>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AdminTable({ book }) {
  let counter = 1;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Book Title</StyledTableCell>
            <StyledTableCell align="right">ISBN</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Publisher</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {book.map((row) => (
            <Row key={row.ISBN} row={row} counter={counter++} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
