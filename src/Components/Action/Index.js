export const addComment = (videoId, comment, parentId = null) => {
   console.log("videoId", videoId, "comment", comment, "parentId", parentId)
   return {
      type: 'ADD_COMMENT',
      payload: {
         videoId,
         comment,
         parentId,
      },
   };
};

export const deleteComment = (videoId, commentId) => {
   return {
      type: 'DELETE_COMMENT',
      payload: {
         videoId,
         commentId,
      },
   };
};