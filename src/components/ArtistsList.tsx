import React, {FunctionComponent} from 'react';
import { ArtistsListProps } from '../types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ArtistsList: FunctionComponent<ArtistsListProps> = props => {
    return <List>
        {
            props.artists.map(({name, id}) => 
                <ListItem key={ id } button>
                    <ListItemText>{ name }</ListItemText>
                </ListItem>)
        }
    </List>
}

export default ArtistsList;