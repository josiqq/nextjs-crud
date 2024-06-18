This is a simple CRUD, with user authentication using the [rest api](https://github.com/josiqq/auth-api-rest) that I have previously created



## Getting Started

First, run the development server:

```bash
$ npm run dev
```

## Views

### For authentication
- [/login](https://github.com/josiqq/nextjs-crud/blob/main/src/components/LoginForm.jsx) - login user 
<img src="https://github.com/josiqq/nextjs-crud/blob/main/images/login.png" width="300" />
- [/signup](https://github.com/josiqq/nextjs-crud/blob/main/src/components/SignupForm.jsx) - signup user 
<img src="https://github.com/josiqq/nextjs-crud/blob/main/images/signup.png" width="300" />

### Tasks (all tasks views need authentication)
- [/](https://github.com/josiqq/nextjs-crud/blob/main/src/components/TaskCard.jsx) - list all tasks 
<img src="https://github.com/josiqq/nextjs-crud/blob/main/images/home.png" width="300" />
- [/new](https://github.com/josiqq/nextjs-crud/blob/main/src/components/TaskForm.jsx) - create a new task 
<img src="https://github.com/josiqq/nextjs-crud/blob/main/images/newTask.png" width="300" />
- [/:id]() - show a task by id or edit a task


