import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Post, PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  postIdToDelete: number = -1;

  constructor(
    private datePipe: DatePipe,
    private postService: PostService) {}
  
  getCurrentTimestamp(): any {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

    // Get access to html component from ts
  @ViewChild('postForm') postForm!: NgForm;

  loadedPosts = [];

  ngOnInit() { 
  }

  onSendPost() {
    this.postForm.form.setValue({
      title: 'Title: ' + this.getCurrentTimestamp(),
      content: 'Content: ' + this.getCurrentTimestamp()
    });

    const post: Post = {title: this.postForm.value.title, content: this.postForm.value.content};

    this.postService.postPosts(post)      
    .subscribe(() => {this.onFetchPosts();});;
  }

  onFetchPosts() {
    // The calling function can handle the results after fetching
    this.postService.fetchPosts()
    .subscribe(
      (posts: Post[]) => { this.posts = posts; },
      error => { console.log('An error occurred while fetching posts:', error); }
    );
  }

  onClearAllPosts() {
    this.postService.deleteAllPosts()    
    .subscribe(() => {this.onFetchPosts();});   // Update the lists after delete;
  }

  onDeletePost(index: number) {
    this.postIdToDelete = index;
    this.postService.deletePost(this.posts[index].id)      
    .subscribe(() => {this.postIdToDelete = -1; this.onFetchPosts();});   // Update the lists after delete
  }
}