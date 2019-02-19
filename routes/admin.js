var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Skills = require('../models/skills');
var Question = require('../models/question');
var bodyParser = require('body-parser');
var Ticket = require('../models/ticket');
var TicketContent = require('../models/ticketContent');
var BankDeposit = require('../models/bankDeposit');
var PaypalDeposit = require("../models/paypalDeposit");
var	multer  = require('multer');
var	mkdirp = require('mkdirp');
var	mime = require('mime');
var	upload = require("../middleware/upload");

router.get('/admin',function (req,res) {
  res.render("./admin");
});

router.get('/admin/createUser',function(req,res) {
  res.render('./admin/createUser');
});

router.get('/admin/updateUser',function(req,res) {
  res.render('./admin/updateUser');
});

router.get('/admin/readUser',function(req,res) {
  User.find({},function(err,users) {
    if(err) {
      console.log(err);
    } else {
      res.render('./admin/readUser',{users:users});
    }
  });
});

router.delete('/admin/readUser',function(req,res) {
  var userid = req.body.user_id;
  User.findOneAndRemove({_id:userid},function(err,user) {
    console.log(user + "has been removed");
    res.redirect("/admin/readUser");
  });
});

//create a employee user and redirect to somewhere
router.post('/admin/createUser',function(req,res) {
    User.create(req.body.user,function(err,newUser){
      if(err) {
        res.redirect("/admin");
      } else {
        req.flash("success", "The resgistration successful!");
        res.redirect("/admin/createUser");
      }
    });
});



router.put('/admin/updateUser',function(req,res) {
  var user = req.body.user;
  console.log(user);
  User.findOneAndUpdate({_id:req.body.user._id},req.body.user,function(err,user) {
    if(err) {
      req.flash("error","error");
      console.log(err);
    } else {
      console.log("found " + user);
      req.flash("success", "The personal Information updated successful!");
      res.redirect("/admin/readUser");
    }
  });
});

router.get('/admin/updateUser/:id',function(req,res) {
  //find the user with providing id
  User.findById(req.params.id,function(err,foundUser) {
    if(err) {
      console.log(foundUser);
    } else {
      res.render("./admin/updateUser",{foundUser:foundUser});
    }
  });
});


router.get('/admin/deleteUser',function(req,res) {
  res.render('./admin/deleteUser');
});

//skill module

//read all skills
router.get('/admin/readSkill',function(req,res) {
    Skills.find({},function(err,foundSkill) {
    if(err) {
      console.log(err);
    } else {
      
      res.render('./admin/readSkill',{foundSkill:foundSkill});
      
    }
  });
  
});


router.delete('/admin/readSkill',function(req,res) {
  // res.send(req.body.skill_id);
  Skills.findOneAndRemove(req.body.skill_id,function(err,skill) {
    if(err) {
      console.log(err);
    } else {
      req.flash("success", "delete successful!");
      res.redirect("/admin/readSkill");
    }
  });
});

//http get request which to create a skill
router.get('/admin/createSkill',function(req,res) {
  res.render("./admin/createSkill");
});

router.post('/admin/createSkill',function(req,res) {

  Question.create(req.body.question,function(err,question) {
    if(err) {
      console.log(err);
    } else {
      Skills.create(req.body.skills,function(err,skill) {
        if(err) {
          console.log(err);
        } else {
          skill.question = question;
          skill.save(function(err,data) {
            if(err) {
              console.log(err);
            } else {
              req.flash("success", "create successful!");
              res.redirect("/admin/createSkill");
            }
          });
        }
      });
    }
  });
});

function splitAnswer(answer) {
  var result = [];
  for(var i=0,len=answer.length;i<len;i+=4){
     result.push(answer.slice(i,i+4));
  }
  return result;
}

router.put('/admin/editSkill',function(req,res) {
  Skills.findById(req.body.skills._id,function(err,skill) {
    if(err) {
      console.log(err);
    } else {
      skill.type = req.body.skills.type;
      skill.name = req.body.skills.name;
      skill.save();
      Question.findOneAndUpdate(skill.question,req.body.question,function(err,question) {
        if(err) {
          console.log(err);
        } else {
          req.flash("success", "update successful!");
          res.redirect('/admin/readSkill');
        }
      });
      
    }
  });
});

router.get('/admin/editSkill/:id',function(req,res) {
    Skills.findById(req.params.id).populate("question").exec(function(err,skill) {
      if(err) {
        console.log(err);
      } else {
        var answer = splitAnswer(skill.question.answer);
        res.render('./admin/updateSkill', {skill:skill,question:skill.question.question,answer:answer});
      }
    });
});


//================
// Payment(BankDeposit)
//================

// read payment status
router.get('/admin/readPayment',function(req,res) {
  //   bankDeposit.find({},function(err,foundBankDeposits) {
  //   if(err) {
  //     console.log(err);
  //   } else {
      
  //     res.render('./admin/readPayment',{foundBankDeposits:foundBankDeposits});
      
  //   }
  // });
  
  //find all bank deposit records
  BankDeposit.find({}).populate({path:'user',model:'User'}).exec(function(err,banks) {
    if(err) {
      console.log(err);
    } else {
      res.render('./admin/readPayment',{foundBankDeposits:banks});
    }
  });
  
});


router.delete('/admin/readPayment',function(req,res) {
  BankDeposit.findOneAndRemove(req.body.deposit_id,function(err,data) {
    if(err) {
      console.log(err);
    } else {
        req.flash("success", "delete successful!");
        res.redirect('/admin/readPayment');      
    }
  })
});

router.get('/admin/editPayment/:id',function(req,res) {
  BankDeposit.findById(req.params.id).populate({path:'user',model:'User'}).exec(function(err,bank) {
    res.render('./admin/editDeposit',{bank:bank});
  });
});

router.put('/admin/editPayment',function(req,res) {
  console.log(req.body);
  BankDeposit.findOneAndUpdate({_id:req.body.bank._id},{$set:{status:req.body.bank.status}}).populate({path:'user',model:'User'}).exec(function(err,data) {
    if(err) {
      console.log(err);
    } else {
      if (req.body.bank.status == "Approved"){
        data.approvalTime = new Date();
        data.user.balance+=data.amount;
        data.user.save(function(err, bankdeposit){
          if(err) {
            console.log(err);
          } else {
            console.log(bankdeposit);
            res.redirect('/admin/readPayment');
          }
        });
      }else{
        res.redirect('/admin/readPayment');
      }
    }
  });
});

//=================================
// supporting 
// ================================

router.get('/admin/searchSupport',function(req,res){
  
    Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,ticketsWithOpen) {
      if(err) {
        console.log(err);
      } else {
        res.render('./admin/searchSupport',{ticketsWithOpen:ticketsWithOpen});   
      }
    });    



});

router.post('/admin/searchSupport',function(req,res) {
  //result will be putted in this array
  var result = [];
  //condition
  var sender = req.body.sender;
  var department = req.body.department;
  var status = req.body.status;
  var priority = req.body.priority;
  var title = req.body.title;
  var related = req.body.related;

  
  //if all the conditions are null
  if( (sender == "") && (department == "") && (status == "") && (priority == "") &&  (title == "") && (related == "") )  {
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          res.render('./admin/searchSupport',{ticketsWithOpen:tickets});
        }
      });    
  } 
  
  //if all the condition are not null
  else if( (sender != "") && (department != "") && (status != "") && (priority != "") &&  (title != "") && (related != "") ) {
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.sender.username === sender && ticket.department === department && ticket.status == status && ticket.priority == priority && ticket.title == title && ticket.related.kind == related) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      }); 
  }
  //sigle condition query
  else if((sender != "")) {
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.sender.username === sender) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });    
  } 
  //sigle condition query
  else if((department != "")) {
       //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.department === department) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });    
    
  }
  //sigle condition query
  else if( (status != "") ) {
       //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.status === status) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });        
  }
  
  else if((priority != "")) {
    
           //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.priority === priority) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });
    
  }
  
  
  else if((title != "")) {
    
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.title === title) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });
    
  }
  
  else if((related != "") ) {
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.related.kind === related) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });    
  }
    
  else if( (sender != "") && (department != "")) {
          //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.sender.username === sender && ticket.department === department) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      }); 
  }
  
  else if((sender != "") && (department != "") && (status != "")) {
    
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.sender.username === sender && ticket.department === department && ticket.status == status) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });     
    
  }
  
  else if( (sender != "") && (department != "") && (status != "") && (priority != "") ) {
    
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.sender.username === sender && ticket.department === department && ticket.status == status && ticket.priority == priority) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      }); 
  }
  
  else if(  (sender != "") && (department != "") && (status != "") && (priority != "") &&  (title != "")  ) {
    
      //find all the ticket conform these conditions
      Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          tickets.forEach(function(ticket) {
            if(ticket.sender.username === sender && ticket.department === department && ticket.status == status && ticket.priority == priority && ticket.title == title ) {
              result.push(ticket);
            }
          });
          res.render('./admin/searchSupport',{ticketsWithOpen:result});
        }
      });     
    
  }
  
  else {
    Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,tickets) {
        if(err) {
          console.log(err);
        } else {
          res.render('./admin/searchSupport',{ticketsWithOpen:tickets});
        }
      });  
  }
  
});

router.get('/admin/handleSupport/:id',function(req,res) {
      Ticket.findById(req.params.id).populate({path: "sender", model: "User"}).populate({path: "messages", model: "TicketContent", populate: {path: "sender", model: "User"}}).exec(function(err, ticket){
        if (err){
            console.log(err);
        } else {
            res.render("./admin/handleSupport", {ticket: ticket});
        }
    });
});



router.post("/admin/handleSupport/:id/reply", upload.default("ticket").any(), function(req, res){
  console.log("HI");
    var message = req.body.replymessage;
    Ticket.findById(req.params.id, function(err, ticket){
        if (err){
            console.log(err);
        } else {
          ticket.status = 'Answered';
          ticket.save(function(err, ticket){
            var data = {
                 sender: req.user,
                 sendDate: new Date(),
                 message: message,
                 attachments: req.files,
                 ticket: ticket
            }
            TicketContent.create(data, function(err, ticketContent){
                if (err){
                    console.log(err);
                } else {
                    ticket.messages.push(ticketContent);
                    ticket.save(function(err, ticket){
                        res.redirect("/admin/handleSupport/" + ticket._id);
                    });
                }
            });
          });
        }    
    });
});

router.delete('/admin/searchSupport',function(req,res) {
  Ticket.findOneAndRemove(req.body.ticketid,function(err,data) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/admin/searchSupport');
    }
  });
});

//============================================
// transaction route
//============================================

module.exports = router;
