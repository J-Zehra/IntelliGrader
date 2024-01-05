/* eslint-disable import/prefer-default-export */
import { io } from "socket.io-client";

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : "https://intelli-grader-b-b4886838bad3.herokuapp.com/";

export const socket = io(url);

// export const socket = io(
//   "https://intelli-grader-backend-43b270ab373f.herokuapp.com/",
// );

// export const socket = io("http://127.0.0.1:5000/");
