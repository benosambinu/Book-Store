import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import AddBook from "./AddBook";
import FilterAndSortBook from "./FilterAndSortBook";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  card: {
    display: "flex",
    background:
      "linear-gradient(90deg, rgba(86,103,221,1) 0%, rgba(94,203,247,1) 100%)",
    color: "black",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
    width: "auto",
    height: "auto",
    boxShadow: "6px 10px 5px -1px rgba(23,43,77,0.84)",
    cursor: "pointer",
  },
});

export default function AdminHeader({ book }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <FilterAndSortBook book={book} />
      <AddBook />
    </Card>
  );
}
