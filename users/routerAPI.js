const express = require('express')
const router = express.Router()
const { get: database } = require('../database')
const { ObjectId } = require('mongodb')

router.get('/',(req,res)=>{
	database().collection('user').find({}).toArray( (err, data) => {
		if(err) {
			return console.log(err)
		}
		res.status(200).json(data);
	})
})

router.post('/',(req,res)=>{
	database().collection('user').insertOne( {email: req.body.email, password: req.body.password}, (err, data) => {
		if(err) {
			return console.log(err)
		}

		res.status(201).json({ message: "User has been created!"})
	})
})

// Need to validate :id as ObjectId
router.all('/:id', (req, res, next) => {
	try {
		req.params.id = new ObjectId(req.params.id)
		next()
	} catch {
		return res.status(400).json({ message: "Invalid ObjectId reference!"})
	}
})

router.get('/:id',(req,res)=>{
	let id = new ObjectId(req.params.id)

	database().collection('user').findOne({ _id: id}, (err, data) => {
		if (err) return console.log(err);

		if (data === undefined || null) {
			res.status(404).json({ message: "User does not exist!" });
		} else {
			res.status(200).json(data);
		}
	});
})

router.patch('/:id',(req,res)=>{
	let id = new ObjectId(req.params.id)

	database().collection('user').updateOne({ _id: id }, { $set: { email: req.body.email, password: req.body.password } }, (err, data) => {
		if (err) return console.log(err);

		if (data.matchedCount === 0) {
			res.status(404).json({ message: "User does not exist!" })
		} else {
			res.status(200).json({ message: `User ${id} has been modified!` });
		}
	});
})

router.delete('/:id',(req,res)=>{
	let id = new ObjectId(req.params.id)

	database().collection('user').deleteOne({_id: id}, (err, data) => {
		if (err) {
			return console.log(err)
		}

		if(data.deletedCount !== 0) {
			res.status(200).json({message: `User ${id} has been deleted!`} )
		} else {
			res.status(404).json({message: "User does not exist!"})
		}
	})
})

module.exports = router