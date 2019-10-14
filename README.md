# Interview Scheduler

This is an interview scheduler that is built using react. The scheduler makes axios requests to a database that stores the data and then updates the state to ensure that the components on the screen are updated in real time.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Final Product

Here is the view of the scheduler. You can add an appointment by pressing any of the big plus buttons.
!["Scheduler View"](https://github.com/etseng02/scheduler/blob/master/Docs/1.png)

When you press the add appointment button, you will need to enter in the student name and slect the interviewer. The interviewer list is different depending on each day of the week. the interviewer list for the day is retrieved through an axios request to the server and then rendered in this view.
!["Add an appointment"](https://github.com/etseng02/scheduler/blob/master/Docs/2.png)

After hitting the save button you, if the save is sucessful it will go into the show view. If unsucessful, the save will error out.
!["Show view"](https://github.com/etseng02/scheduler/blob/master/Docs/3.png)

If you would like to delete or edit any appointments you may do so. These actions will make axios requests to the database respectively.
!["Delete view"](https://github.com/etseng02/scheduler/blob/master/Docs/4.png)


## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```