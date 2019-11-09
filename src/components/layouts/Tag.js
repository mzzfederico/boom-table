import React from "react";
import style from "styled-jsx/style";

const Tag = ({type = ""}) => {
    const typeClass = type.toLocaleLowerCase().replace(" ", "_");

    return (
        <span className={`tag ${typeClass}`}>
            {type}
            <style jsx>{`
                .tag {
                    border: 1px solid #333;
                    color: #333;
                    text-transform: lowercase;
                    font-variant: small-caps;
                    font-weight: 700;
                    font-size: 0.70rem;
                    line-height: 0.70rem;
                    padding: 0.1rem 0.3rem;
                    margin-right: 0.25rem;
                    border-radius: 5px;
                }

                .tag.real_estate {
                    border: 0;
                    color: white;
                    background-color: red;
                }

                .tag.event {
                    border: 0;
                    color: white;
                    background-color: blue;
                }

                .tag.food {
                    border: 0;
                    color: white;
                    background-color: green;
                }

                .tag.other {
                    border: 0;
                    color: white;
                    background-color: purple;
                }
            `}</style>
        </span>
    );
};

export default Tag;