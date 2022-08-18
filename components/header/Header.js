import React from "react";
import { Link } from "../../routes"

const Header = () => (
    <div>
        <div>
            <Link route="/">
                <a>CrowdFunding</a>
            </Link>
        </div>
        <div>
            <Link route="/">
                <a>Campaigns</a>
            </Link>
        </div>
        <div>
            <Link route="/campaigns/new">
                <a>+</a>
            </Link>
        </div>
    </div>
)

export default Header