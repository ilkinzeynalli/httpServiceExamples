import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any[] = [];
  error:string = "";

  constructor(private postService: PostService) {
    
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      response => {
        this.posts = <any[]>response;
      },
      error => this.error = error 
    )
  }


  createPost(input: HTMLInputElement){
    let post = {title: input.value};
    input.value = '';

    this.postService.createPost(post).subscribe(response => {
      this.posts.splice(0,0,post);
    })
  }

  updatePost(post: any){
    post.title = "updated";

    this.postService.updatePost(post).subscribe(response => {
      console.log(response);
    });

    // this.httpClient.patch(this.apiUrl + "/" + post.id,{title:'updated'}).subscribe(response => {
    //   console.log(response);
    // });
  }

  deletePost(post: any){
    this.postService.deletePost(post).subscribe(
      response=>{
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      },
      error=> this.error = error
    );
  }
}
