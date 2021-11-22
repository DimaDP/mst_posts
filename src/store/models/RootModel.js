import {types as t, flow} from 'mobx-state-tree';
import axios from 'axios';
import {UserModel} from './UserModel';
import {PostModel} from './PostModel';

export const RootModel = t.model('RootModel', {
    isLoading: t.optional(t.boolean, false),
    posts: t.array(PostModel),
    users: t.array(UserModel),
    filteredById: t.optional(t.number, 0),
}).actions(self => ({
    getPosts: flow(function* getPosts() {
        self.isLoading = true;
        try {
            const { data } = yield axios.get('https://jsonplaceholder.typicode.com/posts');
            self.posts = data;
            self.isLoading = false;
        } catch (e) {
            console.warn(e);
            self.isLoading = false;
        }
    }),
    getUsers: flow(function* getUsers() {
        self.isLoading = true;
        try {
            const { data } = yield axios.get('https://jsonplaceholder.typicode.com/users');
            self.users = data;
            self.isLoading = false;
        } catch (e) {
            console.warn(e);
            self.isLoading = false;
        }
    }),
    addPost(post) {
        self.posts.replace([post, ...self.posts])
    },
    removePost(id) {
        self.posts.replace(self.posts.filter(post => post.id !== id))
    },
    setFilterId(id) {
        self.filteredById = id;
    }
})).views(self => ({
    get totalPosts() {
        return self.posts.length;
    },
    get filteredPosts() {
        if (self.filteredById) {
            return self.posts.filter(post => post.userId === self.filteredById );
        }
        return self.posts;
    }
}));
