//delete reports data
db.reports.deleteMany({})
//init lesson instances state data
db.wxusers.find().forEach(function(user){
    user.lessonIns.forEach(function(lessonIns){
        lessonIns.days=0
        lessonIns.dayTimes=0
        lessonIns.weekTimes=0
        lessonIns.monthTimes=0
        lessonIns.totalTimes=0
    })
    db.wxusers.updateOne({_id:user._id},{$set:user})
})

//init lesson instance state data
db.lessons.find().forEach(function(lesson){
    lesson.instances.forEach(function(instance){
        instance.populations=0
        instance.todayPopulations=0
        instance.todayTimes=0
    })
    db.lessons.updateOne({_id:lesson._id},{$set:lesson})
})