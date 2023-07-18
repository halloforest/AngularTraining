import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface Post {
  title: string,
  content: string,
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  serverUrl: string = `https://angular-learning-72e80-default-rtdb.europe-west1.firebasedatabase.app`;

  constructor(private http: HttpClient) {}

  // Return the http, leave the subscriber in the calling component
  postPosts(post: Post) {
    // Send Http request
    return this.http
      .post(this.serverUrl + `/posts.json`, post)
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(this.serverUrl + '/posts.json')
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key}); // create a new object by spreading the properties of responseData[key] into the new object
            }
          }
          return postsArray;
        }));
  }

  deletePost(id: string | undefined) {
    // Send HTTP DELETE request
    return this.http
      .delete(this.serverUrl + `/posts/${id}.json`);
  }

  deleteAllPosts() {
    // Send HTTP DELETE request
    return this.http
      .delete(this.serverUrl + `/posts.json`);
  }
}
