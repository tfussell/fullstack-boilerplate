# [Habitat Logistics](https://tryhabitat.com) - Full Stack Technical test

This test is a part of our hiring process at Habitat Logistics for full stack positions. This challenge should take somewhere between 3 and 6 hours depending on your experience. 

## Geolocation Analyzer

One of the most important factors in providing restaurants with quality service is having an accurate and consistent geolocation heartbeat of where our runners are at any given moment - we achieve this using an [open source background geolocation plugin](https://github.com/transistorsoft/react-native-background-geolocation). However, often due to manufacturer limitations, make, model, and other factors - the heartbeat sometimes goes 'stale'.

The purpose of this challenge is to create a __runner geolocation auditing__ interface. So , given:
1. data for Users, UserLocations, Shifts (when a runner is scheduled to work), and Deliveries (pickup and dropoff times)
2. input of a start date & end date

__...the end goal is to visualize the timeseries data__ (shifts/orders/locations) on a runner-by-runner basis, ultimately ranking the runners by 'worst offenders'.

## Instructions

### Code

In this repository you will find a boilerplate React/Typescript/Express/Postgres application, with full instructions on how to start up the development environment. 

The project root contains a /data directory with a .zip containing a json file for each entity (Orders, Users, UserLocations, Shifts), as well as a models.d.ts file describing their types.
 
Please keep the following points in mind:

- You can add all the models you need or extend the existing ones;
- Make your code as clear as possible, it should be understandable at a first glance (comments are more than welcome);
- Feel free to use as much or little of the boilerplate as you want - in addition to any npm libraries online to accomplish the backend tasks or visualization on the front end.

### Starting steps

Here are some steps to help you start:

- [ ] Follow README to get development environment setup

- [ ] Unzip data => create a migration that seeds the database with the provided data
