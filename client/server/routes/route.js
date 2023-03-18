const router = require('express').Router()
const details = require('../model/details')
let detail=require('../model/details')




  router.get('/', (req, res) => {
        details.find()
        .then(details => res.json(details))
        .catch(err=> res.status(400).json('Error: '+err))
      
    })
  
    router.get('/details/:id', (req, res) => {
      const detail= details.find(detail=>detail._id === req.params.id)
      res.json(detail)
    })


    // Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await detail.findByIdAndDelete(userId);
    res.status(200).json({ message: `User with id ${deletedUser._id} has been deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

    router.post('/', (req, res) => {
        const validationCode = Math.random().toString(36).substring(2, 8);
        const newdetail=new detail({
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            validationCode
        })
          newdetail.save()
          .then(details => res.json("New Record Inserted"))
          .catch(err => res.status(400).json('Error: '+err))
      })

    // Route to validate a user's email address
router.post('/validate-email', (req, res) => {
    const validationCode = req.body.validationCode;
  
    // Query the database for the user with the matching validation code
    User.findOne({ validationCode })
      .then((user) => {
        if (!user) {
          res.status(404).send('User not found');
        } else {
          // Update the user's record to mark their email as validated
          user.emailValidated = true;
          user.save()
            .then(() => {
              res.send('Email validated');
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  });
    
    module.exports=router