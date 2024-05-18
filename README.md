# [Introduction](#introduction)



Secure.sh is a free [opensource] web app that provides secure file encryption in the browser.

<br>

# [Features](#features)



### Security

- [XChaCha20-Poly1305] - for symmetric encryption.
- [Argon2id] - for password-based key derivation.
- [X25519] - for key exchange.

The libsodium library is used for all cryptographic algorithms. [Technical details here](#technical-details).

<br>

### Privacy

- The app runs locally in your browser.
- No data is ever collected or sent to anyone.​

<br>

### Functionality

- Secure encryption/decryption of files with passwords or keys.
- Secure random password generation.
- Asymmetric key pair generation.
- Authenticated key exchange.
- Password strength estimation.

<br>

# [Installation](#installation)

---
It's easy to self host and deploy Secure.sh, you can do that either with npm or docker

If you wish to self host the app please follow these instructions:

<br>

## With npm

Before installation make sure you are running [nodejs](https://nodejs.org/en/) and have [npm](https://www.npmjs.com/) installed

<br >

1. clone the github repository

```bash
git clone https://github.com/Ayush2966/Secure.sh
```

2. move to the folder

```bash
cd Secure.sh
```

3. install dependencies

```bash
npm install
```

4. build app

```bash
npm run build
```

5. start Secure.sh

```bash
npm run start
```

the app should be running on port 3391.
<br>

if you wish to run the app in development enviroment run :

<br>

```bash
npm run dev
```
