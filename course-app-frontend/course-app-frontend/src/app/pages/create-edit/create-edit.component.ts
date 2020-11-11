import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Participant } from '../../model/participant.model';
import { ParticipantService } from '../../service/participant.service';
import { Location, ɵPLATFORM_WORKER_APP_ID} from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';

enum OperationEnum {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  READ = 'READ',
}

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  participantForm: FormGroup;

  mode: OperationEnum;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private location: Location,
    private activatedRoute:  ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('[CreatedEditParticipantComponent] ngOnInit()');
  

  //CREATE, EDIT, READ setting

  

  }

  setMode(): void {
    const paramId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Route params:', paramId);
    
    if (paramId) {
      // edit || read
      if (this.router.url.startsWith('/participants/edit')) {
        // edit
        this.mode = OperationEnum.EDIT;
      } else {
        // read
        this.mode = OperationEnum.READ;
      }
    }  else {
      // create
      this.mode = OperationEnum.CREATE;
    }
  }

  prepareForm(): void {
  this.participantForm = this.fb.group({
    id: [],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    pesel: ['', Validators.required, Validators.pattern(/[0-9]+/), Validators.minLength(11), Validators.maxLength(11)],
  });

  if (this.mode !== OperationEnum.CREATE) {
    // fetch participant object by id
    const partcipantId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchParticipant(partcipantId);
    }
  }

  fetchParticipant(id: string): void {
    this.participantService.getParticipantById(id).subscribe(response => {
      // success
      this.participantForm.setValue(response);
      this.prepareView();
    }, error => {
      // failure
      alert('Cannot load participant\n' + JSON.stringify(error));
    },
    );
  }

  prepareView(): void {
    if (this.mode === OperationEnum.READ) {
      this.participantForm.disable;
    }
  }
  isValid(controlName: string): boolean {
    return this.participantForm.controls[controlName].errors
    && (this.participantForm.controls[controlName].dirty
      || this.participantForm.controls[controlName].touched);
  }
  save(participant: Participant): void {
    if (this.mode === OperationEnum.CREATE) {
      this.create(participant);
    } else {
      this.update(participant);
    }
  }

  create(participant: Participant): void {
    console.log('[CreatedEditParticipantComponent] Try to create a participant', participant);

    this.participantService.createParticipant(participant).subscribe(
      response => {
        console.log('[CreatedEditParticipantComponent] Participant created a participant: ', participant);
        
        this.location.back();
      },
      error => {
      console.error('[CreatedEditParticipantComponent] createParticipant() error', console.error);

      alert('[CreateEditParticiapntComponent] createParticipant() error: \n' + JSON.stringify(error));
      },
    );
  }

  update(participant: Participant): void {
    console.log('[CreatedEditParticipantComponent] Try to update a participant', participant);

    this.participantService.updateParticipant(participant).subscribe(
      response => {
        // success
        this.location.back();
      },
      error => {
        // error
        console.error('[CreatedEditParticipantComponent] updateParticipant() error', error);

        alert('[CreatedEditParticipantComponent] updateParticipant() error: \n' + JSON.stringify(error));
      }
    )
  }
}
