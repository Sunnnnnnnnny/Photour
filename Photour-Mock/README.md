# Photour-Mock
JSON Server Mock for Photour.


### Start
Install Node & npm

`sudo npm install -g json-server`

`json-server --watch db.json --routes routes.json`

### Api

- `/api/user`

- `/api/fund/search?{query}`
- `/api/fund/{code}`
- `/api/fund/{code}/name`
- `/api/fund/{code}/unit-net-value`
- `/api/fund/{code}/cumulative-net-value`
- `/api/fund/{code}/rate?{query}`  
- `/api/fund/{code}/current-asset`
- `/api/fund/{code}/managers`
- `/api/fund/{code}/manager`
- `/api/fund/{code}/company`