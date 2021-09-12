import * as React from "react";
import { fetchJson } from "lib/fetch-json";
import { BASE_URL } from "const";

const ACCESS_TOKEN_STORAGE = "auth";
const USER_ID_STORAGE = "userid";
const USER_NAME_STORAGE = "username";
const MOVIE_ID = "movieId";

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE);
const storedUserId = localStorage.getItem(USER_ID_STORAGE);
const storedUserName = localStorage.getItem(USER_NAME_STORAGE);
const storedMovieId = localStorage.getItem(MOVIE_ID);

const AUTH_DEFAULT_STATE = storedAccessToken
  ? {
      status: "authenticated",
      accessToken: storedAccessToken,
      userId: storedUserId,
      userName: storedUserName,
      userMovieId: storedMovieId
    }
  : {
      status: "anonymous",
      accessToken: null,
      userId: "",
      userName: "",
      userMovieId: storedMovieId
    };

const AuthContext = React.createContext();

const authReducer = (state, event) => {
  console.log(`in authReducer event.type=${event.type}`);
  switch (event.type) {
    case "register":
      return {
        accessToken: null,
        status: "anonymous",
        userId: "",
        userName: ""
      };

    case "login":
      console.log(`in authReducer event.userId=${event.userId}`);
      return {
        accessToken: event.accessToken,
        status: "authenticated",
        userId: event.userId,
        userName: event.userName
      };

    case "logout":
      return {
        accessToken: null,
        status: "anonymous",
        userId: "",
        userName: ""
      };

    default:
      throw new Error(`Unsupported event type ${event.type} in authReducer`);
  }
};

export const useAuthState = () => {
  console.log(`in useAuthState ${AUTH_DEFAULT_STATE}`);
  const [state, dispatch] = React.useReducer(authReducer, AUTH_DEFAULT_STATE);
  console.log(`in useAuthState state ${state}`);
  const register = () =>
    dispatch({
      type: "register",
    });

  console.log(`in useAuthState after despatch register`);

  const login = (accessToken, userId, userName) =>
    dispatch({
      type: "login",
      accessToken,
      userId,
      userName
    });

  console.log(`in useAuthState after despatch login`);

  const logout = () =>
    dispatch({
      type: "logout",
    });

  console.log(`in useAuthState after despatch logout`);

  return {
    ...state,
    register,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthState();
  console.log(`in AuthProvider with children=${children}`);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return auth;
};

const register = (name, email, password) =>
fetchJson(`${BASE_URL}/register`, {
  method: "POST",
  body: {
    name: name,
    email: email,
    password: password,
    avatar: "http://github.com/malcolm-kee.png"
  },
});

const login = (email, password) =>
  fetchJson(`${BASE_URL}/login`, {
    method: "POST",
    body: {
      username: email,
      password
      },
  });

const whoami = (token) =>
  fetchJson(`${BASE_URL}/whoami`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
});

export const useRegister = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }


  return function invokeRegister({name, email, password1 }) {
    return register(name, email, password1);
  }
}

export const useLogin = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return function invokeLogin({ email, password }) {
    return login(email, password)
              .then((res1) => {
                  whoami(res1.access_token).then((res2) => {
                    auth.login(res1.access_token, res2.userId, res2.name);
                    localStorage.setItem(ACCESS_TOKEN_STORAGE, res1.access_token);
                    localStorage.setItem(USER_ID_STORAGE, res2.userId);
                    localStorage.setItem(USER_NAME_STORAGE, res2.name);
                    console.log(`invokeLogin completed with ${res2.userId} ${res2.name}`)
                  })
              });
  }
};

export const useLogout = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return () => {
    auth.logout();
    localStorage.removeItem(ACCESS_TOKEN_STORAGE);
    localStorage.removeItem(USER_ID_STORAGE);
    localStorage.removeItem(USER_NAME_STORAGE);
    localStorage.removeItem(MOVIE_ID);
  };
};
