import { useHistory } from "react-router-dom"
import { Button } from "components/button";
import { TextField } from "components/text-field";
import * as React from "react";
import { useRegister, useLogout } from "../auth.state";
import { useAuth } from "domains/auth";

export const RegisterForm = () => {
  const [statusMsg, setStatusMsg] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [formStatus, setFormStatus] = React.useState("idle");
  const register = useRegister();
  const {status} = useAuth();
  const logout = useLogout();
  const history = useHistory();

  if (status==="authenticated") {
    logout();
  }

  return (
    <div className="max-w-md mx-auto m-6 shadow">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setFormStatus("loading");
          setName(name.trim());
          setPassword1(password1.trim());
          if (password1.trim().length<8) {
              setStatusMsg("Minimum password length is 8 characters, try again.");
              setFormStatus("error");
          } else {
              setPassword2(password2.trim());
              if (password1 !== password2) {
                  setStatusMsg("Password do not match, try again.");
                  setFormStatus("error");
              } else {
                  console.log("going to register"+ email);
                  register({ name, email, password1 })
                    .then(() => {history.push('/login');})
                    .catch((err) => {
                      console.log(`register err`, err.message);
                      if (err.message === 'Conflict') {
                        setStatusMsg(`Email ${email} already registered.`);
                      } else {
                        setStatusMsg("Registration failed.");
                      }
                      setFormStatus("error");
                    });
              }
          }
        }}
        className="p-6"
      >
        {formStatus === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            {statusMsg}
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Register a new user
        </div>
        <div className="space-y-6">
          <TextField
            label="Name"
            value={name}
            onChangeValue={setName}
            name="name"
            id="name"
            autoFocus
            required
            disabled={formStatus === "loading"}
          />
          <TextField
            label="Email"
            value={email}
            onChangeValue={setEmail}
            name="email"
            id="email"
            type="email"
            required
            disabled={formStatus === "loading"}
          />
          <TextField
            label="Password"
            value={password1}
            onChangeValue={setPassword1}
            name="password1"
            id="password1"
            type="password"
            required
            disabled={formStatus === "loading"}
          />
          <TextField
            label="Password2"
            value={password2}
            onChangeValue={setPassword2}
            name="repeat password"
            id="password2"
            type="password"
            required
            disabled={formStatus === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={formStatus === "loading"}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
