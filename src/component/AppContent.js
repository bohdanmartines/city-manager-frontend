import * as React from "react";

import WelcomeContent from "./WelcomeContent";
import ProtectedContent from "./ProtectedContent";

export default class AppContent extends React.Component {
    render() {
        return (
            <div>
                <WelcomeContent />
                <ProtectedContent />
            </div>
        );
    }
}