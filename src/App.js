
import './App.css';
import Posts from './components/Posts';
import {useRootStore} from './store/store';
import {useEffect} from 'react';
import {Box, LinearProgress} from '@mui/material';
import {observer} from 'mobx-react-lite';
import NewPostForm from './components/NewPostForm';

function App() {
    const { getPosts, isLoading, getUsers } = useRootStore();

    useEffect(() => {
        getPosts();
        getUsers();
    }, [getPosts, getUsers]);

    return (
        <div className="App">
          <header className="App-header">
            MST Posts
          </header>
            <Box sx={{ width: '100%', height: 10 }}>
                {isLoading &&  <LinearProgress />}
            </Box>
            <div className="container">
                <Posts />
                <NewPostForm />
            </div>
        </div>
  );
}

export default observer(App);
