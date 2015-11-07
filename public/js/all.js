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
  getInitialState: function() {
    return {
      currentUser:null
    };
  },
  addRolesToUser:function(which){
    this.setState({currentUser:this.refs.rolesAdder.props.curUser});
    console.log(this.refs.rolesAdder.state.newroles);
  //   console.log(this.refs.rolesAdder.props.curUser.prop.roles);
  //  
   this.props.userManager.state.currentUser.addRoles(this.refs.rolesAdder.state.newroles);
   $('#addRoleModal').modal('toggle');
  },
  render:function(){
    if(this.props.userManager.state.currentUser!=null){
      var theRef=this.props.userManager.state.currentUser;
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
              <AddRoles ref="rolesAdder" userManager={this.props.userManager} user={theUser} curUser={theRef} />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.addRolesToUser} className = "btn btn-default" >Add Roles< /button>
              
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var AddRoles=React.createClass({
  getInitialState: function() {
    return {
      newroles: []
    };
  },
  addNewRole:function(which){
      if($.inArray(which, this.state.newroles)==-1){
        var newerroles=this.state.newroles;
        newerroles.push(which);
        this.setState({
          newroles:newerroles
        })
      console.log(which + " has been added to roles.")
      }
  },
  removeNewRole:function(which){
    console.log("removeNewRole");
    console.log(which);
    console.log(this.state.newroles);
    console.log($.inArray(which, this.state.newroles));
    console.log("removeNewRoleEND");
      if($.inArray(which, this.state.newroles)!=-1){
        var newerroles=this.state.newroles.splice($.inArray(which, this.state.newroles),-1);
        this.setState({
          newroles:newerroles
        })
      console.log(which + " has been removed from roles.")
      }
  },
  render: function() {
   var formNodes="";
   if(this.props.userManager.state.currentUser!=null){
     try{
      var _currentroles=this.props.userManager.state.currentUser.props.roles;
      var _roles=this.props.userManager.state.roles;
      var me=this;
      formNodes=_roles.map(function(value, index) {
        if($.inArray(value.name, _currentroles)==-1){
          return <SelectAddRole roleBroker={me} rolename={value.name} key={index} />;
        }
      });
      formNodes = formNodes.filter(function(n){return n !== undefined}); 
     }catch(oops){
      console.log(oops);
     }
   }
    console.log(this.state.newroles);
    return <div className="rolesHolder">{formNodes}</div>
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
       return <button type="button" className="btn btn-info btn-lg" onClick={this.addRole}>Add Role</button>
    }else{
       return <span className="emptySpace"></span>
    }
  }  
});

var SelectAddRole=React.createClass({
  getInitialState: function() {
    return {
      selectActive: false
    };
  },
  addNewRole:function(){
    var _active=!this.state.selectActive;
    this.props.roleBroker.addNewRole(this.props.rolename);
    this.setState({
      selectActive:_active
    })
  },
  removeNewRole:function(){
    var _active=!this.state.selectActive;
    this.props.roleBroker.removeNewRole(this.props.rolename);
    this.setState({
      selectActive:_active
    })
  },
  render: function() {
    if(this.state.selectActive){
     return <button type="button" className="btn btn-info btn isSelected" onClick={this.removeNewRole}>{this.props.rolename}</button>
    }else{
      return <button type="button" className="btn btn-info btn isNotSelected" onClick={this.addNewRole}>{this.props.rolename}</button>
    }
  }  
});

var CommitChange=React.createClass({
  render: function() {
    return <button type="button" className="btn btn-info btn-lg" data-toggle="modal" onClick={this.props.userManager.handleUserRoleSubmission}>Make Changes</button>
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
    console.log(temproles);
  },
  addRoles: function(rolesArray) {
    console.log(rolesArray);
    var tempArr=this.props.roles.concat(rolesArray);
    this.setState({newroles:tempArr});
    // redraw();
    console.log("adding u oh roles");
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
      console.log(this.refs.Users.state.users);
      console.log("and then");
      var newUsers, oldUsers=this.refs.Users.state.users;
      oldUsers.push({
        name:$("#newName").val(),
        roles:["user"]
      });
      newUsers=oldUsers.sort(function(name1, name2) {
        return name1.name - name2.name;
      });
      console.log(newUsers);
      this.refs.Users.setState({users:newUsers});
      console.log(this.refs.Users.state.users);
      $('#addUserModal').modal('toggle');
      alert("The user has been created for this session. \n\nPlease press the Make Changes button to write to make it permanent. Press Cancel Changes if you have made a mistake.");
    }else{
      alert("Please enter a name.");
    }
    // if($("#newName")) $("#newName").val()
    console.log($("#newName").val());
  },
  addRoles:function(){
    console.log("add roles");
  },
  loadRoles: function() {
    console.log("loadRoles called");
    $.ajax({
      url: this.props.rolesUrl,
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
    console.log("load Users called");
    $.ajax({
      url: this.props.usersUrl,
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
    location.reload();
  },
  handleUserRoleSubmission: function(e) {
    e.preventDefault();
    console.log(this.props);
    // this.setState({users: temproles});
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   type: 'POST',
    //   data: temproles,
    //   success: function(data) {
    //     this.setState({roles: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },
  componentWillMount: function() {
    this.loadUsers();
    this.loadRoles();
  },
  render: function() {
    return ( 
      < div className = "userRoleBox" >
        < h1 > User Roles < /h1>
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
      </div>
    );
  }
});

// <a id="addUser" onClick={this.props.userManager.addUser} className = "addUser" >Add User< /a>
// 
function redraw(){
  ReactDOM.render( < UserRoleForm usersUrl = "/api/users"
    rolesUrl = "/api/roles" / > ,
    document.getElementById('content')
  );
}

redraw();
