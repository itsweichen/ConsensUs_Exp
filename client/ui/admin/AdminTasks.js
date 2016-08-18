Template.AdminTasks.helpers({
    tasks: () => {
        return Tasks.find();
    },
    voters: () => {
        return Voters.find();
    },
    voterOptions: () => {
        var voters = Voters.find({});
        var options = [];
        voters.forEach(function(item) {
            options.push({label: item.name, value: item.name})
        });
        return options;
    }
});
