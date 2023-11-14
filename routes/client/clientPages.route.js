const express = require('express');

const router = express.Router();

router.get('',(req,res)=>{
    res.render('index')
})

router.get('/teacher/login',(req,res)=>{
    res.render('teacherLogin');
})

router.get('/student/login',(req,res)=>{
    res.render('studentLogin');
})

router.get('/teacher/signup',(req,res)=>{
    res.render('signup');
})

router.get('/student/signup',(req,res)=>{
    res.render('studentSignup');
})

module.exports = router;