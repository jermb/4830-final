import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: '', component: SearchComponent
  },
  {
    path: 'login', component : LoginComponent
  },
  {
    path: 'list', component : BookListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

