import { userState } from "../atoms/RecoilState";
import { selector } from "recoil";

export const userRoleSelector = selector({
    key: 'userRoleSelector', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const user = get(userState);
  
      return user.userRole;
    },
  });