import { initialBookmarkState, IBookmarkState } from "../state/bookmark.state";
import { EBookmarkActions, BookmarkActions } from "../actions/bookmark.actions";


export const bookmarkReducers = (
  state = initialBookmarkState,
  action: BookmarkActions
): IBookmarkState => {
  switch (action.type) {
    case EBookmarkActions.GetBookmarksSuccess: {
        console.log('state1 : ' + JSON.stringify(state))
        console.log('action.payload : ' + JSON.stringify(action.payload))
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
        console.log('state2 : ' + JSON.stringify(state))
        console.log('action.payload : ' + JSON.stringify(action.payload))

        let newState = {
            ...state,
            //bookmarks: action.payload,
            groupedBookmarks: action.payload
        }

        console.log('state3 : ' + JSON.stringify(state))
        console.log('action.payload : ' + JSON.stringify(action.payload))

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
