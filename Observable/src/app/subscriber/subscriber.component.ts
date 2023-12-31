import { Component } from '@angular/core';
import { Subscription, filter, map } from 'rxjs';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent {
  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  subscriber1: Subscription | null = null;
  subscriber2: Subscription | null = null;
  subscriber3: Subscription | null = null;

  constructor(private publisherService: PublisherService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.subscriber1 != null) this.subscriber1.unsubscribe();  
    if(this.subscriber2 != null) this.subscriber2.unsubscribe();
  }

  onReset1() {
    this.publisherService.resetCount();
  }

  onStart1() {
    // Prevent from subscription for multiple times
    if(this.subscriber1 != null) return;
    
    this.subscriber1 = this.publisherService.publisher.pipe(
      map((value: number) => value *2), 
      filter((value: number) => value % 3 === 0)).
    subscribe({
      next: (value: number) => {this.value1 = value; console.log("Subscriber1 value received:", value);},
      error: (error: any) => {console.log("Error 1:", error);},
      complete: () => {console.log("Subscription 1 completed");}});   
  }

  onStop1() {
    if(this.subscriber1 != null) this.subscriber1.unsubscribe();
    this.subscriber1 = null;  
  }

  
  onReset2() {
    this.publisherService.resetCount();
  }

  onStart2() {
    // Prevent from subscription for multiple times
    if(this.subscriber2 != null) return;

    this.subscriber2 = this.publisherService.publisher.subscribe({
      next: (value: number) => {this.value2 = value; console.log("Subscriber 2 value received:", value);},
      error: (error: string) => {console.log("Error 2:", error);},
      complete: () => {console.log("Subscription2 completed");}});
  }

  onStop2() {
    if(this.subscriber2 != null) this.subscriber2.unsubscribe(); 
    this.subscriber2 = null;
  }

  onReset3() {
    this.publisherService.resetCount();
  }

  onStart3() {
    // Prevent from subscription for multiple times
    if(this.subscriber3 != null) return;

    this.subscriber3 = this.publisherService.subject.subscribe({
      next: (value: number) => {this.value3 = value; console.log("Subscriber 3 value received:", value);},
      error: (error: string) => {console.log("Error 3:", error);},
      complete: () => {console.log("Subscription3 completed");}});
  }

  onStop3() {
    if(this.subscriber3 != null) this.subscriber3.unsubscribe(); 
    this.subscriber3 = null;
  }
}

