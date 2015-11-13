Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var MakeChangeModal=React.createClass({
  handleUserRoleSubmission:function(){
  },
  getInitialState:function(){
    return {
        changed:false
    }
  },
  render:function(){
    return (
      <div id="makeChangeModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Make Changes</h4>
            </div>
            <div className="modal-body">
              <p>At this time, only the local version is enabled.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className = "btn btn-default" data-dismiss="modal" >OK< /button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var AddUserModal=React.createClass({
  render:function(){
    return (
      <div id="addUserModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Add User</h4>
            </div>
            <div className="modal-body">
              <p>Please enter the user name. You will be able to give permissions to the user on the next screen.</p>
              <AddUserField userManager={this.props.userManager} />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.props.userManager.addUser} className = "btn btn-default" >Add User< /button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var AddRoleModal=React.createClass({
  addRolesToUser:function(){
    this.props.userManager.state.currentUser.addRoles(
      this.refs.rolesAdder.state[this.refs.rolesAdder.props.user]
    );
   $('#addRoleModal').modal('toggle');
  },
  render:function(){
    if(this.props.userManager.state.currentUser!=null){
      var theUser=this.props.userManager.state.currentUser.props.name;
    }else{
      var theUser="no user defined";
    }
    return (
      <div id="addRoleModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Add Roles for {theUser}</h4>
            </div>
            <div className="modal-body">
              <p>Please select the new roles for {theUser}.</p>
              <AddRoles ref="rolesAdder" userManager={this.props.userManager} user={theUser} />
            </div>
            <div className="modal-footer">
              <button type="button"  onClick={this.addRolesToUser} className = "btn btn-default" >Add Roles< /button>
              
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var AddRoles=React.createClass({
  getInitialState:function(){
    return {};
  },
  addNewRole:function(which){
    if(this.state[this.props.user]){
      if($.inArray(which, this.state[this.props.user])==-1){
        var newerroles=this.state[this.props.user];
        newerroles.push(which);
        this.setState({
          [this.props.user]:newerroles
        });
      }
    }else{
      var arr=[which];
      this.setState({[this.props.user]:arr});
    }
  },
  removeNewRole:function(which){
      if($.inArray(which, this.state[this.props.user])!=-1){
        var newerroles=this.state[this.props.user].splice($.inArray(which, this.state[this.props.user]),-1);
        this.setState({
          [this.props.user]:newerroles
        })
      }
  },
  render: function() {
   var formNodes="";
   if(this.props.userManager.state.currentUser!=null){
     try{
      var _roles=this.props.userManager.state.roles;
      var currentUser=this.props.userManager.state.currentUser;
      var _currentroles=currentUser.state.newroles.length>0 ? currentUser.state.newroles : currentUser.props.roles;
      var me=this;
      formNodes=_roles.map(function(value, index) {
        if($.inArray(value.name, _currentroles)==-1){
          return <SelectAddRole roleBroker={me} rolename={value.name} user={currentUser} key={index} />;
        }
      });
      formNodes = formNodes.filter(function(n){return n !== undefined}); 
     }catch(oops){
     }
   }
   return <div className="rolesHolder">{formNodes}</div>;
  }
});

var AddUser=React.createClass({
  render: function() {
    return <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#addUserModal">Add User</button>
  }  
});

var AddUserField=React.createClass({
  render: function() {
    return <input autofocus="true" ref="newName" name="newName" id="newName" type="text" className="form-control" placeholder="Enter User Name" />
  }  
});

var AddRole=React.createClass({
  addRole:function(){
    this.props.userManager.setState({currentUser:this.props.user})
    $('#addRoleModal').modal('toggle');
  },
  render: function() {
    var _roles=this.props.user.state.newroles.length>0 ? this.props.user.state.newroles : this.props.user.props.roles;
    if(_roles.length<4){
       return <button type="button" className="btn btn-info btn" onClick={this.addRole}>Add Role</button>
    }else{
       return <span className="emptySpace"></span>
    }
  }  
});

var SelectAddRole=React.createClass({
  getInitialState: function() {
    return {
      refresh:true
    };
  },
  getCurrentActive:function(){
    return this.state[this.props.user];
  },
  addNewRole:function(){
      this.setState({[this.props.user]:true});
     this.props.roleBroker.addNewRole(this.props.rolename);
  },
  removeNewRole:function(){
    this.setState({[this.props.user]:false});
  },
  render: function() {
    if(this.props.roleBroker.state[this.props.user.props.name] && 
      this.props.roleBroker.state[this.props.user.props.name].contains(this.props.rolename)){
     return <button type="button" className="btn btn-info btn isSelected" onClick={this.removeNewRole}>{this.props.rolename}</button>
    }else{
      return <button type="button" className="btn btn-info btn isNotSelected" onClick={this.addNewRole}>{this.props.rolename}</button>
    }
  }  
});

var CommitChange=React.createClass({
  render: function() {
    return <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#makeChangeModal">Make Changes</button>
  }  
});

var RevertChange=React.createClass({
  render: function() {
    return <button type="button" className="btn btn-info btn-lg" data-toggle="modal" onClick={this.props.userManager.resetForm}>Cancel Changes</button>
  }  
});

var Role = React.createClass({
  render: function() {
    var access = this.props.access.map(function(value, index) {
      return (
        <div className="childBox" key={index}>
         <span className="role" >{value}< /span>
        </div>
      );
    });
    return ( 
      <div className = "role">
        <h3>{this.props.name} </h3>
        <div className="rolesBox">{access}</div>
      </div>
    );
  }
});

var Roles = React.createClass({
  loadRoles:function(what){
    this.setState({roles:what});
  },
  getInitialState: function() {
    return {
      roles: []
    };
  },
  render: function() {
    if(this.state.roles.length>0){
      var roles = this.state.roles.map(function(role, index) {
        return (
          <Role access={role.access} name={role.name} key={index}></Role>
        );
      });          
      return <div className="rightSide"><h2>Roles</h2>{roles}</div>
    }else{
      return <div className="rightSide"><h2>Roles</h2><span>loading roles...</span></div>;
    }
  }
});

var Users = React.createClass({
  addUser: function(user) {},
  loadUsers:function(what){
    this.setState({users:what});
  },
  getInitialState: function() {
    return {
      users: [],
      user: null
    };
  },
  render: function() {
    if(this.state.users.length>0){
      var userManager=this.props.userManager;
      var userNodes = this.state.users.map(function(user, index) {
        return (
          <User userManager={userManager} roles={user.roles} name={user.name} key={index}></User>
        );
      });          
      return <div className="leftSide">{userNodes}</div>
    }else{
      return <div className="leftSide"><span>loading users...</span></div>;
    }
  }
});

var User = React.createClass({
  getInitialState:function(){
    return {
      roles:[],
      newroles: []
    };
  },
  removeRole: function(e) {
    var roleToRemove=e.target.id.substr(e.target.id.indexOf("_")+1);
    var temproles=this.state.newroles.length>0 ? this.state.newroles : this.props.roles;
    if(temproles.length>1){
      temproles.splice($.inArray(roleToRemove, temproles), 1);
      redraw();
    }else{
      alert("You must have at least one role per user.");
    }
  },
  addRoles: function(rolesArray) {
    if(rolesArray){
      var duplicates=this.props.roles.concat(rolesArray);
      var unique = duplicates.unique();
      this.setState({newroles:unique});
    }
  },
  render: function() {
    var me=this;
    var _roles=this.state.newroles.length>0 ? this.state.newroles : this.props.roles;
    var roles =  _roles.map(function(value, index) {
      return (
        <div className="childBox" key={index}>
        <span className="cbRole" >{value}< /span> 
        <a id={index + "_" + value} onClick={me.removeRole} className = "deleteRole" >&times;< /a>
        </div>
      );
    });
    return ( <div className = "userBox">
      <span className="h3"> {
        this.props.name
      } </span>
      <AddRole userManager={me.props.userManager} user={me} />
      <div className="rolesBox">
      {roles}
      </div>
      </div>
    );
  }
});

var UserRoleForm = React.createClass({
  getInitialState:function(){
    return {currentUser: null,roles:[]}
  },
  addUser:function(){
    if($("#newName").val().length>0){
      var newUsers, oldUsers=this.refs.Users.state.users;
      oldUsers.push({
        name:$("#newName").val(),
        roles:["user"]
      });
      newUsers=oldUsers.sort(function(name1, name2) {
        return name1.name - name2.name;
      });
      this.refs.Users.setState({users:newUsers});
      $('#addUserModal').modal('toggle');
      alert("The user has been created for this session. \n\nPlease press the Make Changes button to write to make it permanent. Press Cancel Changes if you have made a mistake.");
    }else{
      alert("Please enter a name.");
    }
  },
  addRoles:function(){
    console.log("add roles");
  },
  loadRoles: function() {
    var _url=this.props.rolesUrl;
    if(location.host.indexOf("fiddle")!=-1){
      _url="https://raw.githubusercontent.com/KevinEverywhere/react-experiment/master/roles.json";
    }
    $.ajax({
      url: _url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.refs.Roles.loadRoles(data);
        this.setState({roles:data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.rolesUrl, status, err.toString());
      }.bind(this)
    });
  },
  loadUsers: function() {
    var _url=this.props.usersUrl;
    if(location.host.indexOf("fiddle")!=-1){
      _url="https://raw.githubusercontent.com/KevinEverywhere/react-experiment/master/users.json";
    }
    $.ajax({
      url: _url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.refs.Users.loadUsers(data, this);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.usersUrl, status, err.toString());
      }.bind(this)
    });
  },
  resetForm: function(e) {
    e.preventDefault();
    if(confirm("The page will reload.")){
      location.reload();
    }
  },
  handleUserRoleSubmission: function(e) {
    e.preventDefault();
    console.log(this.props);
  },
  componentWillMount: function() {
    this.loadUsers();
    this.loadRoles();
  },
  render: function() {
    return ( 
      < div className = "userRoleBox" >
        <h1>React Components With Staged Add and Delete</h1>
        <p>A demonstration of communication between React Components and external data sources. This can be seen at <a href="http://jsfiddle.net/KevinReady/2jddLxr4/6/">JSFiddle</a></p>
        < h2 > User Roles < /h2>
        < form className = "userRoleForm">
          <AddUser userManager={this} />
          <CommitChange userManager={this} />
          <RevertChange userManager={this} />
          <hr/>
          <div className="bothSides">
            <Users userManager={this} ref = "Users" /> 
            <Roles userManager={this} ref = "Roles" /> 
          </div>
        </form>
        <AddUserModal userManager={this} />
        <AddRoleModal userManager={this} />
        <MakeChangeModal userManager={this} />
      </div>
    );
  }
});

function redraw(){
  ReactDOM.render( < UserRoleForm usersUrl = "/api/users"
    rolesUrl = "/api/roles" / > ,
    document.getElementById('content')
  );
}

redraw();
