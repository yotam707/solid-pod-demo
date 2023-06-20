# solid-pod-demo
This is a demo to showcase the use of Solid Pod

## Instructions
You will need to set up a proxy server I use Ngrok, once the server is up take the address for example:
`https://726f-87-68-244-88.ngrok-free.app`
add this address to the config file in the `server` directory.

once this is done you can run the server:
```sh
community-solid-server
```

this will run a runtime version of your Pod. If you wish to make it consistent you need to run:
```sh
community-solid-server -c @css:config/file.json
```


To run the client, from the client directory you can run with:
```sh
npm run dev
```


happy coding :) 
