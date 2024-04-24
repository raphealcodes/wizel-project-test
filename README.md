# Wizel Project Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

# How to run 

# clone the project first
git clone 'Project Link'

# install the packages
npm install 

# run the app
ng serve



# Library Used:

Tailwind,
Angular Material



I used modular design pattern to allow lazy loading of the features,

I created a shared module to handle all my reusable components which consists of:

1: components folder: this handles all reuseable component e.g table list
3: models folder: this handles all the interface of data
4: services folder: this handles all my validation of the form
5: third party folder: this is where i called my angular material lib
6: dialogs folder: this is where the create user and create comment dialog can be found


Features modules is the main module i used, and holds the users modules and comments modules


I used rxjs (observables) to hold the data and pass across different component, since the api server don't persist data, instead of using local storage to hold the data, also use it to append to the existing data or update the existing data
