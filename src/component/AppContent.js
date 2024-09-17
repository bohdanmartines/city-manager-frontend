import * as React from "react";

import WelcomeContent from "./WelcomeContent";
import ProtectedContent from "./ProtectedContent";
import AuthComponent from "./AuthComponent";

export default class AppContent extends React.Component {
    render() {
        return (
            <div>
                <WelcomeContent />
                <ProtectedContent />
                <AuthComponent />
            </div>
        );
    }
}