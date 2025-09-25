package com.farm2pot.test.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/user/health")
    public ResponseEntity<String> test() {
        log.info("User Test!!");
        return ResponseEntity.ok("OK");
    }
}
