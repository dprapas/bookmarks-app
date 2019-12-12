import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../../store/state/app.state';
import { Router } from '@angular/router';
import { GetBookmarks } from 'src/app/store/actions/bookmark.actions';
import { selectBookmarkList, selectGroupedList } from 'src/app/store/selectors/bookmark.selector';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
    bookmarks$ = this._store.pipe(select(selectBookmarkList));
    groupedBookmarks$ = this._store.pipe(select(selectGroupedList));

    constructor(private _store: Store<IAppState>, private _router: Router) { }

    ngOnInit() {
        this._store.dispatch(new GetBookmarks());
    }

    navigateToBookmark(id: number) {
        this._router.navigate(['bookmark', id]);
    }
}
