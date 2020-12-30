# 2kb Markdown Component Solution for React js

Quick walkthroug of the file [here](https://mammothnotes.com/Parsing-HTML-strings-to-React-Elements_straight-forward-and-dead-simple)

## Basic usage

    import React from "react";

    import Markup from "./Markup";

    const string = "<div><p>Mary <span>likes</span> to <b>feel</b> blessed</p></div>";

    export default () => 
      <Markup>{string}</Markup>