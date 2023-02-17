import { React, useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../Components/firebase";

function Reset() {
  const [email, setEmail] = useState("");
  
  return (
    <div>
      <div className="reset">
        <input
          type="text"
          className="resetInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="resetInput"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;