import { Component, OnInit } from '@angular/core';
import { Participant } from '../../model/participant.model';
import { ParticipantService } from '../../service/participant.service';
import { faUserEdit, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  participants: Participant[];

  icons = {
    create: faUserPlus,
    edit: faUserEdit,
    delete: faTrashAlt,
    details: faInfoCircle,
  };

  constructor(
    private participantsService: ParticipantService,
    private router: Router,
  ) { 
    console.log('constructor in ParticipantsComponent');
  }

  ngOnInit(): void {
    console.log('ngOnInit in ParticipantsComponent');

    this.participantsService.getAllParticipants().subscribe(response => {
      console.log('response: ', response);
      this.participants = response;
    });
  }

  goToCreateParticipants(): void {
    this.router.navigate(['/participants/create']);
  }

  viewDetails(participant: Participant): void {
    this.router.navigate([`/participants/${participant.id}`]);
  }

  editParticipant(participant: Participant): void {
    console.log('clicked on edit participant:', participant.lastName, participant.firstName);
    this.router.navigate([`/participants/edit/${participant.id}`]);
  }

  deleteParticipant(participant: Participant): void {
    console.log('clicked on delete participant:', participant.lastName, participant.firstName);

    this.participantsService.deleteParticipant(participant.id).subscribe(
      response => {
        console.log('Delete participant:', response);
        this.participants = this.participants.filter(prt => prt.id !== response.id);
      },
      error => console.error('error in deleteParticipant():', error),
      );
  }  
}

