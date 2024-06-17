import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const Evaluation = () => {
    
  return (
    <div>
      <div style={{ float: 'left', marginLeft:'40px', marginTop:'20px', border:'1px solid', padding:'60px', borderRadius:'10px'}}>
        <section className="flex items-center gap-5">
          <div className="bg-gray-300 h-24 w-24 rounded-full overflow-hidden"></div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              John Doe
            </h1>
            <h2>
              Applicant
            </h2>
          </div>
        </section>
        <div style={{ marginTop:'30px'}}>
          <h1 className="font-bold text-center">
            Applicantion Status
          </h1>
          <h2 style={{ fontSize:'10', color: '#505050', textAlign:'center', marginTop:'50px'}}>
            Initial Interview
          </h2>
          <div style={{ textAlign:'center', fontSize:'14px'}}>
            <select>
              <option value={0}>In progress</option>
              <option value={1} style={{ color:'green'}}>Passed</option>
              <option value={2} style={{ color:'red'}}>Failed</option>
            </select>
          </div>
          <h2 style={{ fontSize:'10', color: '#505050', textAlign:'center', marginTop:'60px'}}>
            Teaching Demo
          </h2>
          <div style={{ textAlign:'center', fontSize:'14px'}}>
            <select>
              <option value={0}>In progress</option>
              <option value={1} style={{ color:'green'}}>Passed</option>
              <option value={2} style={{ color:'red'}}>Failed</option>
            </select>
          </div>
          <h2 style={{ fontSize:'10', color: '#505050', textAlign:'center', marginTop:'60px'}}>
            Psychological Exam
          </h2>
          <div style={{ textAlign:'center', fontSize:'14px'}}>
            <select>
              <option value={0}>In progress</option>
              <option value={1} style={{ color:'green'}}>Passed</option>
              <option value={2} style={{ color:'red'}}>Failed</option>
            </select>
          </div>
          <h2 style={{ fontSize:'10', color: '#505050', textAlign:'center', marginTop:'60px'}}>
            Panel Interview
          </h2>
          <div style={{ textAlign:'center', fontSize:'14px'}}>
            <select>
              <option value={0}>In progress</option>
              <option value={1} style={{ color:'green'}}>Passed</option>
              <option value={2} style={{ color:'red'}}>Failed</option>
            </select>
          </div>
          <h2 style={{ fontSize:'10', color: '#505050', textAlign:'center', marginTop:'60px'}}>
            Recommendation for Hiring
          </h2>
          <div style={{ textAlign:'center', fontSize:'14px'}}>
            <select>
              <option value={0}>In progress</option>
              <option value={1} style={{ color:'green'}}>Passed</option>
              <option value={2} style={{ color:'red'}}>Failed</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ float: 'right', marginRight:'1  00px', marginTop:'60px'}}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <h2 style={{marginRight:'600px'}}>Department</h2>
            <h2>Applied as:</h2>
        </div>
        <Box sx={{ width: '81%', marginTop:'30px', border:'1px solid', padding:'2px', borderRadius:'10px'}}>
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Screening" style={{paddingLeft:'20px', paddingRight:'20px'}}/>
                <Tab value="two" label="Initial Interview" style={{paddingLeft:'20px', paddingRight:'20px'}}/>
                <Tab value="four" label="Teaching Demo" style={{paddingLeft:'20px', paddingRight:'20px'}}/>
                <Tab value="five" label="Psychological Exam" style={{paddingLeft:'20px', paddingRight:'20px'}}/>
                <Tab value="six" label="Panel Interview" style={{paddingLeft:'20px', paddingRight:'20px'}}/>
                <Tab value="seven" label="Recommendation for Hiring" style={{paddingLeft:'20px', paddingRight:'20px'}}/>
            </Tabs>
        </Box>
      </div>
    </div>
  );
};

export default Evaluation;
