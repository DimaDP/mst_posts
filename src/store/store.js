import {RootModel} from './models/RootModel';

let rootStore;

export const useRootStore = () => {
    if (!rootStore) {
        rootStore = RootModel.create({
            posts: [],
            users: [],
        });
    }
    return rootStore;
}
