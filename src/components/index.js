import React from "react";
import style from "styled-jsx/style";
import Routes from "./routes";

function App() {
    return (
        <div className="App">
            <Routes />

            <style jsx>{`
            `}</style>

            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
                    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
                    sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            `}</style>
        </div>
    );
}

export default App;
