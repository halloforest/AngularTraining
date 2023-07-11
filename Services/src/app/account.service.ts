export interface Account {
    name: string;
    status: string;
}

export class AccountService {    
    accounts: Account[] = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];
    
      addAccount(name: string, status: string) {
        this.accounts.push({name: name, status: status});
        console.log('A new server was added, name: ' + name);
      }
    
      changeStatus(id: number, newStatus: string) {
        this.accounts[id].status = newStatus;
        console.log('A server status changed, new status: ' + newStatus);
      }
}