var UserRoles = React.createClass({
  user:null,
  roles:[],
  /*
    users:[],
  loadRoles: function() {
    console.log("loadRoles called");
    $.ajax({
      url: this.props.rolesUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        console.error(this.props.rolesUrl, status, err.toString());
      }.bind(this)
    });
  },
  loadUsers: function() {
    $.ajax({
      url: this.props.usersUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        console.error(this.props.usersUrl, status, err.toString());
      }.bind(this)
    });
  },
   */
  manageUserRoles: function(user, rolesArg) {
    console.log(user);
    console.log(rolesArg);
    /*
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
     * /
  },
  getInitialState: function() {
    return {roles: [], users:[], user:null};
  },
  componentDidMount: function() {
    console.log("componentDidMount");
  //  this.loadUsers();
  //  this.loadRoles();
  //  setInterval(this.loadUsers, this.props.pollInterval);  // */
  },
  render: function() {
    console.log('render');
    return (
      <div className="boo">
      "hello world"</div>
      // <div className="userRoleBox">
      //   <h1>User Roles</h1>
      //   <Users users={this.state.user} />
      //   <UserRoleForm handleUserRoleSubmission={this.manageUserRoles} />
      // </div>
    );
  }
});

