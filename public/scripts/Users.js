var Users = React.createClass({
  addUser: function(user) {

  },
  removeUser: function(user) {
  },
  render: function() {
    var userNodes = this.props.users.map(function(user, index) {
      return (
        <User name={user.name} key={index}>
          // {role.name}
        </User>
      );
    });
    return (
      <div className="users">
        {userNodes}
      </div>
    );
  }
});