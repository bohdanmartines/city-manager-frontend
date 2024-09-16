import './App.css';
import logo from '../logo.jpg';

import Header from './Header';
import AppContent from "./AppContent";

function App() {
    return (
        <div>
            <Header pageTitle="City Manager" logoSrc={logo}>Placeholder</Header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AppContent/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
