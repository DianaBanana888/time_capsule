import {
  call, put, debounce, retry, takeEvery, takeLatest, throttle
} from 'redux-saga/effects';
import {

} from './actions';
import actionTypes from './types';

// async function


// worker
// worker выполняет реальные действия (от вотчера)

// watcher следит за экшинами (это генератор)
// здесь пишем типы экшенов, какие мы отслеживаем
// каждый экшн, кот наз-ся "GET_JOKE_SAGA" будет обрабатываться этим вотчером.
// watcher
