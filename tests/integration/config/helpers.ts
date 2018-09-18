import * as mocha from 'mocha';
import * as chai from 'chai';
import * as td from 'testdouble';
const superterst = require('supertest');

import App from '../../../server/api/api';
const app = App;
const request = superterst;

const expect = chai.expect;
const testDouble = td;

export {app, expect,request,testDouble};
