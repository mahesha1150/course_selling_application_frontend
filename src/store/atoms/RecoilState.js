import { atom } from 'recoil';

export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });
  
  export const openState = atom({
    key: 'openState',
    default: false,
  });

  export const courseState = atom({
    key: 'courseState',
    default: null
  })