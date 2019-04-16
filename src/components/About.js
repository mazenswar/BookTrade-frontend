import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const About = () => {
  return (
    <React.Fragment>
    <section className="main-about">
    <h1>About the Project</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt enim vitae odio lacinia, ac faucibus ante viverra. Phasellus molestie felis gravida, pharetra arcu nec, congue tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent diam magna, tempor efficitur sem et, imperdiet malesuada mi. Aenean a ante in libero finibus tempus. Phasellus id tristique sapien. Curabitur imperdiet ante mi, sit amet dapibus dui vestibulum non. Donec pulvinar lacus lectus, in malesuada tortor dignissim nec. Donec dapibus urna quis neque posuere sodales. Sed placerat turpis et luctus pellentesque. Vestibulum laoreet feugiat porttitor. Nam vitae mi maximus, laoreet dui at, venenatis mi. Vestibulum rutrum faucibus tortor nec gravida. Fusce ante leo, bibendum quis luctus quis, fermentum ut dui. Vestibulum erat dui, porta sed augue sed, commodo volutpat nunc.
    </p>
    <p>Nam vitae urna orci. Praesent egestas dolor elit, in sagittis justo ultrices vulputate. Pellentesque porta, purus vel pulvinar vestibulum, nulla lacus laoreet nibh, a finibus nisi purus viverra odio. Curabitur sed velit sit amet mauris tincidunt varius nec sit amet tortor. Suspendisse in ornare elit. Curabitur eget odio dolor. Nullam varius odio nec enim sollicitudin eleifend. Praesent ac magna nec sapien ornare condimentum nec in ipsum. Nullam vel velit odio. Curabitur ut tellus mi. Proin id mollis massa. Donec vel metus arcu. Nullam consectetur pulvinar imperdiet.
    </p>
    <p>
    Aliquam tortor augue, convallis ac quam at, mollis convallis velit. Nulla non arcu aliquam, bibendum lacus vel, mollis tellus. Suspendisse vitae diam non ipsum tempus lacinia in vitae mauris. Aenean vel sagittis magna, vitae varius metus. Praesent ex quam, eleifend et ipsum quis, lacinia imperdiet mauris. Cras dapibus consequat venenatis. Integer turpis nunc, pellentesque non auctor vel, auctor quis dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
    </p>
    </section>

    <section className="main-links-container">

      <div className="main-links"><Link to='/books'>Books</Link></div>
      <div className="left main-links"><Link to='/donate'>Donate a Book</Link></div>


    </section>
    </React.Fragment>
  )
}

export default About
