# Library System

This is a project that provides a simple backend and frontend for your library

The backend is a Flask app that provides a simple API by connecting to an SQLite database

The frontend can be served by any HTTP server and is a Boostrap/JS app

The server files are in /server/, read the README.md in that folder for instructions on how to run the server

The frontend files are in /client/, and are completely static, so can be served by any HTTP server.

When using the system, the user will need to manually set their server's url. 
You could also modify the code to use a server URL you specify by default, by uncommenting the code block at the top of js/common.js