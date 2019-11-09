import React from "react";
import style from "styled-jsx/style";

const App = ({ children }) => (
    <div className="App">
        {children}

        <style jsx global>{`
            body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
                "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
                sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .App {
                margin: 2rem;
            }
        `}</style>
    </div>
);

export default App;
