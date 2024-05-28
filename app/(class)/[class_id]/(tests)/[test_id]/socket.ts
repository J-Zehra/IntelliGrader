/* eslint-disable import/prefer-default-export */
import { io } from "socket.io-client";

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : "https://iskorer-cc178e1ad05c.herokuapp.com/";

export const socket = io(url);
