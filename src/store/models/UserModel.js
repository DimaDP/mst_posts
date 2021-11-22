import {types as t} from 'mobx-state-tree';

export const UserModel = t.model('UserModel', {
    id: t.number,
    name: t.string,
    username: t.string,
    email: t.string,
    address: t.model({
        street: t.string,
        suite: t.string,
        city: t.string,
        zipcode: t.string,
        geo: t.model({
            lat: t.string,
            lng: t.string
        })
    }),
    phone: t.string,
    website: t.string,
    company: t.model({
        name: t.string,
        catchPhrase: t.string,
        bs: t.string
    })
});
