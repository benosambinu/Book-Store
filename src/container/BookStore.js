import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, { useState, useEffect, useContext } from "react";
import { URLContext } from "../Context";
import Axios from "axios";
import AdminHeader from "../component/AdminHeader";
import AdminTable from "../component/Table";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  card: {
    backgroundColor: "#172b4d",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
    width: "auto",
    height: "auto",
    margin: "70px 50px 100px 50px",
    borderRadius: "15px",
    boxShadow:
      "5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22)",
    cursor: "pointer",
  },
});

export default function BookStore() {
  const [book, setBook] = useState([]);
  const [bookURL] = useContext(URLContext);

  useEffect(() => {
    async function getBookAsync() {
      try {
        let response = await Axios.get(`${bookURL}`);
        console.log("getBookAsync -> bookURL", bookURL);

        setBook(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getBookAsync();
  }, [bookURL]);
  const classes = useStyles();
  return (
    <>
      <AdminHeader book={book} />
      <Card className={classes.root}>
        <CardContent className={classes.card}>
          <AdminTable book={book} />
        </CardContent>
      </Card>
    </>
  );
}
