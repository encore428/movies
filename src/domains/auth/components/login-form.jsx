import { useHistory } from "react-router-dom"
import { Button } from "components/button";
import { TextField } from "components/text-field";
import * as React from "react";
import { useLogin, useLogout } from "../auth.state";
import { useAuth } from "domains/auth";

export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formStatus, setFormStatus] = React.useState("idle");
  const login = useLogin();
  const logout = useLogout();
  const history = useHistory();
  const {status} = useAuth();
  const MOVIE_ID = "movieId";

  if (status==="authenticated") {
    logout();
  }

  return (
    
    <div className="max-w-md mx-auto m-6 shadow">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setFormStatus("loading");
          login({ email, password })
            .then((res) => {
                console.log(`login success ${res}`);
                console.log(`look and found movieId to be ${localStorage.getItem(MOVIE_ID)}`);
                if (localStorage.getItem(MOVIE_ID) === null) {
                  history.push('/movie');
                } else {
                  history.push('/movie/' + localStorage.getItem(MOVIE_ID));
                }
              })
            .catch(() => setFormStatus("error"));
        }}
        className="p-6"
      >
        {formStatus === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            Fail to login.
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Login
        </div>
        <div className="space-y-6">
          <TextField
            label="Email"
            value={email}
            onChangeValue={setEmail}
            name="username"
            id="username"
            autoFocus
            required
            disabled={formStatus === "loading"}
          />
          <TextField
            label="Password"
            value={password}
            onChangeValue={setPassword}
            name="password"
            id="password"
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
            Login
          </Button>
        </div>
      </form>
      <div className="p-6">
        <a href="/register">
          <Button
            variant="outline"
            className="w-full"
            disabled={status === "loading"}
          >
            Register new user
        </Button></a>
      </div>
    </div>
  );
};
