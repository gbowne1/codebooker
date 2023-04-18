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
import WebIcon from "@mui/icons-material/Web";
import LayersIcon from "@mui/icons-material/Layers";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BugReportIcon from "@mui/icons-material/BugReport";

export default function SideNav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isItemExpanded, setIsItemExpanded] = useState({});

  const expandItem = (name) => {
    setIsItemExpanded({ ...isItemExpanded, [name]: !isItemExpanded[name] });
  };

  const MenuButton = ({ buttonProps, name, label, icon, expandable }) => (
    <ListItemButton
      {...buttonProps}
      onClick={() => {
        buttonProps.onClick?.();
        expandable && expandItem(name);
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
        size="lg"
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
              name="library"
              icon={<BookIcon />}
            />
            <MenuButton
              buttonProps={{
                key: "2",
                component: "a",
              }}
              label="Category"
              name="category"
              expandable
              icon={<CategoryIcon />}
            />
            <Collapse in={isItemExpanded.category} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Educational"
                  name="educational"
                  icon={<SchoolIcon />}
                />
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Psychology"
                  name="psychology"
                  icon={<PsychologyIcon />}
                />
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Web Development"
                  name="webdev"
                  expandable
                  icon={<WebIcon />}
                />
                <Collapse
                  in={isItemExpanded.webdev}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <MenuButton
                      buttonProps={{ sx: { pl: 7 } }}
                      label="HTML, CSS, JavaScript, etc."
                      name="webstack"
                      icon={<LayersIcon />}
                    />
                    <MenuButton
                      buttonProps={{ sx: { pl: 7 } }}
                      label="Web Design"
                      name="webdesign"
                      icon={<DesignServicesIcon />}
                    />
                  </List>
                </Collapse>
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Languages"
                  name="languages"
                  expandable
                  icon={<DataObjectIcon />}
                />
                <Collapse
                  in={isItemExpanded.languages}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <MenuButton
                      buttonProps={{ sx: { pl: 7 } }}
                      label="Python, C, C++, Assembly, C#, JavaScript, Perl, PHP, Typescript, etc."
                      name="languagelist"
                      icon={<CodeIcon />}
                    />
                  </List>
                </Collapse>
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Frameworks & Libraries"
                  name="libs"
                  expandable
                  icon={<LibraryBooksIcon />}
                />
                <Collapse in={isItemExpanded.libs} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <MenuButton
                      buttonProps={{ sx: { pl: 7 } }}
                      label="React, Angular, Vue, Next, Nuxt, etc."
                      name="frontlibs"
                      icon={<CodeIcon />}
                    />
                    <MenuButton
                      buttonProps={{ sx: { pl: 7 } }}
                      label="Microsoft, i.e, .NET, Azure"
                      name="backlibs"
                      icon={<CodeIcon />}
                    />
                  </List>
                </Collapse>
                <MenuButton
                  buttonProps={{ sx: { pl: 4 } }}
                  label="Agile/QA/Testing"
                  name="testing"
                  icon={<BugReportIcon />}
                />
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
}
