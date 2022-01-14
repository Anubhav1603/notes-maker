import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`notes_app/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  console.log("user", user);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Notes Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Subject: </strong>
          <span>{user.subject}</span>
          <br />
          <br />
          <strong>Chapter: </strong>
          <span>{user.chapter}</span>
          <br />
          <br />
          <strong>Note: </strong>
          <span>{user.notes}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
