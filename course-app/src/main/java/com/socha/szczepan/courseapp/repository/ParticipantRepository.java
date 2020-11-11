package com.socha.szczepan.courseapp.repository;

import com.socha.szczepan.courseapp.model.Participant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends MongoRepository<Participant,String> {

    Participant findByPesel(String pesel);

    List<Participant> findByLastName(String lastName);

}
