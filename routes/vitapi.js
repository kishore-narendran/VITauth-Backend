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
  req.db.collection('exams').insert({"semester": semester, "exam": exam, "slot": slot, "venue": venue, "time": time, "classes": classes}, onInsert);
};

var addClass = function(req, res) {
  var cnum = req.body.cnum;
  var type = req.body.type;
  var title = req.body.title;
  var students = req.body.students;
  var onInsert = function(err, records) {
    if(err) {
      res.json({"status": "failure"});
    }
    else {
      res.json({"status": "success"});
    }
  };
  req.db.collection('classes').insert({"cnum": cnum, "type": type, "title": title, "students": students}, onInsert);
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

router.get('/', home);
router.post('/addexam', addExam);
router.post('/addclass', addClass);
router.post('/addstudent', addStudent);
module.exports = router;
