import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookmarksComponent } from './containers/bookmarks/bookmarks.component';

const routes: Routes = [
  { path: '', redirectTo: '/bookmarks', pathMatch: 'full' },
  { path: 'bookmarks', component: BookmarksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
