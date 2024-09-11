import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx';
// import './assets/styles/scss/index.scss';
// import { UserProvider } from "./store/user/Context";
// import { MenuProvider } from "./store/menu/Context";
// import { DeckProvider } from "./store/deck/Context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DeckProvider>
      <MenuProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MenuProvider>
    </DeckProvider>
  </BrowserRouter>
);
