import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Subject } from 'rxjs/Subject';
import { User } from '../../../user/elements/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../user/services/user/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  isLoading: boolean
  event: Event
  private sub: any;

  constructor(private eventService: EventService, 
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) {
    this.eventService = eventService
    this.route = route
    this.router = router
  }

  ngOnInit() {
    this.isLoading = true
    this.sub = this.route.params.subscribe(params => {
      this.isLoading = true
      this.eventService.getEvent(params['id']).then((event) => {
        this.event = event
        this.isLoading = false
      })
   });
  }

  isFinished() {
    return this.eventService.isFinished(this.event)
  }

  isAuthor() {
    if (!this.event.author) {
      return false
    } else {
      return this.userService.getCurrentUser().id == this.event.author.id

    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogConfirmEventDelete, {
      width: '400px',
      data: {title: this.event.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(this.event).then(() => {
          this.router.navigateByUrl('event-list')
        })
      }
    });
  }

} 

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
            <div mat-dialog-content>
                  <p>Voulez vous vraiment supprimer l'evenement {{event.title}}?</p>
                </div>
                <div mat-dialog-actions>
                  <button mat-button (click)="onNoClick()">Annuler</button>
                  <button mat-raised-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>Confirmer</button>
            </div>`,
})
export class DialogConfirmEventDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmEventDelete>,
    @Inject(MAT_DIALOG_DATA) public event: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}