import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  books: Book[];

  search(form: NgForm) {
    fetch(`https://openlibrary.org/search.json?${ form.value.searchType }=${ this.urlize(form.value.searchTerms) }`)
    .then(response => response.json())
    .then(data => {
      var docs = data["docs"];
      var tempBooks: Book[];

      for (var item in docs) {
        const book: Book = { title: item["title"], author: item["author"], publication: item["first_publish_year"], id: item["edition_key"] };
        tempBooks.push(book);
      }

      this.books = [...tempBooks];
    })
    .catch(error => {
      // handle any errors
      console.log("Search did not return any results.");
    });
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
