import { Fragment, useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PsychologyIcon from "@mui/icons-material/Psychology";

export default function SideNav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isItemExpanded, setIsItemExpanded] = useState({});

  const expandItem = (label) => {
    setIsItemExpanded({ ...isItemExpanded, [label]: !isItemExpanded[label] });
  };

  const MenuButton = ({ buttonProps, label, icon, expandable }) => (
    <ListItemButton
      {...buttonProps}
      onClick={() => {
        buttonProps.onClick?.();
        expandable && expandItem(label);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
      {expandable && (isItemExpanded[label] ? <ExpandMore /> : <ExpandLess />)}
    </ListItemButton>
  );

  return (
    <Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <Box mt={1} textAlign="center" width="240px" component="div">
          <List>
            <MenuButton
              buttonProps={{
                key: "1",
                component: "a",
              }}
              label="Library"
              icon={<BookIcon />}
            />
            <MenuButton
              buttonProps={{
                key: "2",
                component: "a",
              }}
              label="Category"
              expandable
              icon={<CategoryIcon />}
            />
            <Collapse in={isItemExpanded.Category} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Educational"
                  icon={<SchoolIcon />}
                />
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Psychology"
                  icon={<PsychologyIcon />}
                />
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
}
