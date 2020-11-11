package com.socha.szczepan.courseapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
public class ParticipantUpdateNotAllowedException extends RuntimeException {
}
