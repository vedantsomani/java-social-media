package com.example.socialapp.security;

import com.example.socialapp.datastore.DataStoreService;
import com.example.socialapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired private DataStoreService ds;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = ds.getStore().getUsers().stream()
            .filter(x -> x.getUsername().equals(username))
            .findFirst()
            .orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
        return new UserDetailsImpl(u);
    }
}
