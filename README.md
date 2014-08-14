daterbase
=========

A Shell Script for easy database reseting and importing for Pantheon and Drupal based sites

## Installation

  `npm install -g https://github.com/Galavantier/daterbase.git`

## Usage

  `reset_database [options] <file>`

  where `<file>` is the path to an sql database export file (usually from Pantheon)

  Options:

    -h, --help
        output usage information

    -V, --version
        output the version number

    -d, --database <name>
        The name of the database to use
        (Optional)
          Will attempt to determine the database name from the
          SQL file name if none is specified.

    -u, --user <uname>
        The user to use when accessing mysql (Optional)

    -p, --password <pass>
        The password to use when accessing mysql (Optional)

    -m, --set-dev-mode <path>
        (Optional)
          Run the specified set_dev_mode script automatically
          after the import is complete

## Release History

  * 0.0.1 Initial release
