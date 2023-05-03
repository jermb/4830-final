import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book.model';
import { UserService } from '../user/user.service';
import { AuthService } from '../authenticate/authenticate.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  books: Book[];
  message: string = "";
  loggedIn: boolean;
  loading: boolean = false;

  constructor(private userService: UserService, private elRef: ElementRef, private renderer: Renderer2, private auth: AuthService) {
    this.loggedIn = auth.getIsAuth();
  }

  search(form: NgForm) {
    this.message = "";
    this.loading = true;
    fetch(`https://openlibrary.org/search.json?${ form.value.searchType }=${ this.urlize(form.value.searchTerms) }`)
    .then(response => response.json())
    .then(data => {
      var docs = data["docs"];
      var tempBooks: Book[] = [];
      // console.log(docs[0])

      for (var item in docs) {
        item = docs[item];
        const key = item["key"].replace("/works/", "");
        const book: Book = { title: item["title"], author: item["author_name"], publication: item["first_publish_year"], id: key };
        console.log(item);
        console.log(book);
        tempBooks.push(book);
      }

      console.log(tempBooks[0].title);
      this.message = `Returned ${tempBooks.length} results.`;

      this.books = [...tempBooks];
    })
    .catch(error => {
      // handle any errors
      console.log("Search did not return any results.");
      console.log(error);
      this.message = "Search did not return any results.";
    })
    .finally(() => {
      this.loading = false;
    });
  }


  favorite(id: string) {
    this.userService.favorite(id);
    const icon = this.elRef.nativeElement.querySelector(`#star-${id}`);
    this.renderer.setStyle(icon, 'color', 'yellow');
  }

  bookmark(id: string) {
    this.userService.bookmark(id);
    const icon = this.elRef.nativeElement.querySelector(`#bookmark-${id}`);
    this.renderer.setStyle(icon, 'color', 'blue');
  }


  private urlize(text: string) {
    var term = "";
    text.split(" ").forEach(word => {
      if (term == "") {
        term += word;
      }
      else {
        term += "+" + word
      }
    });
    return term;
  }

}
