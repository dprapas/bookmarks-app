import { initialBookmarkState, IBookmarkState } from "../state/bookmark.state";
import { EBookmarkActions, BookmarkActions } from "../actions/bookmark.actions";


export const bookmarkReducers = (
  state = initialBookmarkState,
  action: BookmarkActions
): IBookmarkState => {
  switch (action.type) {
    case EBookmarkActions.GetBookmarksSuccess: {
      return {
        ...state,
        bookmarks: action.payload,
        groupedBookmarks: []
      };
    }
    case EBookmarkActions.AddBookmarkSuccess: {
      return {
        ...state,
        bookmarks: action.payload
      };
    }
    case EBookmarkActions.DeleteBookmarkSuccess: {
      return {
        ...state,
        bookmarks: action.payload
      };
    }
    case EBookmarkActions.GroupBookmarkSuccess: {
      return {
        ...state,
        //bookmarks: action.payload,
        groupedBookmarks: action.payload
      };
    }
    default:
      return state;
  }
};
