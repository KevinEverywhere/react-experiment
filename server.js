/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var ROLES_FILE = path.join(__dirname, 'roles.json');
var USERS_FILE = path.join(__dirname, 'users.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/roles', function(req, res) {
  fs.readFile(ROLES_FILE, function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/roles', function(req, res) {
  fs.readFile(ROLES_FILE, function(err, data) {
    var roles = req.body;
    fs.writeFile(ROLES_FILE, JSON.stringify(roles, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(roles);
    });
  });
});

app.get('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    var users = JSON.parse(data);
    users.push(req.body);
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(users);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server is started: http://localhost:' + app.get('port') + '/');
});
