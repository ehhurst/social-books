# To run server for use on frontend
For mac:
  First, we need to start the server
  1. Make sure you have python and flask installed on your machine (I used brew)
  2. cd backend
  3. now we need to activate the python virtual evironment (venv). run: source venv/Scripts/activate (google suggests running source venv/bin/activate, but this didn't work for me)
  4. try to run python3 server.py
        - if you get a file not found error, try to install flask and flask_cors by running pip3 install flask and pip3 install flask_cors (could also be flask-cors or python3-flask-cors)
  5. now you should be able to run python3 server.py and get a success message indicating that the server is running

  
  Now we need to start the client
  1. Open a new terminal
  2. cd frontend
  3. run npm install to install all package dependencies
  4. run npm run dev, which should create a url where the client is running


I (emily) can't speak for the windows process, but I believe one differece would be to omit the source command and just run venv/Scripts/activate. 

For frontend, you also may need to run the following (if you run npm install in # 3 above you shouldn't have to do this):
- npm install react-router-dom
- npm install @fortawesome/react-fontawesome
- npm install @fortawesome/free-solid-svg-icons
- npm install axios











# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
