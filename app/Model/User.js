'use strict';

const Lucid = use('Lucid');

class User extends Lucid {


  uploads() {
    return this.hasMany('App/Model/Upload', 'id', 'user_id');
  }
  tokens() {
    return this.hasMany('App/Model/Token', 'id', 'user_id');
  }
}

module.exports = User;
