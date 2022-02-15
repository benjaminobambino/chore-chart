import React from "react";

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <p><span className="chore-chart">Chore Chart</span> is a 
        household-sharing productivity app that I created while attending 
        General Assembly&rsquo;s full-time software engineering immersive 
        boot camp. The original idea came from my wife, who at the time was 
        pregnant with our first child and undergoing cancer treatments. In 
        such a unique situation, helpful and well-meaning people would often 
        ask, &ldquo;What can we do to help?&rdquo; The problem is, we really 
        never know how to answer that. However, with <span className="chore-chart">Chore Chart</span>
        , we can invite them to join our household and claim whatever chores 
        they would like.
      </p>
      <p>Of course, no one needs to be in a dire situation to use <span className="chore-chart">Chore Chart</span>
        . Any family or group of roommates can use <span className="chore-chart">Chore Chart</span> and 
        streamline their household&rsquo;s chore delegation, communication, and execution.
      </p>
      <h3>App Developer:</h3>
      <p><a href="https://www.linkedin.com/in/benjaminlpeck/" target="_blank" rel="noopener noreferrer">Benjamin Peck</a></p>
      <h3>Technologies:</h3>
      <ul>
        <li>React</li>
        <li>Django</li>
        <li>Python</li>
        <li>PostgreSQL</li>
        <li>JWT Auth</li>
        <li>Axios</li>
        <li>JavaScript</li>
        <li>CSS Flex and Grid</li>
      </ul>
      <h3>Resources:</h3>
      <ul>
        <li><a href="https://docs.djangoproject.com/en/4.0/topics/auth/customizing/" target="_blank" rel="noopener noreferrer">Django Documentation</a></li>
        <li><a href="https://django-rest-framework-simplejwt.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">Simple JWT Documentation</a></li>
        <li><a href="https://github.com/veryacademy/YT-Django-DRF-Simple-Blog-Series-JWT-Part-3" target="_blank" rel="noopener noreferrer">Very Academy</a></li>
        <li><a href="https://iconarchive.com/" target="blank" rel="noopener noreferrer">IconArchive (Checklist Icon)</a></li>
        <li><a href="https://awmaint.com/" target="blank" rel="noopener noreferrer">A&amp;W Maintenance Inc. (Background Image)</a></li>
      </ul>
    </div>
  )
}

export default About