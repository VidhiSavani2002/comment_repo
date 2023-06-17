import React, { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import { TextField, Avatar, Container, Button, Typography } from "@mui/material";
import { sendComment } from "./Components/Action/Index";
import { useDispatch, useSelector } from "react-redux";
import commonState from "./Components/Reducer/Comment";
import CommentSection from '../src/Components/CommentSection';
import { saveCommentsToLocalStorage } from './Components/StoreLocal';
import { createStore } from 'redux';
import commentReducer from './Components/Reducer/Comment';

const store = createStore(commentReducer);

store.subscribe(() => {
  const comments = store.getState().commentReducer.comments;
  saveCommentsToLocalStorage(comments);
});


function App() {

  return (
    <Container className="user-main">
      <CommentSection videoId="video1" />
    </Container>
  );
}

export default App;
