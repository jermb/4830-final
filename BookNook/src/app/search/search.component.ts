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
      const docs = data["docs"];
      const tempBooks: Book[] = [];

      for (var item in docs) {
        item = docs[item];
        const key = (item["cover_edition_key"] != null) ? item["cover_edition_key"] : item["key"].replace("/works/", "");
        // if (item["cover_edition"] != null) key = item["cover_edition"];
        const book: Book = { title: item["title"], author: item["author_name"], publication: item["first_publish_year"], id: key };
        tempBooks.push(book);
      }

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
    //  Passes on favoriting duty to UserService
    this.userService.favorite(id);
    //  Colors the star icon yellow
    const icon = this.elRef.nativeElement.querySelector(`#star-${id}`);
    this.renderer.setStyle(icon, 'color', 'yellow');
  }


  bookmark(id: string) {
    //  Passes on favoriting duty to UserService
    this.userService.bookmark(id);
    //  Colors the bookmark icon blue
    const icon = this.elRef.nativeElement.querySelector(`#bookmark-${id}`);
    this.renderer.setStyle(icon, 'color', 'blue');
  }

  /**
   * Prepares text from form for being sent in a URL
   *
   * @param text string
   * @returns string
   */
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
