import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any>{
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createPost(post: any): Observable<any>{
    return this.httpClient.post(this.apiUrl,post);
  }

  updatePost(post: any): Observable<any>{
    return this.httpClient.put(this.apiUrl + "/" + post.id,post);
  }

  deletePost(post: any): Observable<any>{
    return this.httpClient.delete(this.apiUrl + "a/" + post.id).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    if(error instanceof ErrorEvent){
      console.log("Client error: " + error['message'])
    }
    else{
      console.log("Backend error: " +  error['message'])
    }

    return throwError('Bilinmeyen hata olustu');
  }
}
