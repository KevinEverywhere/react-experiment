var UserRoleForm = React.createClass({
  handleUserRoleSubmission: function(e) {
    e.preventDefault();
    this.props.onSubmitForm({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';
  },
  render: function() {
    return (
      <form className="userRoleForm" onSubmitForm={this.handleUserRoleSubmission}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

