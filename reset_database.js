#!/usr/bin/env shjs

require('shelljs/global');
var commander = require('commander');
var timeKeeper = require('./timeKeeper/timeKeeper.js');

commander
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-d, --database <name>', 'The name of the database to use (Optional. Will attempt to determine the database name from the SQL file name if none is specified.)')
  .option('-u, --user <uname>', 'The user to use when accessing mysql (Optional)')
  .option('-p, --password <pass>', 'The password to use when accessing mysql (Optional)')
  .option('-m, --set-dev-mode <path>', 'Run the specified set_dev_mode script automatically after the import is complete (Optional)')
  .parse(process.argv);

if(commander.args.length < 1) { commander.help(); return; }
var sqlFile = commander.args[0];

var mysqlConnectString = "mysql ";
if(typeof commander.user != "undefined") { mysqlConnectString += "-u" + commander.user + " "; }
if(typeof commander.password != "undefined") { mysqlConnectString += "-p" + commander.password + " "; }

if(typeof commander.database == 'undefined') {
  commander.database = sqlFile.replace('.sql', '').split('/').pop().split('_')[0];
  console.log('No Database chosen. Using "' + commander.database + '"\n');
} else {
  console.log('Using Database "' + commander.database + '"\n');
}

console.log("Reseting the Database\n");
timeKeeper.start();
exec(mysqlConnectString + '-e "DROP DATABASE IF EXISTS ' + commander.database + '; CREATE DATABASE ' + commander.database + ' CHARACTER SET utf8 COLLATE utf8_general_ci;"', {silent:true, async:true}, function(code, output) {
  timeKeeper.stop();
  if(code !== 0) {
    console.log('\nError Reseting the Database');
    console.log(output);
    return;
  }
  console.log('\nSuccessfully Reset the Database. Now importing ' + sqlFile + '\n');
  timeKeeper.start();

  //Import the sql file
  exec(mysqlConnectString + commander.database + ' < ' + sqlFile, {silent:true, async:true}, function(code, output) {
    timeKeeper.stop();
    if(code !== 0) {
      console.log('Error Importing ' + sqlFile);
      console.log(output);
      return;
    }

    console.log("Successfully Imported " + sqlFile + " into " + commander.database + "  :-D");

    if(typeof commander.setDevMode == 'undefined') {
      console.log("You should now run set_dev_mode.sh");
    } else {
      var scriptDir = exec('dirname ' + commander.setDevMode, {silent:true}).output.trim();
      var fileName = exec('basename ' + commander.setDevMode, {silent:true}).output.trim();
      pushd(scriptDir);
      exec('./' + fileName, {silent:false, async:true}, function(code, output){
        popd();
        if(code !== 0) {
          console.log('There was an error in ' + commander.setDevMode);
        } else {
          console.log('\n' + commander.setDevMode + ' was Successfull! Your site should be ready to use!\n');
          console.log("            _             ");
          console.log("           /(|            ");
          console.log("          (  :            ");
          console.log("         __\\  \\  _____  ");
          console.log("       (____)  `|         ");
          console.log("      (____)|   |         ");
          console.log("       (____).__|         ");
          console.log("        (___)__.|_____    \n");
        }
      });
    }

  });
});
