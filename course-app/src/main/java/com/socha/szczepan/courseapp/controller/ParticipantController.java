package com.socha.szczepan.courseapp.controller;

import com.socha.szczepan.courseapp.exceptions.ParticipantAlreadyExistException;
import com.socha.szczepan.courseapp.exceptions.ParticipantNotFoundException;
import com.socha.szczepan.courseapp.exceptions.ParticipantUpdateNotAllowedException;
import com.socha.szczepan.courseapp.model.Participant;
import com.socha.szczepan.courseapp.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping("/participants")
    public ResponseEntity<List<Participant>> getParticipants() {
        return ResponseEntity.ok(participantService.getAllParticipants());
    }

    @PostMapping("/participants")
    public ResponseEntity<Participant> createParticipant(@Valid @RequestBody Participant participant) {
        return new ResponseEntity<Participant>(participantService.addParticipant(participant)
        .orElseThrow(ParticipantAlreadyExistException::new), HttpStatus.CREATED);
    }

    @PatchMapping("update/{id}")
    public ResponseEntity<Participant> updateParticipant(@Valid @PathVariable String id, @RequestBody Participant participant) {
        return ResponseEntity.ok(participantService.updateParticipant(id,participant)
                .orElseThrow(ParticipantUpdateNotAllowedException::new));
    }

    @DeleteMapping("delete/{id}")
    public Participant deleteParticipant(@PathVariable() String id) {
        return participantService.deleteParticipant(id);
    }

    @GetMapping("participants/{id}")
    public ResponseEntity<Participant> getParticipantById(@PathVariable String id) {
        return ResponseEntity.ok(participantService.findById(id).orElseThrow(ParticipantNotFoundException::new));
    }
}
