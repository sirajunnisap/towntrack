import { useState } from "react";
import axios from "axios";

function SubmitComplaint() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/complaints", {
        category,
        description,
      });

      alert("Complaint Submitted");
    } catch (error) {
        console.error(error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div>
      <h2>Submit Complaint</h2>

      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option>Select Category</option>
          <option>Water</option>
          <option>Waste</option>
          <option>Road</option>
          <option>Electricity</option>
        </select>

        <textarea
          placeholder="Describe the issue"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitComplaint;
