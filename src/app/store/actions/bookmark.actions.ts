import { Action } from '@ngrx/store';

import { IBookmark } from '../../models/bookmark.interface';

export enum EBookmarkActions {
    GetBookmarks = 'GET_BOOKMARKS',
    GetBookmarksSuccess = 'GET_BOOKMARKS_SUCCESS',
    GetBookmark = 'GET_BOOKMARK',
    GetBookmarkSuccess = 'GET_BOOKMARK_SUCCESS',
    AddBookmark = 'ADD_BOOKMARK',
    AddBookmarkSuccess = 'ADD_BOOKMARK_SUCCESS',
    DeleteBookmark = 'DELETE_BOOKMARK',
    DeleteBookmarkSuccess = 'DELETE_BOOKMARK_SUCCESS',
    GroupBookmark = 'GROUP_BOOKMARK',
    GroupBookmarkSuccess = 'GROUP_BOOKMARK_SUCCESS'
}

export class GetBookmarks implements Action {
    public readonly type = EBookmarkActions.GetBookmarks;
    constructor() {}
}

export class GetBookmarksSuccess implements Action {
    public readonly type = EBookmarkActions.GetBookmarksSuccess;
    constructor(public payload: IBookmark[]) { }
}

export class GetBookmark implements Action {
    public readonly type = EBookmarkActions.GetBookmark;
    constructor(public payload: number) { }
}

export class GetBookmarkSuccess implements Action {
    public readonly type = EBookmarkActions.GetBookmarkSuccess;
    constructor(public payload: IBookmark) { }
}

export class AddBookmark implements Action {
    public readonly type = EBookmarkActions.AddBookmark;
    constructor(public payload: IBookmark) { }
}

export class AddBookmarkSuccess implements Action {
    public readonly type = EBookmarkActions.AddBookmarkSuccess;
    constructor(public payload: IBookmark[]) { }
}

export class DeleteBookmark implements Action {
    public readonly type = EBookmarkActions.DeleteBookmark;
    constructor(public payload: IBookmark) { }
}

export class DeleteBookmarkSuccess implements Action {
    public readonly type = EBookmarkActions.DeleteBookmarkSuccess;
    constructor(public payload: IBookmark[]) { }
}

export class GroupBookmark implements Action {
    public readonly type = EBookmarkActions.GroupBookmark;
    constructor(public payload: string) { }
}

export class GroupBookmarkSuccess implements Action {
    public readonly type = EBookmarkActions.GroupBookmarkSuccess;
    constructor(public payload: IBookmark[]) { }
}


export type BookmarkActions = GetBookmarks | GetBookmarksSuccess | GetBookmark |
                              GetBookmarkSuccess | AddBookmark | AddBookmarkSuccess | 
                              DeleteBookmark | DeleteBookmarkSuccess | GroupBookmark | GroupBookmarkSuccess;
