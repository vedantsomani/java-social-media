package com.example.socialapp.datastore;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;

@Service
public class DataStoreService {
    private final ObjectMapper mapper = new ObjectMapper();
    private DataStore store;

    @Value("${app.data.file}")
    private String dataFile;

    @PostConstruct
    public void init() throws Exception {
        File f = new File(dataFile);
        if (!f.exists()) {
            f.getParentFile().mkdirs();
            mapper.writeValue(f, new DataStore());
        }
        store = mapper.readValue(f, DataStore.class);
    }

    public synchronized DataStore getStore() {
        return store;
    }

    public synchronized void save() throws Exception {
        mapper.writeValue(new File(dataFile), store);
    }
}
