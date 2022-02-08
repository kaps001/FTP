import axios from "axios";
import React from "react";
const baseURL = "http://localhost:8000/transection/";
function TransectionList() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  var allTransections = post.data;
  return (
    <table className="table my-3">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Credit</th>
          <th scope="col">Debit</th>
          <th scope="col">Running Balance</th>
        </tr>
      </thead>
      <tbody>
        {allTransections.map((allTransection, iteam) => (
          <tr>
            <th scope="row" key={allTransection.transection_date}>
              {allTransection.transection_date}
            </th>
            <td key={allTransection.description}>
              {allTransection.description}
            </td>
            <td key={allTransection.credit_amount}>
              {
                (allTransection.credit_amount =
                  allTransection.transection_type === "credit"
                    ? allTransection.credit_amount
                    : "-")
              }
            </td>
            <td key={allTransection.debit_amount}>
              {
                (allTransection.debit_amount =
                  allTransection.transection_type === "debit"
                    ? allTransection.debit_amount
                    : "-")
              }
            </td>
            <td key={allTransection.running_balance}>
              {allTransection.running_balance}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TransectionList;
