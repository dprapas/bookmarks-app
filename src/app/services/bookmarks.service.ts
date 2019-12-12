import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IBookmarkHttp } from '../models/http-models/bookmark-http.interface';

@Injectable()
export class BookmarkService {
    bookmarksUrl = `${environment.apiUrl}bookmarks.json`;

    constructor(private _http: HttpClient) { }

    getBookmarks(): Observable<IBookmarkHttp> {
        return this._http.get<IBookmarkHttp>(this.bookmarksUrl);
    }
}
