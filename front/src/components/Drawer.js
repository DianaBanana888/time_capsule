import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Home from './Home';
import Faq from './Faq';
import LetterForm from '../pages/LetterForm';
import Auth from '../pages/Auth';
import LogOut from './LogOut';
import { loadingAC, loadedAC, logOutAC } from '../store/actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const { isAuth } = useSelector((state) => state);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // logout
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  async function logOutHandler() {
    dispatch(loadingAC());
    const response = await fetch('/auth/signout', {
      method: 'POST',
    });
    if (response) {
      const result = await response.json();
      if (!result.session) {
        dispatch(logOutAC());
      }
      console.log('Успешный выход');
    } else {
      console.log('Ошибка в выходе из системы');
    }
    dispatch(loadedAC());
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          indicatorColor='primary'
          textColor='primary'
          aria-label='scrollable force tabs example'
        >
          <Tab label='Главная' icon={<HomeIcon />} {...a11yProps(0)} />

          <Tab label='О нас' icon={<HelpIcon />} {...a11yProps(1)} />

          {isAuth ? (
            <Tab
              label='Написать письмо'
              icon={<MailIcon />}
              {...a11yProps(2)}
            />
          ) : (
            <Tab label='Войти' icon={<PersonPinIcon />} {...a11yProps(3)} />
          )}

          {isAuth ? (
            <Tab
              onClick={() => logOutHandler()}
              label='Выйти'
              icon={<PersonPinIcon />}
              {...a11yProps(3)}
            />
          ) : null}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Faq />
      </TabPanel>

      <TabPanel value={value} index={2}>
        {isAuth ? <LetterForm /> : <Auth />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {!isAuth ? <Auth /> : null}
      </TabPanel>
    </div>
  );
}
