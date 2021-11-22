import {types as t} from 'mobx-state-tree';

export const PostModel = t.model('PostModel', {
    id: t.number,
    title: t.string,
    body: t.string,
    userId: t.number
});
