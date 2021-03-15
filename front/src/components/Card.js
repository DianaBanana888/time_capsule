import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import letter from './letter.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 2500
  },
  media: {
    height: 250
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={letter} title='...' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          About the project:
        </Typography>
        <Typography variant='body2' color='textSecondary' component='div'>
          <p>
            We offer you a simple and easy-to-use service for sending emails.
          </p>
          <p>
            You can send a message to the future for yourself or someone close to you.
          </p>
          <p>
            We will deliver your letter on the date you specified, to the email address that you specify.
          </p>
          <p>
            You can attach photos and videos to the letter, as well as take photos and videos right in the application.
          </p>
        </Typography>
        <Typography gutterBottom variant='h5' component='h2'>
          How can you use our service?
        </Typography>

        <ol>
          <li>This could be your message to yourself</li>
          <li>
            Or you can create a new email address, send
            letters for your children or relatives, and then give them a username and password from
            this mailbox.
          </li>
          <li>
            And you can also write a will and the addressees will receive a letter
             after the death of the sender.{' '}
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
