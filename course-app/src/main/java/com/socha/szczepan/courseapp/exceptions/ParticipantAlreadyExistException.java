package com.socha.szczepan.courseapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ParticipantAlreadyExistException extends RuntimeException {
}
