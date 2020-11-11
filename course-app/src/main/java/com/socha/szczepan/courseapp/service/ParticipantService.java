package com.socha.szczepan.courseapp.service;

import com.socha.szczepan.courseapp.exceptions.ParticipantNotFoundException;
import com.socha.szczepan.courseapp.model.Participant;
import com.socha.szczepan.courseapp.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    public Optional<Participant> addParticipant(Participant participant) {
        Participant prevParticipant = participantRepository.findByPesel(participant.getPesel());

        if(prevParticipant != null) {
            return Optional.empty();
        }
        else {
            return Optional.of(participantRepository.save(participant));
        }
    }

    public Optional<Participant> updateParticipant(String id, Participant participant) {
        Optional<Participant> existingParticipant = Optional.of(participantRepository.findById(id))
                .orElseThrow(ParticipantNotFoundException::new);

        Participant prt = existingParticipant.get();
        prt.setFirstName(participant.getFirstName());
        prt.setLastName(participant.getFirstName());
        prt.setEmail(participant.getEmail());

        return Optional.of(participantRepository.save(prt));
    }

    public Participant deleteParticipant(String id) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(ParticipantNotFoundException::new);

        participantRepository.deleteById(id);

        return participant;
    }

    public Optional<Participant> findById(String id) {
        return participantRepository.findById(id);
    }
}
