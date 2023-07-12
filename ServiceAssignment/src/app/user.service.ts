import { Injectable } from '@angular/core';
import { CountService } from './count.service';

@Injectable({ providedIn: 'root' })

export class UserService {
    public activeUsers: string[] = ['Max', 'Anna'];
    public inactiveUsers: string[] = ['Chris', 'Manu'];

    constructor(private countService: CountService) {}

    setToInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
        this.countService.countInrement();
    }
  
    setToActive(id: number) {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
      this.countService.countInrement();
    }
}