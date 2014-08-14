var readline = require('readline');
module.exports = {
  startTime : null,
  interval : null,
  stream : null,
  start : function(opts) {
    opts = opts || {};
    this.stream = (opts.stream || process.stdout);
    var self = this;
    this.startTime = new Date();

    self.updateTime();
    this.interval = setInterval(function() { self.updateTime(); }, (opts.intervalSize || 250) );
  },
  stop : function() {
    clearInterval(this.interval);
    this.updateTime();
    this.stream.write('\n');
  },
  updateTime : function() {
    var curTime = new Date();
    var timeElapsed = new Date(curTime.getTime() - this.startTime.getTime());
    this.clear();
    this.stream.write('Time Elapsed -- ' + timeElapsed.getMinutes() + 'm : ' + timeElapsed.getSeconds() + 's : ' + timeElapsed.getMilliseconds() + 'ms');
  },
  clear: function(){
    readline.cursorTo(this.stream, 0);
    readline.clearLine(this.stream, 0);
  }
};
