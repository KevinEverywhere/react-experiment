var User = React.createClass({
  removeRole: function(e) {
    var roleToRemove=e.target.id.substr(e.target.id.indexOf("_")+1);
    var temproles=this.props.roles;
    if(temproles.length>1){
      temproles.splice($.inArray(roleToRemove, temproles), 1);
      redraw();
    }else{
      alert("You must have at least one role per user.");
    }
    console.log(temproles);
  },
  addRole: function(e) {
    if(this.props.roles.length<4){
      var temproles=this.props.roles;
      temproles.push("new role");
      redraw();
    }else{
      alert("You cannot add any more roles to this user.");
    }
    console.log(temproles);
  },
  render: function() {
    var me=this;
    var roles = this.props.roles.map(function(value, index) {
      return (
        <div className="childBox" key={index}>
        <span className="cbRole" >{value}< /span> 
        <a id={index + "_" + value} onClick={me.removeRole} className = "deleteRole" >X< /a>
        </div>
      );
    });
    return ( <div className = "userBox">
      <h3> {
        this.props.name
      } </h3>
      <AddRole userManager={this.props.userManager} user={me} />

      <div className="rolesBox">
      {roles}
      </div>
      </div>
    );
  }
});

var AddUserField=React.createClass({
  render: function() {
    return <input ref="newName" name="newName" id="newName" type="text" className="form-control" placeholder="Enter User Name" />
  }  
});

var AddUser=React.createClass({
  render: function() {
    return <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#addUserModal">Add User</button>
  }  
});
// <a id="addUser" onClick={this.props.userManager.addUser} className = "addUser" >Add User< /a>
var AddRole=React.createClass({
  prepareSelection:function(){
    // 
  },
  render: function() {
    return <button type="button" className="btn btn-info btn" onClick={this.props.user.addRole}>Add Role</button>
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
      return <div className="leftSide"><h2>Users</h2>{userNodes}</div>
    }else{
      return <div className="leftSide"><h2>Users</h2><span>loading users...</span></div>;
    }
  }
});

var UserRoleForm = React.createClass({
  user: null,
  roles: [],
  users: [],
  addUser:function(){
    if($("#newName").val().length>0){
      console.log(this.refs.Users.state.users);
      console.log("and then");
      var oldUsers=this.refs.Users.state.users;
      oldUsers.push({
        name:$("#newName").val(),
        roles:["user"]
      });
      this.refs.Users.setState({users:oldUsers});
      console.log(this.refs.Users.state.users);
      $('#addUserModal').modal('toggle');
      alert("The user has been created for this session. \n\nPlease press the Make Changes button to write to make it permanent. Press Cancel Changes if you have made a mistake.");
    }else{
      alert("Please enter a name.");
    }
    // if($("#newName")) $("#newName").val()
    console.log($("#newName").val());
  },
  addRole:function(){
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
        <AddUserField userManager={this.userManager} />
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

// <a id="addUser" onClick={this.props.userManager.addUser} className = "addUser" >Add User< /a>
// 
function redraw(){
  ReactDOM.render( < UserRoleForm usersUrl = "/api/users"
    rolesUrl = "/api/roles" / > ,
    document.getElementById('content')
  );
}

redraw();
