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
