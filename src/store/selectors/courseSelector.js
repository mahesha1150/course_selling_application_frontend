import { courseState } from "../atoms/RecoilState";
import { selector } from "recoil";

export const courseTitleSelector = selector({
    key: 'courseTitleSelector', // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const course = get(courseState);
        if (course)
            return course.title;

        return "";
    },
});

export const courseDescriptionSelector = selector({
    key: 'courseDescriptionSelector',
    get: ({ get }) => {
        const course = get(courseState);
        if (course)
            return course.description;

        return "";
    },
});

export const coursePriceSelector = selector({
    key: 'coursePriceSelector',
    get: ({ get }) => {
        const course = get(courseState);
        if (course)
            return course.price;

        return 0;
    },
});

export const courseImageSelector = selector({
    key: 'courseImageSelector',
    get: ({ get }) => {
        const course = get(courseState);
        if (course)
            return course.imageLink;

        return "";
    },
});

export const coursePublishedSelector = selector({
    key: 'coursePublishedSelector',
    get: ({ get }) => {
        const course = get(courseState);
        if (course)
            return course.published;

        return false;
    },
});

