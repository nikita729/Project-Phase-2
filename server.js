var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
var bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({ extended: false }))
 

app.use(bodyparser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


var sql = require("mssql/msnodesqlv8");

var myconfig = {    
    driver: 'msnodesqlv8',
    connectionString:'Driver={SQL Server Native Client 11.0};Server={NIKITA\\SQLEXPRESS};Database={mydb};Trusted_Connection={yes};'
};


app.get('/api/recs', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        request.query('select * from Persons', function(err, recordset) {
            if(err) console.log(err);
			//console.log(res);
            res.send(recordset); // Result in JSON format
        });
    });
})
app.post('/api/signup', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var query = "insert into signup values('" + req.body.nm + "','" + req.body.phone + "','" + req.body.email + "','" + req.body.pass + "','" + req.body.role + "')";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})
app.post('/api/addproperty', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var query = "insert into addproperty values('" + req.body.add + "','" + req.body.neigh + "','" + req.body.sqft + "','" + req.body.garage + "','" + req.body.transp + "','"  + req.body.workspace + "','"  + req.body.username + "')";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})
app.post('/api/login', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.uname);
        console.log(req.query.uname);
        var query = "select * from signup where Email='" + req.body.uname + "' and password='" + req.body.pass + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.get('/api/myprop', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.uname);
        console.log(req.query.uname);
        var query = "select * from addproperty where username='" + req.query.uname + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.get('/api/propdetails', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.uname);
        console.log(req.query.uname);
        var query = "select * from addproperty where propid='" + req.query.propid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.get('/api/workspacedetails', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.uname);
        console.log(req.query.uname);
        var query = "select * from addworkspace where wkid='" + req.query.wkid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.get('/api/showworkspaces', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.uname);
        console.log(req.query.uname);
        var query = "select * from addworkspace where propid='" + req.query.propid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.get('/api/searchq', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.query);
        console.log(req.query.filter);
        var filter= req.query.filter;
        var query = req.query.query;
        if(filter=="address")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.address LIKE '%" + query  + "%') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="neighborhood")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.neighbor LIKE '%" + query  + "%') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="sqft")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.sqft='" + query  + "') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="withParking")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.garage='true') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="withoutParking")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.garage='false') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="withTransportation")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.publictransp='true') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="withoutTransportation")
        {
            var query = "SELECT addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid WHERE (addproperty.publictransp='false') AND (addworkspace.showinlisting = 'true')";
        }
        else if(filter=="seating")
        {
            var query = "select * from addworkspace where scap ='"+ query + "' and showinlisting='true'";
        }
        else if(filter=="withSmoking")
        {
            var query = "select * from addworkspace where smoking='true' and showinlisting='true'";
        }
        else if(filter=="withoutSmoking")
        {
            var query = "select * from addworkspace where smoking='false' and showinlisting='true'";
        }
        else if(filter=="availibilityDate")
        {
            var query = "select * from addworkspace where availdate ='"+ query + "' and showinlisting='true'";
        }
        else if(filter=="leaseTerm")
        {
            var query = "select * from addworkspace where lterm ='"+ query + "' and showinlisting='true'";
        }
        else if(filter=="price")
        {
            var query = "select * from addworkspace where price="+ query + "and showinlisting='true'";
        }
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})


app.get('/api/allworkspaces', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body.uname);
        console.log(req.query.uname);
        var query = "select * from addworkspace where showinlisting='true'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.get('/api/workspacealldetails', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();

        var query= "SELECT addproperty.propid, addproperty.address, addproperty.neighbor, addproperty.sqft, addproperty.garage, addproperty.publictransp, addproperty.showworkspace, addproperty.username, addworkspace.wkid, addworkspace.wkname, addworkspace.wktype, addworkspace.scap, addworkspace.availdate, addworkspace.lterm, addworkspace.price, addworkspace.smoking, addworkspace.showinlisting, addworkspace.propid AS Expr1, signup.Name, signup.Phone FROM addproperty INNER JOIN addworkspace ON addproperty.propid = addworkspace.propid AND addworkspace.wkid ='" + req.query.wkid + "'INNER JOIN signup ON addproperty.username = signup.Email";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.delete('/api/delworkspace', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();

        var query= "delete from addworkspace where wkid=" + req.query.wkid;
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})


app.post('/api/addworkspace', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        console.log(req.body);
        var query = "insert into addworkspace values('" + req.body.wkname + "','" + req.body.wktype + "','" + req.body.scap + "','" + req.body.avdate + "','" + req.body.lterm + "','"  + req.body.price + "','"  + req.body.smoking +  "','"  + req.body.slist + "','"  + req.body.propid + "')";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.put('/api/updateworkspace', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var query = "update addworkspace set wkname='" + req.body.wkname + "', wktype='" + req.body.wktype + "',scap='" + req.body.scap + "',availdate='" + req.body.avdate + "',lterm='" + req.body.lterm + "',price='" + req.body.price + "',smoking='" + req.body.smoking + "',showinlisting='" + req.body.slist + "' where wkid='" + req.body.wkid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.put('/api/luworkspace', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var showlist = req.body.slist;
        console.log(req.body.slist);
        if(showlist==true)
        {
            showlist="false";
        }
        else if(showlist==false)
        {
            showlist="true";
        }
        var query = "update addworkspace set showinlisting='" + showlist + "' where wkid='" + req.body.wkid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})

app.put('/api/luproperty', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var showlist = req.body.slist;
        console.log(req.body.slist);
        if(showlist==true)
        {
            showlist="false";
        }
        else if(showlist==false)
        {
            showlist="true";
        }
        var query = "update addproperty set showworkspace='" + showlist + "' where propid='" + req.body.propid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                var query2 = "update addworkspace set showinlisting='" + showlist + "' where propid='" + req.body.propid + "'";
                request.query(query2, function(err2, data2) 
                {
                    if(err2)
                    {
                        console.log(err2);
                        res.send(err2);
                    }
                    else
                    {
                        console.log(data2);
                        res.send(data2);
                    }
                });
            }
        });
    });
})


app.delete('/api/delproperty', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var query = "delete from addworkspace where propid=" + req.query.propid;
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                var query2 = "delete from addproperty where propid=" + req.query.propid;
                request.query(query2, function(err2, data2) 
                {
                    if(err2)
                    {
                        console.log(err2);
                        res.send(err2);
                    }
                    else
                    {
                        console.log(data2);
                        res.send(data2);
                    }
                });
            }
        });
    });
})


app.put('/api/updateproperty', function (req, res) {
    sql.connect(myconfig, function() {
        var request = new sql.Request();
        var query = "update addproperty set address='" + req.body.add + "', neighbor='" + req.body.neigh + "',sqft='" + req.body.sqft + "',garage='" + req.body.garage + "',publictransp='" + req.body.ptrans + "',showworkspace='" + req.body.swkspace  + "' where propid='" + req.body.propid + "'";
        request.query(query, function(err, data) 
        {
            if(err)
            {
                 console.log(err);
                 res.send(err);
            }
            else
            {
                console.log(data);
                res.send(data);
            }
        });
    });
})
app.listen(3000, function () {
  console.log('Node.js server is running on port 3000');
});
