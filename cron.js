var cron = require('cron');
var Project = require('./models/project');

var projectStatusJob = new cron.CronJob({
  cronTime: '0 * * * * *',
  onTick: function() {
    Project.find({'endDate': {$lt: new Date()}, 'status': 'open'}).populate({path: 'employer', model: 'User'}).exec(function(err, projects){
        projects.forEach(function(project){
            if (project.bids.length <= 0){
                project.status = "drafted"
                project.employer.balance += project.budgetMax;
                project.employer.save()
                project.save();
            }else{
                project.status = "pending";
                project.save();
            }
        });
    });
  },
  start: true,
  timeZone: 'Asia/Hong_Kong'
});

projectStatusJob.start();

console.log("Project Status CronJob " + projectStatusJob.running);