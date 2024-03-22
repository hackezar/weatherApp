import _ from "lodash";
import "./style.css";

//arrays


//js
import { autocompleteMatch, showResults, searchBarKeyUpEventListener} from "./renderDatabase";
import searchBarEventListeners from "./cityLookup";

searchBarKeyUpEventListener();
window.addEventListener('DOMContentLoaded', () => {
    searchBarEventListeners();
});

