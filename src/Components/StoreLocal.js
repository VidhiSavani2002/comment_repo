export const getCommentsFromLocalStorage = () => {
   const comments = localStorage.getItem('comments');
   return comments ? JSON.parse(comments) : null;
};

export const saveCommentsToLocalStorage = (comments) => {
   localStorage.setItem('comments', JSON.stringify(comments));
};