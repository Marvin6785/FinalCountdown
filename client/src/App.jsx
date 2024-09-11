import { useCheckAuth } from "./hooks/UseCheckAuth";

import UserRouter from "./router/UserRouter";
import AdminRouter from "./router/AdminRouter";
import Loader from "./components/Loader";

function App() {
  const [user, isLoading] = useCheckAuth();

  if (isLoading) {
    return <Loader />;
  }

  if(user.isAdmin) {
    return <AdminRouter />;
  } else return <UserRouter />;
}

export default App;