package com.project.laptopservice.exception;

import com.project.laptopservice.payload.ActionFailed;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    // handle specific exceptions
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ActionFailed> handleBlogAPIException(AppException exception,
                                                               WebRequest webRequest){
        ActionFailed error = new ActionFailed( exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ActionFailed> handleNotFoundEx(ResourceNotFoundException ex, WebRequest webRequest) {
        ActionFailed error = new ActionFailed(ex.getMessage(), webRequest.getDescription(false));

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ActionFailed> forbiddenEx(ForbiddenException ex, WebRequest webRequest) {
        ActionFailed errorResponse = new ActionFailed(ex.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }


    // global exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ActionFailed> handleGlobalException(Exception exception,
                                                              WebRequest webRequest){
        ActionFailed error = new ActionFailed( exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
