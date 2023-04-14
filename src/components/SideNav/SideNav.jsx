import { Fragment, useState } from 'react';
import {Drawer, Box, List, ListItemButton, ListItemText, ListItemIcon, Collapse} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import StarBorder from '@mui/icons-material/StarBorder';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PsychologyIcon from '@mui/icons-material/Psychology';

export default function SideNav(){

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  const expandCategory = () => {
    setIsCategoryExpanded(!isCategoryExpanded);
  };


  return (
    <Fragment>
      <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>{setIsDrawerOpen(true)}} 
        >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={()=>{setIsDrawerOpen(false)}}>
        <Box mt={1} textAlign="center" width='240px' component='div'>
          <List>
            <ListItemButton key="1" component="a">
              <ListItemIcon><BookIcon/></ListItemIcon>
              <ListItemText primary="Library" /> 
            </ListItemButton>

            <ListItemButton key="2" component="a" onClick={expandCategory}>
              <ListItemIcon><CategoryIcon/></ListItemIcon>
              <ListItemText primary="Category" /> 
              {isCategoryExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
              <Collapse in={isCategoryExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Educational" />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PsychologyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Psychology" />
                  </ListItemButton>

                </List>
              </Collapse>
          </List>

        </Box>
      </Drawer>
    </Fragment>
  );
}