import {Button, Checkbox, List, ListItem, ListItemText} from '@mui/material';
import {useRootStore} from '../store/store';
import {observer} from 'mobx-react-lite';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ title, onClick, disabled, fontSize, ...rest }) => (
    <Button aria-label="Delete" onClick={onClick} disabled={disabled} tooltip={title} {...rest}>
        <DeleteIcon fontSize={fontSize} />
    </Button>
)

const Posts = () => {
    const { filteredPosts, removePost, selectPost, selectedPost } = useRootStore();

    const handleToggle = (value) => {
        if (selectedPost?.id === value.id) {
            selectPost(null);
            return;
        }
        selectPost(value);
    };

    return (
        <List dense sx={{ flex: 1, maxWidth: 600, bgcolor: 'background.paper' }}>
            {filteredPosts.map((post) => {
                const isSelected = selectedPost && selectedPost.id === post.id
                const labelId = `checkbox-list-secondary-label-${post.id}`;
                return (
                    <ListItem
                        key={post.id}
                        secondaryAction={
                            <DeleteButton disabled={!isSelected} onClick={() => removePost(post.id)} />
                        }
                    >
                        <Checkbox
                            onChange={() => handleToggle(post)}
                            checked={!!isSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                            <ListItemText id={labelId} primary={post.title} />
                    </ListItem>
                );
            })}
        </List>
    )
}

export default observer(Posts);
