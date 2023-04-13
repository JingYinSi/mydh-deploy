const DateUtils = {
    today:{
        begin:function(){
            return new Date(new Date().setHours(0, 0, 0, 0));
        },
        end:function(){
            return new Date(new Date().setHours(23, 59, 59, 999));
        }
    },
    firstDayOfWeek: function () {
        const now = new Date();
        const day = now.getDay(),
            diff = now.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        const d = new Date(now.setDate(diff));
        return new Date(d.setHours(0, 0, 0, 0))
    },
    firstDayOfMonth: function () {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
};

//user lesson instance dayTimes update
db.reports.aggregate([
    {
        $match: {
            "createdAt": {
                $gte: DateUtils.today.begin(),
                $lte: DateUtils.today.end()
            }
        }
    },
    {
        $group: {_id: {"user": "$user", "lessonIns": "$lessonIns"}, times: {$sum: "$times"}}
    }
]).forEach(function (item) {
    db.wxusers.find({_id: item._id.user}).forEach(function (user) {
        user.lessonIns.forEach(function (lessonIns) {
            lessonIns.dayTimes = item.times
        })
        db.wxusers.updateOne({_id: user._id}, {$set: user})
    })
})

//user lesson instance dayTime update
db.reports.aggregate([
    {
        $match: {
            "createdAt": {
                $gte: DateUtils.firstDayOfWeek()
            }
        }
    },
    {
        $group: {_id: {"user": "$user", "lessonIns": "$lessonIns"}, times: {$sum: "$times"}}
    }
]).forEach(function (item) {
    db.wxusers.find({_id: item._id.user}).forEach(function (user) {
        user.lessonIns.forEach(function (lessonIns) {
            lessonIns.weekTimes = item.times
        })
        db.wxusers.updateOne({_id: user._id}, {$set: user})
    })
})

//user lesson instance monthTimes update
db.reports.aggregate([
    {
        $match: {
            "createdAt": {
                $gte: DateUtils.firstDayOfMonth()
            }
        }
    },
    {
        $group: {_id: {"user": "$user", "lessonIns": "$lessonIns"}, times: {$sum: "$times"}}
    }
]).forEach(function (item) {
    db.wxusers.find({_id: item._id.user}).forEach(function (user) {
        user.lessonIns.forEach(function (lessonIns) {
            lessonIns.monthTimes = item.times
        })
        db.wxusers.updateOne({_id: user._id}, {$set: user})
    })
})

//user lesson instance totalTimes update
db.reports.aggregate([
    {
        $match: {}
    },
    {
        $group: {_id: {"user": "$user", "lessonIns": "$lessonIns"}, times: {$sum: "$times"}}
    }
]).forEach(function (item) {
    db.wxusers.find({_id: item._id.user}).forEach(function (user) {
        user.lessonIns.forEach(function (lessonIns) {
            lessonIns.totalTimes = item.times
        })
        db.wxusers.updateOne({_id: user._id}, {$set: user})
    })
})

//user dayLessonInsNumber update
db.reports.aggregate([
    {
        $match: {
            "createdAt": {
                $gte: DateUtils.today.begin(),
                $lte: DateUtils.today.end()
            }
        }
    },
    {
        $group: { _id: { "user": "$user", "lessonIns": "$lessonIns" }, count: { $sum: 1 } }
    }
]).forEach(function (item) {
    db.wxusers.find({_id: item._id.user}).forEach(function (user) {
        user.dayLessonInsNumber = item.count
        db.wxusers.updateOne({_id: user._id}, {$set: user})
    })
})