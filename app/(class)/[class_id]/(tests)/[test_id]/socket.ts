import { io } from "socket.io-client";

// eslint-disable-next-line import/prefer-default-export
export const socket = io(
  "https://intelli-grader-backend-43b270ab373f.herokuapp.com/",
);
