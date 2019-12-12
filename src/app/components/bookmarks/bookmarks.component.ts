import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';

import { IBookmark, Bookmark } from 'src/app/models/bookmark.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { AddBookmark, DeleteBookmark, GroupBookmark } from 'src/app/store/actions/bookmark.actions';
import { MatTable } from '@angular/material';
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';


@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit, OnChanges {

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

    constructor(private fb: FormBuilder, private _store: Store<IAppState>, private _router: Router, private cd: ChangeDetectorRef) {}

    ngOnInit() { 
        this.uniqueGroups = [];
        this.isGroup = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.bookmarks != null) {
            this.updateUniqueGroups()
        }
    }

    bookmarkForm = this.fb.group({
        name: ['', [Validators.required]],
        url: ['', [Validators.required]],
        group: ['', [Validators.required]]
    })

    selectGroupForm = this.fb.group({
        selectedGroup: ['']
    })

    onSave(e) {
        if (this.bookmarkForm.invalid) {
            return;
        }
        this.isGroup = false;
        let name = this.bookmarkForm.get('name').value;
        let url = this.bookmarkForm.get('url').value;
        let group = this.bookmarkForm.get('group').value;
        let bookmark = new Bookmark(name, url, group);

        this._store.dispatch(new AddBookmark(bookmark));
        this.table.renderRows();
        this.cd.detectChanges();
    }

    onClear(e) {
        this.bookmarkForm.get('name').setValue('');
        this.bookmarkForm.get('url').setValue('');
        this.bookmarkForm.get('group').setValue('');
        this.bookmarkForm.controls['name'].setErrors(null);
        this.bookmarkForm.controls['url'].setErrors(null);
        this.bookmarkForm.controls['group'].setErrors(null);
    }

    onDelete(bookmark: IBookmark) {
        this.isGroup = false;
        this._store.dispatch(new DeleteBookmark(bookmark));
        this.table.renderRows();
        this.cd.detectChanges();
    }

    onChangeGroup(e) {
        this.isGroup = true;
        let selectedGroup = this.selectGroupForm.get('selectedGroup').value;
        this._store.dispatch(new GroupBookmark(selectedGroup));
        this.table.renderRows();        
    }

    updateUniqueGroups() {
        let result = this.bookmarks.reduce((arr, item) => {
            let exists = !!arr.find(x => x.group === item.group);
            if(!exists){
                arr.push(item);
            }
            return arr;
        }, []);

        this.uniqueGroups = [];
        result.forEach(bookmark => this.uniqueGroups.push(bookmark.group));
    }

    get name() { return this.bookmarkForm.get('name'); }
    get url() { return this.bookmarkForm.get('url'); }
    get group() { return this.bookmarkForm.get('group'); }
}
