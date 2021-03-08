import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Signuppage() {
  const url = "http://localhost:5000/signup";
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });
  const handldeChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };
  const submit = (e) => {
    e.preventDefault();
    // console.log(data);
    axios
      .post(url, {
        name: data.name,
        password: data.password,
        email: data.email,
        company: data.company,
      })
      .then((res) => {
        console.log(res);
      });
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          name="name"
          onChange={handldeChange}
          value={data.name}
        />
        <input
          type="text"
          name="password"
          onChange={handldeChange}
          value={data.password}
        />
        <input
          type="text"
          name="email"
          onChange={handldeChange}
          value={data.email}
        />
        <input
          type="text"
          name="company"
          onChange={handldeChange}
          value={data.company}
        />
        <button onSubmit={submit}>Submit</button>
      </form>
      working
    </div>
  );
}
