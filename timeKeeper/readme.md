TimeKeeper
==========

A small utility that displays an ascii timer in the cli for showing the user progress during long
running shell scripts in which you can not determine when the command will return. Works best with async functions.
I.E a progress bar will not work.

## Installation

    `npm install timeKeeper` or
    cd to timeKeeper directory and `npm install .`

## Usage

    var timeKeeper = require('timeKeeper');

    // All options are optional
    options = {
      intervalSize : 250 // How fast to increment the timer in ms. defaults to 250 ms.
      stream : process.stdout // The stream to output the timer to. defaults to process.stdout.
    };
    timeKeeper.start(options);

    // some long running async operation with a callback function parameter
    run_long_time(function() {
      timeKeeper.stop();
    });

## Release History

* 0.0.1 Initial release
