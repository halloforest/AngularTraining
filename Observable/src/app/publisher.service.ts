import { Injectable, OnInit } from "@angular/core";
import { Observable, interval, takeUntil } from "rxjs";

@Injectable({providedIn: 'root'})

export class PublisherService implements OnInit{    
    count: number = 0;
    publisher: any;
    countIntervalId: any;
    startCounting: boolean = false;

    ngOnInit() {
        // it will NOT be invoked
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
    }

    resetCount() {
        this.count = 0;
    }
}