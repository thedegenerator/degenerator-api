'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {


  upload() {
    return this.belongsTo('App/Model/Upload', 'id', 'upload_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Comment
