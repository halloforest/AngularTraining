import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class PublisherService implements OnInit{    
    count: number = 0;
    publisher: any;
    countIntervalId: any;
    startCounting: boolean = false;
    subject!: Subject<number>;

    ngOnInit(): void {        
    }
  
    constructor() {
        // This timer should only be initialized for once
        this.countIntervalId = setInterval(()=>{if(this.startCounting) this.count++;}, 1000);

        // The publisher can be invoked multiple times in case of multiple subscribers
        this.publisher = new Observable<number>((message) => {
            const eventIntervalId = setInterval(() => {
                message.next(this.count);
            this.startCounting = true;
            
            // if(this.count == 5) message.error("Oh no, count is 5!");
            // if(this.count >= 10) message.complete();

            console.log('Subscribed!', this.count);}, 1000);

        // This will be called during "unsubscribe"
        return () => {
            clearInterval(eventIntervalId);
            console.log('Unsubscribed?', this.count);};
        });

        // Initialize the subject
        this.subject = new Subject<number>();
        setInterval(() => {
            this.subject.next(this.count);
            this.startCounting = true;
      
            // if (this.count === 5) { this.subject.error("Oh no, count is 5!"); }
            // if (this.count >= 10) { this.subject.complete(); }
      
            console.log('Subscribed to subject!', this.count);
          }, 1000);
    }

    resetCount() {
        this.count = 0;
    }
}