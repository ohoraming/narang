package com.narang.web.restController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.narang.web.entity.Emotion;
import com.narang.web.service.EmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmotionRestController {
    private EmotionService emotionService;

    @Autowired
    EmotionRestController(EmotionService emotionService) {
        this.emotionService = emotionService;
    }

    private String mapper(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return mapper.writeValueAsString(object);
    }

    @GetMapping("/emotions")
    public String findAll() throws JsonProcessingException {
        return mapper(emotionService.findAll());
    }

    @GetMapping("/emotion/{id}")
    public String findById(@PathVariable("id") String id) throws JsonProcessingException {
        return mapper(emotionService.findById(id));
    }

    @GetMapping("/emotion/uid/{uid}")
    public String findByUid(@PathVariable("uid") String uid) throws JsonProcessingException {
        return mapper(emotionService.findByUid(uid));
    }

    @GetMapping("/emotion/did/{did}")
    public String findByDid(@PathVariable("did") String did) throws JsonProcessingException {
        return mapper(emotionService.findByDid(did));
    }

    @PostMapping("/emotion")
    public String insert(Emotion emotion) {
        return emotionService.insert(emotion);
    }

    @DeleteMapping("/emotion/{id}")
    public Boolean deleteById(@PathVariable("id") String id) {
        return emotionService.deleteById(id);
    }

    @DeleteMapping("/emotion/did/{did}")
    public Boolean deleteByDid(@PathVariable("did") String did) {
        return emotionService.deleteByDid(did);
    }

    @DeleteMapping("/emotion/uid/{uid}")
    public Boolean deleteByUid(@PathVariable("uid") String uid) {
        return emotionService.deleteByUid(uid);
    }
}
