package baro.baro.global.exception;

import baro.baro.global.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ResponseDto<?>> handleException(Exception e) {
        return new ResponseEntity<>(ResponseDto.fail(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ResponseDto<?>> handleCustomException(CustomException e) {
        return new ResponseEntity<>(ResponseDto.fail(e.getErrorCode()), HttpStatus.valueOf(e.getErrorCode().getHttpStatusCode()));
    }
}