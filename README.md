[![savantly.net](https://savantly.net/img/logo.png)](http://savantly.net)

[![Build Status](https://travis-ci.org/jdbranham/grafana-diagram.svg?branch=grafana-7x)](https://travis-ci.org/jdbranham/grafana-diagram)

# graphviz-grafana-diagram

This is a Grafana panel plugin based on grafana-diagram which provides a way to create diagrams leveraging the viz.js library.

- A diagram can be defined using the Graphviz DOT syntax.

## Quick Start

A diagram definition uses a `Markdown` like syntax called `Graphviz DOT`  
This is a simple flow chart definition -

```
digraph { a -> b }
```

You can find out more about the syntax [here.](https://graphviz.org/).

To render a chart in your panel, create a variable in your grafana dashboard which holds the value that contains the chart definition.  
Ensure that you have the `Diagram` visualization selected.  
In the chart definition text area in the panel options, add the variable with `$(variable)`
