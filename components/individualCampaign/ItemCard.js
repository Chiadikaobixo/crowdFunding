import React from "react";

const ItemCard = ({ headers, title, description }) => (
    <div>
        <div>
            <h3>{headers}</h3>
            <small>{title}</small>
            <p>{description}</p>
            <hr/>
        </div>
    </div>
)

export default ItemCard