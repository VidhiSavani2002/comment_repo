import { getCommentsFromLocalStorage, saveCommentsToLocalStorage } from '../StoreLocal';

const initialState = {
   comments: getCommentsFromLocalStorage() || {},
};

const commonState = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_COMMENT':
         const { videoId, comment, parentId } = action.payload;

         const newComment = {
            id: Date.now(),
            text: comment,
            replies: [],
         };

         let comments = { ...state.comments };

         if (parentId) {
            comments[videoId].forEach((commentObj) => {
               if (commentObj.id === parentId) {
                  commentObj.replies?.push(newComment);
               }
            });
         } else {
            comments[videoId]?.push(newComment);
         }

         saveCommentsToLocalStorage(comments);

         return {
            ...state,
            comments,
         };

      case 'DELETE_COMMENT':
         const { videoId: any, commentId } = action.payload;

         const updatedComments = { ...state.comments };

         const deleteCommentRecursively = (commentsArray, targetId) => {
            for (let i = 0; i < commentsArray.length; i++) {
               if (commentsArray[i].id === targetId) {
                  commentsArray.splice(i, 1);
                  return true;
               } else if (commentsArray[i].replies.length > 0) {
                  const commentDeleted = deleteCommentRecursively(commentsArray[i].replies, targetId);
                  if (commentDeleted) return true;
               }
            }
            return false;
         };

         const commentDeleted = deleteCommentRecursively(updatedComments[videoId], commentId);

         if (commentDeleted) {
            saveCommentsToLocalStorage(updatedComments);
            return {
               ...state,
               comments: updatedComments,
            };
         } else {
            return state;
         }

      default:
         return state;
   }
};


export default commonState

