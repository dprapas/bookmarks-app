
# BookmarksApp

## Description

This is an sample application to demonstrate the basic capabilities of Angular 8, along with NGRX and Angular material. This application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

It is a single page application which consists of the following UI components:

1. List that display the user's bookmarks
2. Drop down menu to select a group of bookmarks
3. Form in order to add new bookmark
4. Delete buttons in order to delete one bookmark

### Architecture

The BookmarkApp application follows the NGRX approach for managing the state of the application. We use the following NGRX components:

1. The state, which consists of two arrays. One for keeping all user's bookmarks (bookmarks: IBookmark[]) and one for keeping the current selected group of bookmarks (groupedBookmarks: IBookmark[]): 
```
export interface IBookmarkState {
    bookmarks: IBookmark[];
    groupedBookmarks: IBookmark[];
}
```
2. The actions, which are created every time that an action is triggered that interacts with the state:
```
export class AddBookmark implements Action {
    public readonly type = EBookmarkActions.AddBookmark;
    constructor(public payload: IBookmark) { }
}
```
3. The effects, which are triggered when an actions involves the communication with an external component, eg. an API server. This behavior is only simulated in our application. There is no actual interaction with any external system.
```
@Effect()
getBookmarks$ = this._actions$.pipe(
    ofType<GetBookmarks>(EBookmarkActions.GetBookmarks),
    switchMap(() => this._bookmarkService.getBookmarks()),
    switchMap((bookmarkHttp: IBookmarkHttp) => of(new GetBookmarksSuccess(bookmarkHttp.bookmarks)))
);
```
4. The reducers, for applying the updates in the state objects
```
case EBookmarkActions.GetBookmarksSuccess: {
    return {
    ...state,
    bookmarks: action.payload,
    groupedBookmarks: []
    };
}
```
5. The selectors, for selected slices of the state
```
export const selectGroupedList = createSelector(
    selectBookmarks,
    (state: IBookmarkState) => state.groupedBookmarks
);
```

Briefly the flow of the application is the following:

1. Whenever the user performs an action (e.g. add, delete, refresh) and action message (e.g. AddBookmark) is sent
2. Based on the message the an effect is triggers which propagates a new actions message in case of successful executions
3. The success message triggers the corresponding reducer which in turn updates the state

## Screenshots

## How to run the application

To run the application locally follow the instructions below:

1. Clone the git repository `git clone https://github.com/dprapas/bookmarks-app.git`
2. Move to cloned directory `cd bookmarks-app.git`
3. Build the application `npm install`
4. Run the application `ng serve`
5. Navigate to `http://localhost:4200/`
   


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
