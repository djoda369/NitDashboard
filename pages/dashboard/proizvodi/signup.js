import { useRef, useState } from "react";

export default function SignUp() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const [error, setError] = useState();

  const handler = async function (e) {
    e.preventDefault();

    const username = usernameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const response = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setError(null); // Clear previous errors if any
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setError(data.message);
    return data;
  };

  return (
    <div>
      <form>
        <label>
          Username
          <input type="text" ref={usernameInputRef} />
        </label>
        <label>
          EMail
          <input type="email" ref={emailInputRef} />
        </label>
        <label>
          Password
          <input type="password" ref={passwordInputRef} />
        </label>
        <button onClick={handler}>Create Account</button>
      </form>
      <div>{error}</div>

      {/* masalaki1105 */}
    </div>
  );
}
