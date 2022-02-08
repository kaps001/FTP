import React, { useRef, useState } from "react";

const AddTransection = () => {
  const baseURL = "http://localhost:8000";
  const transection_type = useRef(null);
  const amount = useRef(null);
  const description = useRef(null);
  const [postResult, setPostResult] = useState(null);
  async function postData() {
    const postData = {
    transection_type: transection_type.current.value,
    amount: parseInt(amount.current.value),
    description: description.current.value,
    };
   
    try {
      const res = await fetch(`${baseURL}/transection`, {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
      },
      
        body: JSON.stringify(postData),
      });

      
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
        },
        data: data,
      };
      //console.log(result.data.message);
      setPostResult(result.data.message);
    } catch (err) {
      setPostResult(err.message);
    }
   
    
  }
  let styles={
    color:"#41464b",
    background: "#e2e3e5",
    border: "#0dcaf0"
};
  return (
    <body>
      <div className="container">
        <h2>New transection</h2>
        { postResult && <div className="alert alert-secondary mt-2" style={styles} role="alert"><pre>{postResult}</pre></div> }
        <div className="form-group">
          <label for="email">Transection Type:</label>
          <select
            className="form-control"
            id="email"
            ref={transection_type}
            placeholder="Enter email"
            name="transection_type" required
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div className="form-group">
          <label for="amount">Amount:</label>
          <input
            type="text"
            className="form-control"
            ref={amount}
            id="amount"
            placeholder="Enter amount"
            name="amount" required
          />
        </div>
        <div className="form-group">
          <label for="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            ref={description}
            placeholder="Enter Description"
            name="description" required
          ></textarea>
        </div>
        <button
          type="button"
          onClick={postData}
          className="btn btn-default"
        >
          Submit
        </button>
       
      </div>
    </body>
  );
};

export default AddTransection;
