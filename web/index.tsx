import * as React from "react";
import * as ReactDOM from "react-dom";
// tslint:disable-next-line: no-submodule-imports
import "react-table/react-table.css";

import { Api } from "./api/api";
import { App } from "./app/app";
import "./index.scss";

Api.Initialize({ host: "localhost:3000", protocol: "http" });

ReactDOM.render(<App />, document.getElementById("app"));
