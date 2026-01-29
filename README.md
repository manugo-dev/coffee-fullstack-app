# MVST Challenge

We're thrilled that you've made it to our MVST coding challenge! We are rooting for your success and hope to meet you in the challenge review! 🚀 If you have anything that we can help you with, just open an issue in the Github repo that was provided to you.

## How to get started

To get started with the challenge, first read this README carefully. Then you can go on and
read the READMEs inside the frontend and backend folders.

[Backend README](backend/README.md)

[Frontend README](frontend/README.md)

## Introduction

This code challenge is a project that already contains a very basic backend and frontend structure.

The backend and frontend are not connected at the beginning of the challenge.

Your task will be to implement some requirements using this repository, but you ultimately own the code. Don't feel like you need to stick to the structure provided, so feel free to refactor, readjust and improve it. Also, update this README if you want to describe your tech stack, give us instructions on how to run it, etc.

## Task Description

---

### Task 1 - Check the design

Our designers have provided us a Figma file:
https://www.figma.com/file/C4n0EqxCqKuu6Or4okx7qO/Coding-Challenge-2.0

They expect us to build a fullstack web app that accurately follows their UI/UX requirements.

### Task 2 - Coffee list :coffee:

After running the frontend. You will see a list of items at "localhost:3000". This list is currently static on the frontend. The first task is to setup a database and connect the backend and the frontend to properly render the list with the data coming from the backend.

### Task 3 - Adding a :coffee:

Following the design, place a form to add a new coffee.
You should be able to add a new coffee using the same structure/type (id, name, description, type, price and image url).
Don't worry about uploading the image, get a URL from Google, an image repository, or serve it as a static asset. You can prefill the image url input and set it to readonly if you like. However, the field needs to be submitted to the backend.

**⚠️ IMPORTANT ⚠️**

Before adding a new Coffee, you should validate if an existing record with the same `name` already exists.

### Finishing the task

1. Create a Pull Request with the coding challenge.
2. Tell MVST HR Team that you are done with it
3. That is it :)

### ⚠️ Rules

1. The codebase provided is there to reduce some decision fatigue so you can focus on the coding. Please keep in mind that the decisions of folder structure, backend layers, architecture and other decisions have to be your own (‼️).
2. Feel free to add any additional JS libraries and tell us in the README file why you chose them.
3. The frontend has to be built with React. Next.js is there to help you have a quick start and focus on the coding. You can replace it with React Vite or similar if you feel like it would be faster.
4. The data MUST be persisted in a database.
5. We love NestJS so we provided some basic backend boilerplate, but it is your choice to use it. You are free to use Next.js as a fullstack framework.
6. Provide a seeding mechanism to populate your DB.
7. Match the design in the Figma file.
8. If you don't feel comfortable using the `app` folder introduced in Next.js 13, you are allowed to use the `page` folder.

### 🔍 What we will check

To be transparent, these are some things we consider important in the challenge:

1. The final outcome. The challenge is completed if the list of items is rendered on the frontend while fetching data from a backend server and we can add items to the list through the form.
2. General skills of programming. Besides checking the outcome of your running project, we will check your code for the following: readability, organization, robustness, layering, reusability, and extensibility.
3. Application of best practices and design patterns.
4. The outcome in comparison with the design.

### Extra Points

So you are finished and feel like showing us some more? Here are a few things that we'd love to see:

1. Testing. Your choice of what to test and how.
2. Add some CSS animations or use Framer Motion
3. If you haven't already, make the frontend SEO friendly
4. Deploy your application

## FAQ

---

- I am not familiar with Next.js and NestJS

  We don't expect you to know all the internals of these frameworks. What we do care about is the quality and the outcome of what you created. For the frontend, focus more on developing a good React application rather than the bells and whistles of Next.js. For the backend part, focus more on qualitative aspects like clean code and architecture and not NestJS specifics. The same applies if you choose to use Next.js as a fullstack framework.

- I don't want to use tailwind

  Feel free to use pure CSS (we love it), styled-components, CSS preprocessors like SASS or any other library that you are comfortable with. Just don't cheat and use a full-on component library like MaterialUI or Bootstrap 😉 We need to know your CSS skills!

- The starter code won't start

  Check that you are using the correct node versions. We have provided an `.nvmrc` file so you can set it to Node 18 if you are using `nvm`. Also, make sure that you have docker installed if you want to use the DB starter script provided by us.

- Some project dependencies are out of date. Can I update them?

  Absolutely! Also ping us and let us know about this.

## Feedback

---

### What would you improve if given more time?

Please fill

### How was your experience doing this challenge?

Please fill

---

Thanks and have a great challenge! 🔥

MVST Team
