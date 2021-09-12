import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { AppShell } from "./app-shell";
import { AuthProvider } from "./domains/auth";
import "./index.css";
import { MoviesPage } from "./pages/movies-page";
import { MovieDetailsPage } from "./pages/movie-details";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <AppShell>
        {/* should be shown at /register */}
        <Route path="/register">
          <RegisterPage />
        </Route>
        {/* should be shown at /login */}
        <Route path="/login">
          <LoginPage />
        </Route>
        {/* should be shown at /movie/{movieId} */}
        <Route path="/movie/:movieId">
          <MovieDetailsPage />
        </Route>
        {/* should be shown at / */}
        <Route exact path="/movie">
        <MoviesPage />
        </Route>
        {/* should be shown at / */}
        <Route exact path="/">
        <MoviesPage />
        </Route>
      </AppShell>
    </AuthProvider>
  </BrowserRouter>,
  document.querySelector("#root")
);
