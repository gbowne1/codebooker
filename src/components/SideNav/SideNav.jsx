import { Fragment, useState } from 'react';
import {
    Drawer,
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WebIcon from '@mui/icons-material/Web';
import LayersIcon from '@mui/icons-material/Layers';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BugReportIcon from '@mui/icons-material/BugReport';
import PropTypes from 'prop-types';

export default function SideNav({ setfilter }) {
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
            {expandable &&
                (isItemExpanded[label] ? <ExpandMore /> : <ExpandLess />)}
        </ListItemButton>
    );

    MenuButton.propTypes = {
        buttonProps: PropTypes.shape({
            onClick: PropTypes.func,
        }),
        name: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.object,
        expandable: PropTypes.bool,
    };

    const setFilter = (val) => {
        setIsDrawerOpen(false);
        setfilter(val);
    };

    const languages = [
        'Python',
        'C',
        'C++',
        'Assembly',
        'C#',
        'JavaScript',
        'Perl',
        'PHP',
        'Typescript',
    ];
    const frameworks = ['React', 'Angular', 'Vue', 'Next', 'Nuxt'];
    const devOps = ['Microsoft', 'i.e', '.NET', 'Azure'];

    return (
        <Fragment>
            <IconButton
                size='lg'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
                onClick={() => {
                    setIsDrawerOpen(true);
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={() => {
                    setIsDrawerOpen(false);
                }}
            >
                <Box mt={1} textAlign='center' width='240px' component='div'>
                    <List>
                        <MenuButton
                            buttonProps={{
                                key: '1',
                                component: 'a',
                            }}
                            label='Library'
                            name='library'
                            icon={<BookIcon />}
                        />
                        <MenuButton
                            buttonProps={{
                                key: '2',
                                component: 'a',
                            }}
                            label='Category'
                            name='category'
                            expandable
                            icon={<CategoryIcon />}
                        />
                        <Collapse
                            in={isItemExpanded.category}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List component='div' disablePadding>
                                <MenuButton
                                    buttonProps={{ sx: { pl: 4 } }}
                                    label='Web Development'
                                    name='webdev'
                                    expandable
                                    icon={<WebIcon />}
                                />
                                <Collapse
                                    in={isItemExpanded.webdev}
                                    timeout='auto'
                                    unmountOnExit
                                >
                                    <List component='div' disablePadding>
                                        <MenuButton
                                            buttonProps={{
                                                sx: { pl: 7 },
                                                onClick: () => {
                                                    setFilter(
                                                        'Web Developement'
                                                    );
                                                },
                                            }}
                                            label='HTML, CSS, JavaScript, etc.'
                                            name='webstack'
                                            icon={<LayersIcon />}
                                        />
                                        <MenuButton
                                            buttonProps={{
                                                sx: { pl: 7 },
                                                onClick: () => {
                                                    setFilter('Web Design');
                                                },
                                            }}
                                            label='Web Design'
                                            name='webdesign'
                                            icon={<DesignServicesIcon />}
                                        />
                                    </List>
                                </Collapse>
                                <MenuButton
                                    buttonProps={{ sx: { pl: 4 } }}
                                    label='Languages'
                                    name='languages'
                                    expandable
                                    icon={<DataObjectIcon />}
                                />
                                <Collapse
                                    in={isItemExpanded.languages}
                                    timeout='auto'
                                    unmountOnExit
                                >
                                    <List component='div' disablePadding>
                                        {languages &&
                                            languages.map((ele, index) => (
                                                <MenuButton
                                                    key={index}
                                                    buttonProps={{
                                                        sx: { pl: 7 },
                                                        onClick: () => {
                                                            setFilter(ele);
                                                        },
                                                    }}
                                                    label={ele}
                                                    name='languagelist'
                                                    icon={<CodeIcon />}
                                                />
                                            ))}
                                    </List>
                                </Collapse>
                                <MenuButton
                                    buttonProps={{ sx: { pl: 4 } }}
                                    label='Frameworks & Libraries'
                                    name='libs'
                                    expandable
                                    icon={<LibraryBooksIcon />}
                                />
                                <Collapse
                                    in={isItemExpanded.libs}
                                    timeout='auto'
                                    unmountOnExit
                                >
                                    <List component='div' disablePadding>
                                        {frameworks &&
                                            frameworks.map((ele, index) => (
                                                <MenuButton
                                                    key={index}
                                                    buttonProps={{
                                                        sx: { pl: 7 },
                                                        onClick: () => {
                                                            setFilter(ele);
                                                        },
                                                    }}
                                                    label={ele}
                                                    name='languagelist'
                                                    icon={<CodeIcon />}
                                                />
                                            ))}
                                        {devOps &&
                                            devOps.map((ele, index) => (
                                                <MenuButton
                                                    key={index}
                                                    buttonProps={{
                                                        sx: { pl: 7 },
                                                        onClick: () => {
                                                            setFilter(ele);
                                                        },
                                                    }}
                                                    label={ele}
                                                    name='languagelist'
                                                    icon={<CodeIcon />}
                                                />
                                            ))}
                                    </List>
                                </Collapse>
                                <MenuButton
                                    buttonProps={{
                                        sx: { pl: 4 },
                                        onClick: () => {
                                            setFilter('Agile/QA/Testing');
                                        },
                                    }}
                                    label='Agile/QA/Testing'
                                    name='testing'
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

SideNav.propTypes = {
    setfilter: PropTypes.func,
};
