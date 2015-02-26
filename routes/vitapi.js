/*
 *  VITauth
 *  Copyright (C) 2015  Kishore Narendran <kishore.narendran09@gmail.com>
 *  Copyright (C) 2015  Aneesh Neelam <neelam.aneesh@gmail.com>
 *  Copyright (C) 2015  Aarthy Kolachalam Chandrasekhar <kcaarthy@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var async = require('async');
var router = express.Router();

/* GET home page. */
var home = function (req, res) {
    console.log("VIT-API Home");
    res.json();
};

var addExam = function(req, res) {
  var semester = req.body.semester;
  var exam = req.body.exam;
  var slot = req.body.slot;
  var venue = req.body.venue;
  var time = req.body.time;
  var classes = req.body.classes;
  var onInsert = function(err, records) {
    if(err) {
      res.json({"status": "failure"});
    }
    else{
      res.json({"status": "success"});
    }
  };
  req.db.collection("exams").insert({"semester": semester, "exam": exam, "slot": slot, "venue": venue, "time": time, "classes": classes}, onInsert);
};

var bulkAddExam = function(req, res) {
  var exams = req.body.exams;
  var onComplete = function(err, result) {
    if(err) {
      res.json({"status": "failure"});
    }
    else if(result.length == exams.length){
      res.json({"status": "success"});
    }
    else {
      res.json({"status": "failure"});
    }
  };
  var onExamAdd = function(exam, callback) {
    req.db.collection('exams').insert(exam,callback);
  };
  async.map(exams, onExamAdd, onComplete);
};

var addClass = function(req, res) {
  var cnum = req.body.cnum;
  var type = req.body.type;
  var title = req.body.title;
  var mode = req.body.mode;
  var option = req.body.option;
  var venue = req.body.venue;
  var credits = req.body.credits;
  var code = req.body.code;
  var slot = req.body.slot;
  var students = req.body.students;
  var onInsert = function(err, records) {
    if(err) {
      res.json({"status": "failure"});
    }
    else {
      res.json({"status": "success"});
    }
  };
  req.db.collection("classes").insert({"cnum": cnum, "type": type, "title": title, "students": students, "venue": venue, "mode": mode, "option": option, "credits": credits, "code": code, "slot": slot}, onInsert);
};

var bulkAddClass = function(req, res) {
  var classes = req.body.classes;
  var onComplete = function(err, result) {
    if(err) {
      res.json({"status": "failure"});
    }
    else if(result.length == classes.length){
      res.json({"status": "success"});
    }
    else {
      res.json({"status": "failure"});
    }
  };
  var onClassAdd = function(class1, callback) {
    req.db.collection("classes").insert(class1, callback);
  };
  async.map(classes, onClassAdd, onComplete);
};

var addStudent = function(req, res) {
  var regno = req.body.regno;
  var name = req.body.name;
  var onInsert = function(err, records) {
    if(err) {
      res.json({"status": "failure"});
    }
    else {
      res.json({"status": "success"});
    }
  };
  req.db.collection('students').insert({"name": name, "regno": regno}, onInsert);
};

var bulkAddStudent = function(req, res) {
  var students = req.body.students;
  var onComplete = function(err, result) {
    if(err) {
      res.json({"status": "failure"});
    }
    else if(result.length == students.length){
      res.json({"status": "success"});
    }
    else {
      res.json({"status": "failure"});
    }
  };
  var onStudentAdd = function(student, callback) {
    req.db.collection("students").insert(student, callback);
  };
  async.map(students, onStudentAdd, onComplete);
};

router.get('/', home);
router.post('/addexam', addExam);
router.post('/bulkaddexam', bulkAddExam);
router.post('/addclass', addClass);
router.post('/bulkaddclass', bulkAddClass);
router.post('/addstudent', addStudent);
router.post('/bulkaddstudent', bulkAddStudent);
module.exports = router;
