import './App.css';
import UserTable from "./component/feature/userTable";

function App() {
  return (
    <div className="App">
      <UserTable data-testid='test-user' />
    </div>
  );
}

export default App;
