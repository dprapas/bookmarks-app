import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
    GetBookmarksSuccess,
    EBookmarkActions,
    GetBookmarks,
    AddBookmark,
    AddBookmarkSuccess,
    DeleteBookmarkSuccess,
    GroupBookmark,
    GroupBookmarkSuccess
} from '../actions/bookmark.actions';
import { BookmarkService } from '../../services/bookmarks.service';
import { IBookmarkHttp } from '../../models/http-models/bookmark-http.interface';
import { selectBookmarkList } from '../selectors/bookmark.selector';

@Injectable()
export class BookmarkEffects {

    @Effect()
    getBookmarks$ = this._actions$.pipe(
        ofType<GetBookmarks>(EBookmarkActions.GetBookmarks),
        switchMap(() => this._bookmarkService.getBookmarks()),
        switchMap((bookmarkHttp: IBookmarkHttp) => of(new GetBookmarksSuccess(bookmarkHttp.bookmarks)))
    );

    @Effect()
    addBookmark$ = this._actions$.pipe(
        ofType<AddBookmark>(EBookmarkActions.AddBookmark),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(selectBookmarkList))),
        switchMap(([bookmark, bookmarks]) => {
            bookmarks.push(bookmark);
            return of(new AddBookmarkSuccess(bookmarks));
        })
    );

    @Effect()
    deleteBookmark$ = this._actions$.pipe(
        ofType<AddBookmark>(EBookmarkActions.DeleteBookmark),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(selectBookmarkList))),
        switchMap(([bookmark, bookmarks]) => {
            const index = bookmarks.findIndex(b => b.name === bookmark.name);
            bookmarks.splice(index, 1);
            return of(new DeleteBookmarkSuccess(bookmarks));
        })
    );

    @Effect()
    groupBookmark$ = this._actions$.pipe(
        ofType<GroupBookmark>(EBookmarkActions.GroupBookmark),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(selectBookmarkList))),
        switchMap(([selectedGroup, bookmarks]) => {
            var newArray = bookmarks.slice();
            let groupedBookmarks = newArray.filter(function( obj ) {
                return obj.group === selectedGroup;
            });
            return of(new GroupBookmarkSuccess(groupedBookmarks));
        })
    );

    constructor(
        private _bookmarkService: BookmarkService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) { }
}
