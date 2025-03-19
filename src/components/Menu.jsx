import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Menu = ({ labs, onSelectLab }) => {
  return (
    <List>
      {labs.map((lab, index) => (
        <ListItem button key={index} onClick={() => onSelectLab(lab)}>
          <ListItemText primary={lab.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;
