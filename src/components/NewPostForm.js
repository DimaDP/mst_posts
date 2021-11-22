import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {useRootStore} from '../store/store';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';

const NewPostForm = () => {
    const { totalPosts, addPost, users, filteredById, setFilterId, filteredPosts } = useRootStore();
    const [post, setPost] = useState({
        title: '',
        body: '',
        userId: 0,
    });

    const onChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    const createPost = () => {
        addPost({
            ...post,
            id: new Date().getTime(),
        });
        setPost({
            title: '',
            body: '',
            userId: 0,
        })
    };

    return (
        <div>
            <Typography variant={'h3'}>
                Total posts amount {totalPosts}
            </Typography>
            <Typography variant={'h3'}>
                Filtered posts amount {filteredPosts.length}
            </Typography>
            <Box
                display="flex"
                width={'50%'}
                height={'300px'}
                flexDirection='column'
                p={2}
                justifyContent={'space-between'}
            >
                <Typography variant={'h4'}>
                    Add new post
                </Typography>
                <TextField name='title' placeholder={'Title'} label={'Title'} value={post.title} onChange={onChange} />
                <TextField name='body' placeholder={'Post'} label={'Post'} value={post.body} onChange={onChange} />
                <FormControl fullWidth>
                <InputLabel id="user-label">User</InputLabel>
                <Select
                    id="user-label"
                    name={'userId'}
                    value={post.userId}
                    label="User"
                    onChange={onChange}
                >
                    <MenuItem key={0} value={0}>Choose user</MenuItem>
                    {users.map(user => {
                        const { id, name } = user;
                        return <MenuItem key={id} value={id}>{name}</MenuItem>
                    })}
                </Select>
                </FormControl>
                <Button  variant="outlined" color='primary' onClick={createPost}>Add </Button>
            </Box>
            <Box  width={'50%'} p={2} m={1}>
                <Typography variant={'h4'}>
                    Filter posts by user
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="user-label">User</InputLabel>
                    <Select
                        id="user-filter"
                        name={'filter'}
                        value={filteredById}
                        label="User"
                        onChange={e => setFilterId(e.target.value)}
                    >
                        <MenuItem key={0} value={0}>Choose user</MenuItem>
                        {users.map(user => {
                            const { id, name } = user;
                            return <MenuItem key={id} value={id}>{name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}
export default observer(NewPostForm);
