import './App.css';
import UserTable from "./component/userTable";

function App() {
  return (
    <div className="App">
      <UserTable data-testid='test-user' />
    </div>
  );
}

export default App;
