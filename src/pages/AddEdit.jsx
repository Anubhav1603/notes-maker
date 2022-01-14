import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast, ToastContainer } from "react-toastify";

const initialState = {
  subject: "",
  chapter: "",
  notes: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { subject, chapter, notes } = state;

  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("notes_app").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !chapter || !notes) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("notes_app").push(state, (err) => {
          if (err) {
            ToastContainer.error(err);
          } else {
            toast.success("notes added Successfully");
          }
        });
      } else {
        fireDb.child(`notes_app/${id}`).set(state, (err) => {
          if (err) {
            ToastContainer.error(err);
          } else {
            toast.success("notes updated Successfully");
          }
        });
      }

      setTimeout(() => history("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Subject</label>
        <input
          type="text"
          id="subject"
          placeholder="Your Name...."
          value={subject || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="subject">Chapter</label>
        <input
          type="text"
          id="chapter"
          placeholder="Your subject...."
          value={chapter || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="notes">notes</label>
        <input
          type="text"
          id="notes"
          placeholder="Your notes...."
          value={notes || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
