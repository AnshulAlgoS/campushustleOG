import React from "react";
import "./Guidelines.css";

const Guidelines = () => {
  return (
    <div className="guidelines-container">
      <div className="guidelines-left">
        <h2>Participation Guidelines</h2>
        <ul>
          <li> You must be logged in to register for any hackathon.</li>
          <li> Team size may vary per hackathon. Check the specific rules.</li>
          <li> Deadlines for registration and submission are final.</li>
          <li> Each submission should follow the stated format.</li>
          <li> Use of AI tools is permitted unless explicitly restricted.</li>
          <li> Judges' decisions will be final and binding.</li>
        </ul>

        <h2>Code of Conduct</h2>
        <ul>
          <li> Be respectful and inclusive of all participants.</li>
          <li> Plagiarism or cheating will result in disqualification.</li>
          <li> Collaborate, don’t sabotage or disrupt others.</li>
        </ul>
      </div>

      <div className="guidelines-right">
        <h2>Eligibility Criteria</h2>
        <ul>
          <li> Must be a current college or university student.</li>
          <li> Open to Indian residents unless stated otherwise.</li>
          <li> Use a valid email address for communication.</li>
          <li> Minimum age: 17 years.</li>
        </ul>

        <h2>Need Help?</h2>
        <p> Contact us at: <strong>support@campushustle.in</strong></p>
      </div>
    </div>
  );
};

export default Guidelines;
