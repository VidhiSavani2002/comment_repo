import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from './Action/Index';
import { TextField, Avatar, Container, Button, Typography, Box } from "@mui/material";



const CommentSection = ({ videoId }) => {
   const comments = useSelector((state) => state.commentReducer?.comments[videoId]) || [];
   console.log("comments", comments)
   const dispatch = useDispatch();
   const [newComment, setNewComment] = useState('');

   const handleSubmit = (e, parentId = null) => {
      e.preventDefault();
      if (newComment.trim() !== '') {
         dispatch(addComment(videoId, newComment, parentId));
         setNewComment('');
      }
   };

   const handleDeleteComment = (commentId) => {
      dispatch(deleteComment(videoId, commentId));
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Box
               sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "gray",
               }}
            >
               Add a Comment here
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
               <Avatar sx={{ marginRight: "20px" }}>U</Avatar>
               <TextField
                  fullWidth
                  label="Add a comment..."
                  variant="standard"
                  onChange={(e) => setNewComment(e.target.value)}
                  name="comment"
               />
            </Box>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "10px",
               }}
            >
               <Button
                  variant="text"
                  sx={{ borderRadius: "50px", marginRight: "10px" }}
               >
                  Cancel
               </Button>
               <Button variant="contained" sx={{ borderRadius: "50px" }} type="submit">
                  Comment
               </Button>
            </Box>
         </form>
         <Box sx={{ marginLeft: "50px" }}>
            {
               comments?.map((item, index) => {
                  return (
                     <Box key={index} sx={{ marginBottom: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                           <Avatar sx={{ marginRight: "10px" }}>U</Avatar>
                           <Typography>{item.comment}</Typography>
                        </Box>
                        <Button onClick={() => handleDeleteComment(item.id)}>Delete</Button>
                        <Button onClick={() => handleSubmit(item.id)}>Reply</Button>
                        {item?.replies.length > 0 && (
                           <ul>
                              {item?.replies.map((reply) => (
                                 <li key={reply.id}>
                                    <p>{reply.text}</p>
                                    <Button onClick={() => handleDeleteComment(reply.id)}>Delete</Button>
                                    <Button onClick={() => handleSubmit(reply.id)}>Reply</Button>
                                 </li>
                              ))}
                           </ul>
                        )}
                     </Box>)

               })
            }
         </Box>
      </div>
   );
};

export default CommentSection;
