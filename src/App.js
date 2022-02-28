import "./App.css";
import isEmail from "validator/lib/isEmail";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [errorPassword, setPassword] = useState("");
  const [errorConfirmPassword, setConfirmPassword] = useState("");

  const { email, password, confirmPassword } = state;

  const isPasswordValidator = () => {
    console.log(password.length);
    if (password.length > 6) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("email is invalid");
    } else {
      setError("");
    }

    if (!isPasswordValidator()) {
      setPassword("password must be greater than 6letters");
    } else {
      setPassword("");
    }
    if (password === confirmPassword) {
      setConfirmPassword("");
    } else {
      setConfirmPassword("password and Cpassword not matched");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <form>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        {errorPassword && <p>{errorPassword}</p>}
        <div>
          <label htmlFor="confirm-password">confirm password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>
        {errorConfirmPassword && <p>{errorConfirmPassword}</p>}
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
