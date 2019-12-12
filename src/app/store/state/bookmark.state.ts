import { IBookmark } from "src/app/models/bookmark.interface";

export interface IBookmarkState {
    bookmarks: IBookmark[];
    groupedBookmarks: IBookmark[];
}
  
export const initialBookmarkState: IBookmarkState = {
    bookmarks: null,
    groupedBookmarks: null
};
  