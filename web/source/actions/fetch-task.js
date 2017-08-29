import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

const TASKS: Array<Model.Task> = [
  {
    options: [
      {
        id: 0,
        name: 'PewDiePie',
        category: 'youtuber',
        links: [],
        hintMessages: [],
      },
      {
        id: 1,
        name: 'Siminov',
        category: 'youtuber',
        links: [],
        hintMessages: [],
      },
      {
        id: 2,
        name: 'Trump',
        category: 'president',
        links: [],
        hintMessages: [],
      },
    ],
    image: {
      id: 0,
      sourceLink: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/161107120239-01-trump-parry-super-169.jpg',
      sourceAlt: 'D. Trump',
      optionId: 2,
    }
  },
  {
    options: [
      {
        id: 1,
        name: 'Siminov',
        category: 'youtuber',
        links: [],
        hintMessages: [],
      },
      {
        id: 3,
        name: 'Maddyson',
        category: 'streamer',
        links: [],
        hintMessages: [],
      },
      {
        id: 4,
        name: 'Khovan',
        category: 'youtuber',
        links: [],
        hintMessages: [],
      },
    ],
    image: {
      id: 1,
      sourceLink: 'http://s1.storage.akamai.coub.com/get/b34/p/coub/simple/cw_timeline_pic/25afdb36b40/490f1029e9198495a1b88/big_1442331374_image.jpg',
      sourceAlt: 'S. Simonov',
      optionId: 1,
    }
  },
  {
    options: [
      {
        id: 0,
        name: 'PewDiePie',
        category: 'youtuber',
        links: [],
        hintMessages: [],
      },
      {
        id: 5,
        name: 'Racoon',
        category: 'animal',
        links: [],
        hintMessages: [],
      },
      {
        id: 6,
        name: 'Obama',
        category: 'president',
        links: [],
        hintMessages: [],
      },
    ],
    image: {
      id: 2,
      sourceLink: 'https://i.pinimg.com/736x/75/a0/c6/75a0c6c035f9c7e90348f18ac1059009--racoon-animal-faces.jpg',
      sourceAlt: 'Racoon',
      optionId: 5,
    }
  },
];

let index: number = Math.round(Math.random() * 100) % 3;
let interval: number = 0;
export default (trigger: Trigger) => {
  if (index + 1 > TASKS.length) {
    index = 0;
  }

  clearInterval(interval);
  setTimeout(() => {
    let state: Model.State = trigger.state();
    let timestamp: number = Math.floor(new Date().getTime() / 1000);
    state.task = TASKS[index++];
    state.act.timestamp = timestamp;
    state.act.status = Constants.ACT_STATUS_PROCESS;
    trigger.push(Actions.ACTION_FETCH_TASK, state);

    interval = setInterval(() => {
      trigger.call(Actions.ACTION_TICK, interval);
    }, 1000);
  }, 500);
}
