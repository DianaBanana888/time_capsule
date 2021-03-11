import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import letter from './letter.jpg';
const useStyles = makeStyles({
  root: {
    maxWidth: 2500,
  },
  media: {
    height: 250,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={letter} title='...' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          Об этом проекте:
        </Typography>
        <Typography variant='body2' color='textSecondary' component='div'>
          <p>
            Мы предлагаем Вам простой и удобный в использовании сервис для
            отправки электронных писем.
          </p>
          <p>
            Вы можете отправить в будущее послание для себя или для кого-то из
            близких.
          </p>
          <p>
            Мы доставим Ваше письмо в указанную Вами дату, на тот адрес
            электронной почты, который Вы укажете.
          </p>
          <p>
            К письму можно прикреплять фото и видео, а также снимать фото и
            видео прямо в приложении.
          </p>
        </Typography>
        <Typography gutterBottom variant='h5' component='h2'>
          Как вы можете использовать наш сервис?
        </Typography>

        <ol>
          <li>Это может быть ваше послание самому себе</li>
          <li>
            Или вы можете завести новый электронный адрес, отправлять на него
            письма для своих детей или родных, а потом дать им логин и пароль от
            этого почтового ящика.
          </li>
          <li>
            А также можно написать завещание и адресаты получат письмо с ним
            после смерти отправителя.{' '}
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
