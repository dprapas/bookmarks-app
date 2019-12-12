import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { IBookmark, Bookmark } from 'src/app/models/bookmark.interface';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IAppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { AddBookmark, DeleteBookmark, GroupBookmark } from 'src/app/store/actions/bookmark.actions';
import { MatTable } from '@angular/material';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

    @Input()
    bookmarks: IBookmark[];

    @Input()
    groupedBookmarks: IBookmark[];

    @Output()
    bookmarkSelected: EventEmitter<number> = new EventEmitter();

    @ViewChild(MatTable, {static: false}) table: MatTable<any>;

    uniqueGroups: string[];
    displayedColumns: string[] = ['name', 'url', 'group', 'delete'];
    isGroup: boolean;


    constructor(private fb: FormBuilder, private _store: Store<IAppState>, private _router: Router) { }

    ngOnInit() { 
        this.uniqueGroups = ['programming', 'news', 'work'];
        this.isGroup = false;
    }

    bookmarkForm = this.fb.group({
        name: [''],
        url: [''],
        group: ['']
    })

    selectGroupForm = this.fb.group({
        selectedGroup: ['']
    })

    onSubmit(e) {
        this.isGroup = false;
        let name = this.bookmarkForm.get('name').value;
        let url = this.bookmarkForm.get('url').value;
        let group = this.bookmarkForm.get('group').value;
        let bookmark = new Bookmark(name, url, group);

        this._store.dispatch(new AddBookmark(bookmark));
        this.table.renderRows();
    }

    onDelete(bookmark: IBookmark) {
        this.isGroup = false;
        this._store.dispatch(new DeleteBookmark(bookmark));
        this.table.renderRows();
    }

    onChangeGroup(e) {
        this.isGroup = true;
        let selectedGroup = this.selectGroupForm.get('selectedGroup').value;
        this._store.dispatch(new GroupBookmark(selectedGroup));
        this.table.renderRows();        
    }
}
