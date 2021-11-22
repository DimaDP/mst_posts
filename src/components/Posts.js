import {Button, Checkbox, List, ListItem, ListItemText} from '@mui/material';
import {useState} from 'react';
import {useRootStore} from '../store/store';
import {observer} from 'mobx-react-lite';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ title, onClick, disabled, fontSize, ...rest }) => (
    <Button aria-label="Delete" onClick={onClick} disabled={disabled} tooltip={title} {...rest}>
        <DeleteIcon fontSize={fontSize} />
    </Button>
)

const Posts = () => {
    const [checked, setChecked] = useState([]);
    const { filteredPosts, removePost } = useRootStore();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <List dense sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            {filteredPosts.map((post) => {
                const labelId = `checkbox-list-secondary-label-${post.id}`;
                return (
                    <ListItem
                        key={post.id}
                        secondaryAction={
                            <DeleteButton disabled={!checked.includes(post.id)} onClick={() => removePost(post.id)} />
                        }
                    >
                        <Checkbox
                            onChange={handleToggle(post.id)}
                            checked={checked.indexOf(post.id) !== -1}
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
