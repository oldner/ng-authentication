# ng-authentication

This is a basic authentication project which is created with Node.js, Express.js, MongoDB and Angular.

# Documentation

In this scenario you need to log in to see home (/) directory. To logged in, firstly create a user adressed to http://localhost:4040/register . This url will need a user email and user password. These information will be send to backend and it will connect to MongoDB. If it is succesful, it will send OK response and you will be redirect to home page. When you registered or logged in, a jsonwebtoken will be produced in backend. This token will be sent to your client. Everytime you want to see home page you this token will be confirmed with jwt.sign function. If it is OK, it will show you the page.
