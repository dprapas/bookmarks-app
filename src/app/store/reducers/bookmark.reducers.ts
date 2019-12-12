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

        console.log('STATE1 : ' + JSON.stringify(state.bookmarks.length))
        console.log('action.payload : ' + JSON.stringify(action.payload))
        let newState = {
          ...state,
          bookmarks: action.payload
        };

        console.log('STATE2 : ' + JSON.stringify(newState.bookmarks.length))
        console.log('action.payload : ' + JSON.stringify(action.payload))

        return newState;
        // return {
        //     ...state,
        //     bookmarks: action.payload
        // };
    }
    case EBookmarkActions.GroupBookmarkSuccess: {
        
        let newState = {
            ...state,
            //bookmarks: action.payload,
            groupedBookmarks: action.payload
        }
        return newState; 
        // return {
        //     ...state,
        //     //bookmarks: action.payload,
        //     groupedBookmarks: action.payload
        // };
    }

    default:
      return state;
  }
};
