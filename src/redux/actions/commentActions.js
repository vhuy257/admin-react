export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";
export const FETCH_COMMENTS_LOADMORE= "FETCH_COMMENTS_LOADMORE";
export const INCREASE_PAGE_NUMBER   = "INCREASE_PAGE_NUMBER";
export const SHOW_LOAD_MORE         = "SHOW_LOAD_MORE";
export const INSERT_COMMENT_SUCCESS = "INSERT_COMMENT_SUCCESS";
export const INSERT_COMMENT_FAILURE = "INSERT_COMMENT_FAILURE";
export const CHANGE_CONTENT_COMMENT = "CHANGE_CONTENT_COMMENT";

export const fetchCommentSuccess = data => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { data }
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error }
});

export const fetchCommentLoadMore = comment => ({
  type: FETCH_COMMENTS_LOADMORE,
  payload: { comment }
});

export const increasePageNumber = pageNumber => ({
  type: INCREASE_PAGE_NUMBER,
  payload: { pageNumber }
});

export const showLoadMore = data => ({
  type: SHOW_LOAD_MORE,
  payload: { data }
});

export const insertCommentSuccess = comment => ({
  type: INSERT_COMMENT_SUCCESS,
  payload: { comment }
});

export const insertCommentFailure = error => ({
  type: INSERT_COMMENT_FAILURE,
  payload: { error }
});

export const changeContentComment = comment => ({
  type: CHANGE_CONTENT_COMMENT,
  payload: { comment }
});
