# nodejsBasicDemo

The spacexers is a nodejs based website made to demonstrate the basic use of multiple functionalities using nodejs. It has a home page, a login as well as a signup page and a custom profile along with other services to upload and find some files.

**Demo** of the web site can be found before 06/11/20 on this link:
https://www.spacexers.ml/



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
- Verify also that you have mongodb installed
```linux
-git clone https://github.com/XRotoX/nodejsBasicDemo.git
-cd nodejsBasicDemo/
-node index.js
```
