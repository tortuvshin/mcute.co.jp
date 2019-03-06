const User = require('../models/user')

const Ticket = require('../models/ticket')
const TicketContent = require('../models/ticketContent')
const BankDeposit = require('../models/bankDeposit')

module.exports = {
    readUser(req,res) {
        User.find({},function(err,users) {
            if(err) {
            console.log(err);
            } else {
            res.render('./admin/readUser',{users:users});
            }
        });
    },

    deleteUser(req,res) {
        const userid = req.body.user_id;
        User.findOneAndRemove({_id:userid},function(err,user) {
            console.log(user + "has been removed");
            res.redirect("/admin/readUser");
        });
    },

    createUser(req,res) {
        User.create(req.body.user,function(err,newUser){
        if(err) {
            res.redirect("/admin");
        } else {
            req.flash("success", "The resgistration successful!");
            res.redirect("/admin/createUser");
        }
        });
    },

    updateUser(req,res) {
        const user = req.body.user;
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
    },

    goUpdateUser(req,res) {
        //find the user with providing id
        User.findById(req.params.id,function(err,foundUser) {
            if(err) {
            console.log(foundUser);
            } else {
            res.render("./admin/updateUser",{foundUser:foundUser});
            }
        });
    },

    readPayment(req,res) {
        bankDeposit.find({},function(err,foundBankDeposits) {
            if(err) {
                console.log(err);
            } else {
                
                res.render('./admin/readPayment',{foundBankDeposits:foundBankDeposits});
                
            }
        });
    
        //find all bank deposit records
        BankDeposit.find({}).populate({path:'user',model:'User'}).exec(function(err,banks) {
            if(err) {
            console.log(err);
            } else {
            res.render('./admin/readPayment',{foundBankDeposits:banks});
            }
        });
    
    },


    deletePayment(req,res) {
        BankDeposit.findOneAndRemove(req.body.deposit_id,function(err,data) {
            if(err) {
            console.log(err);
            } else {
                req.flash("success", "delete successful!");
                res.redirect('/admin/readPayment');      
            }
        })
    },

    goEditPayment(req,res) {
        BankDeposit.findById(req.params.id).populate({path:'user',model:'User'}).exec(function(err,bank) {
            res.render('./admin/editDeposit',{bank:bank});
        });
    },

    editPayment(req,res) {
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
    },

    //=================================
    // supporting 
    // ================================

    searchSupportGet(req,res){
    
        Ticket.find({}).populate({path:'sender',model:'User',populate:{path:'projects',model:'Project'}}).populate({path:'sender',model:'User',populate:{path:'transaction',model:'Transaction'}}).exec(function(err,ticketsWithOpen) {
        if(err) {
            console.log(err);
        } else {
            res.render('./admin/searchSupport',{ticketsWithOpen:ticketsWithOpen});   
        }
        });    
    },

    searchSupportPost(req,res) {
        //result will be putted in this array
        let result = [];
        //condition
        const sender = req.body.sender;
        const department = req.body.department;
        const status = req.body.status;
        const priority = req.body.priority;
        const title = req.body.title;
        const related = req.body.related;

        
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
    
    },

    handleSupportGet(req,res) {
        Ticket.findById(req.params.id).populate({path: "sender", model: "User"}).populate({path: "messages", model: "TicketContent", populate: {path: "sender", model: "User"}}).exec(function(err, ticket){
            if (err){
                console.log(err);
            } else {
                res.render("./admin/handleSupport", {ticket: ticket});
            }
        });
    },

    handleSupportPost(req, res){
    
        const message = req.body.replymessage;
        Ticket.findById(req.params.id, function(err, ticket){
            if (err){
                console.log(err);
            } else {
            ticket.status = 'Answered';
            ticket.save(function(err, ticket){
                const data = {
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
    },

    deleteSupport(req,res) {
        Ticket.findOneAndRemove(req.body.ticketid,function(err,data) {
            if(err) {
            console.log(err);
            } else {
            res.redirect('/admin/searchSupport');
            }
        });
    }
}