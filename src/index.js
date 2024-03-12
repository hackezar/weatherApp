import _ from "lodash";
import "./style.css";

//scripts
import autocomplete from "./citySearch";

//arrays
import cities from 'all-the-cities';

autocomplete(document.getElementById('location'), cities);

