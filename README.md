# nodejsBasicDemo

The spacexers is a nodejs based website made to demonstrate the basic use of multiple functionalities using nodejs. It has a home page, a login as well as a signup page and a custom profile along with other services to upload and find some files.

![alt text](https://user-images.githubusercontent.com/31079981/97353013-c89e2a80-1893-11eb-8dde-6d79073b237a.png)


**Note:** Using the spacexers website without secured HTTP (HTTPS) connection is not recommended and will prevent some services from working fine, such as websocket connection.


## Features:
- User session cookie to avoid login in each visit.
- Password salt-hashed for user password protection against brute force attack [Salt (cryptography)
](https://en.wikipedia.org/wiki/Salt_(cryptography)).
- Responsive design for laptop as well as mobile.
- Lightweight frontend code for faster user experience.
- Realtime connection between server and client.


## Used libraries:
- express
- express-session
- socket.io
- mongodb
- bycryptjs
- multer
and more...

## How to use/deploy?

- Verify that you have nodejs installed on your machine by typing node -v 
- Verify also that you have mongodb installed and running
```linux
$ git clone https://github.com/XRotoX/nodejsBasicDemo.git
$ cd nodejsBasicDemo/
$ node index.js
```
