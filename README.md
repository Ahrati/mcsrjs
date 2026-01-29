# mcsrjs
![npm version](https://img.shields.io/npm/v/mcsrjs?style=flat-square&color=blue)
![License: ISC](https://img.shields.io/npm/l/mcsrjs)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![npm downloads](https://img.shields.io/npm/dt/mcsrjs?style=flat-square&color=orange)

**mcsrjs** is a Typescript module for interacting with the MCSRRanked API

## Installation
```bash
npm i mcsrjs
```

## Usage
```ts
import mcsr from 'mcsrjs';
const mcsr_client = mcsr();

var user_data: mcsr.UserData = await mcsr_client.users.get('Feinberg');
```

## License
ISC © 2026 Ahrati
