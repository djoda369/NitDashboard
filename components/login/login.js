import classes from "./styles.module.scss";
import { useRef } from "react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "../../public/logo/NitLogo1.png";

export default function LogIn() {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    // const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      // username: enteredUsername,
      password: enteredPassword,
    });

    console.log(result);
  }

  return (
    <div className={classes.login}>
      <form>
        <div>
          <Image src={Logo} alt="NitNis Logo" />
        </div>
        <label>
          <span>Email</span>
          <input type="email" placeholder="email" ref={emailInputRef} />
        </label>
        {/* <label>
          <span>Username</span>
          <input type="text" placeholder="username" ref={usernameInputRef} />
        </label> */}
        <label>
          <span>Password</span>
          <input
            type="password"
            placeholder="password"
            ref={passwordInputRef}
          />
        </label>
        <button onClick={submitHandler}>Log In</button>
      </form>
    </div>
  );
}
