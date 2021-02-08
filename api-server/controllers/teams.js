// Teams controller

var Teams = require('../models/teams')

module.exports.list = () => {
    return Teams
        .find()
        .exec()
}

module.exports.lookUp = id => {
    return Teams
        .findOne({_id: id}) 
        .exec()
}

module.exports.member = (id, idm) => {
    return Teams
        .aggregate([
            {"$unwind": "$members"},
            {"$match": {"members.id": idm, "_id": id}},
            {"$project": {
                _id: 0,
                "id": "$members.id",
                "team": "$team",
                "course": "$members.course",
                "name": "$members.name",
                "scores": "$members.scores"}
            }
        ])
}

module.exports.insert = t => {
     
    var newTeams = new Teams(t)    
    return newTeams.save()
}

module.exports.delete = id => {
    return Teams
        .findOneAndDelete({_id: id})
        .exec()
}

module.exports.deleteMember = (id, m) => {
  return Teams
      .findOneAndUpdate({_id: id}, {$pull:{members:{id: m}}})
      .exec()
}

module.exports.insertMember = (id, m) => {
    
    return Teams 
        .findOneAndUpdate({_id: id}, {$push:{members: m}})
        .exec()
}