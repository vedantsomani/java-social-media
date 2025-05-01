package com.example.socialapp.datastore;

import com.example.socialapp.model.*;
import lombok.Data;
import java.util.*;

@Data
public class DataStore {
    private List<User> users = new ArrayList<>();
    private List<Post> posts = new ArrayList<>();
    private List<Story> stories = new ArrayList<>();
    private List<Follow> follows = new ArrayList<>();
    private List<PostLike> postLikes = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private List<RefreshToken> refreshTokens = new ArrayList<>();
}
