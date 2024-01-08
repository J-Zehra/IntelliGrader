/* eslint-disable import/prefer-default-export */
import { io } from "socket.io-client";

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : "https://intelli-grader-b-b4886838bad3.herokuapp.com/";

export const socket = io(url);
