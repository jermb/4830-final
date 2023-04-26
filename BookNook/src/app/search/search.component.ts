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
    //  Calls the OpenLibrary API
    fetch(`https://openlibrary.org/search.json?${ form.value.searchType }=${ this.urlize(form.value.searchTerms) }`)
    .then(response => response.json())
    .then(data => {
      var docs = data["docs"];
      var tempBooks: Book[] = [];

      //  Creates an object from each item in json
      for (var item in docs) {
        item = docs[item];
        const key = item["key"].replace("/works/", "");
        const book: Book = { title: item["title"], author: item["author_name"], publication: item["first_publish_year"], id: key };
        console.log(item);
        console.log(book);
        tempBooks.push(book);
      }

      this.books = [...tempBooks];
    })
    .catch(error => {
      // handle any errors
      console.log("Search did not return any results.");
      console.log(error);
    });
  }


  favorite(id: string) {
    console.log(id);
  }

  bookmark(id: string) {
    console.log(id);
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
