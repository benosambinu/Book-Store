import React, { useContext, useEffect } from "react";
import Axios from "axios";
import qs from "qs";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { Tooltip } from "@material-ui/core";
import { URLContext } from "../Context";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "center",
  },
});

export default function AddUpdateBook({
  req = "post",
  ISBN,
  book_title,
  author,
  category,
  publisher,
  synopsis,
  price,
  stack_count,
  onChange,
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  let urlParam = "https://sheltered-taiga-67637.herokuapp.com/book/";
  if (ISBN) urlParam = `https://sheltered-taiga-67637.herokuapp.com/book/${ISBN}`;
  // eslint-disable-next-line
  const [url, setURL] = useContext(URLContext);

  const onSubmitHandler = (book) => {
    console.log("Register", book);
    Axios({
      method: req,
      url: urlParam,
      headers: {
        head: "good",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ISBN: book.ISBN,
        book_title: book.book_title,
        author: book.author,
        publisher: book.publisher,
        category: book.category,
        price: book.price,
        synopsis: book.synopsis,
        stack_count: book.stack_count,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    onChange(false);
    console.log("Book", book);
    setTimeout(
      () =>
        setURL(
          "https://sheltered-taiga-67637.herokuapp.com/book/?sort=book_title"
        ),
      400
    );
  };

  useEffect(() => {
    setURL(
      "https://sheltered-taiga-67637.herokuapp.com/book/?sort=book_title&cat="
    );
    // eslint-disable-next-line
  }, [onSubmitHandler]);

  return (
    <TableCell className={classes.container}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          className={classes.item}
          label="ISBN"
          name="ISBN"
          defaultValue={ISBN}
          inputRef={register({
            pattern: {
              value: /[0-9]+/,
              message: "Please Enter a Number",
            },
          })}
          required
        />
        {errors.ISBN && (
          <span style={{ color: "red" }}>Please Enter a Number</span>
        )}

        <TextField
          className={classes.item}
          label="Book Title"
          name="book_title"
          defaultValue={book_title}
          inputRef={register({ required: true })}
          required
        />
        {errors.book_title && <span>This field is required</span>}
        <TextField
          className={classes.item}
          label="Author"
          name="author"
          defaultValue={author}
          inputRef={register}
          required
        />
        {errors.author && <span>This field is required</span>}

        <TextField
          className={classes.item}
          label="Category"
          name="category"
          defaultValue={category}
          inputRef={register({ required: true })}
          required
        />
        {errors.category && <span>This field is required</span>}
        <TextField
          className={classes.item}
          label="Publisher"
          name="publisher"
          defaultValue={publisher}
          inputRef={register({ required: true })}
        />
        {errors.publisher && <span>This field is required</span>}
        <TextField
          className={classes.item}
          label="Synopsis"
          name="synopsis"
          defaultValue={synopsis}
          inputRef={register}
        />
        <TextField
          className={classes.item}
          label="Price"
          name="price"
          defaultValue={price}
          inputRef={register}
          required
        />
        {errors.price && <span>This field is required</span>}

        <TextField
          className={classes.item}
          label="Stack Count"
          name="stack_count"
          defaultValue={stack_count}
          inputRef={register({
            pattern: {
              value: /[0-9]+/,
              message: "Please Enter a Number", // <p>error message</p>
            },
          })}
          required
        />
        {errors.stack_count && (
          <span style={{ color: "red" }}>Please Enter a Number</span>
        )}

        <Tooltip title="Submit">
          <TextField type="submit" />
        </Tooltip>
      </form>
    </TableCell>
  );
}
