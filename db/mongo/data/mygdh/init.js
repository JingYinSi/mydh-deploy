//delete reports data
db.reports.deleteMany({})
//init lesson instances state data
db.wxusers.find().forEach(function (user) {
    user.lessonIns = []
    user.dayLessonInsNumber = 0
    user.lessonDays = 0
    db.wxusers.updateOne({_id: user._id}, {$set: user})
})

//init lesson instance state data
db.lessons.find().forEach(function (lesson) {
    lesson.dayLessonInsNumber = 0
    lesson.instances.forEach(function (instance) {
        instance.populations = 0
        instance.todayPopulations = 0
        instance.todayTimes = 0
    })
    db.lessons.updateOne({_id: lesson._id}, {$set: lesson})
})