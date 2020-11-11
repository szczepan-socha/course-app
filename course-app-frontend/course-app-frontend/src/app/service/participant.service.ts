import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../model/participant.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private readonly baseUrl = environment.baseUrl;
  private readonly participantUrl = `${this.baseUrl}/participants`;

  constructor(private http: HttpClient) { }

  getAllParticipants(): Observable<Participant[]> {
    console.log('[ParticipantService] in getAllParticipants');

    return this.http.get<Participant[]>(this.participantUrl);
  }

  getParticipantById(id: string): Observable<Participant> {
    return this.http.get<Participant>(`${this.participantUrl}/${id}`);
  }

  createParticipant(participant: Participant): Observable<Participant> {
    console.log(`[ParticipantService] in createParticipant()`, participant);

    return this.http.post<Participant>(this.participantUrl, participant);
  }

  updateParticipant(participant: Participant): Observable<Participant> {
    console.log(`[ParticipantService] in updateParticipant()`, participant);

    // if employee exists check
    if (participant.id) {

      return this.http.patch<Participant>(`${this.participantUrl}/${participant.id}`, participant);
    }
    else {
      // otherwise
      alert(`You are unable to update this employee!`);
      throw new Error(`You are unable to update this employee!`);
    }
  }

  deleteParticipant(id: string): Observable<Participant> {
    console.log(`[ParticipantSerivce] in deleteParticipant(${id})`);

    return this.http.delete<Participant>(`${this.participantUrl}/${id}`);
  }
}
