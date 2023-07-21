import React from "react";
import "./Home.css";
import logo from "/full-logo.png";
import MediaBlock from "../../MediaBlock/MediaBlock";
import yt from "/yt.jpg";
import ytLogo from "/yt.png";
import Twitter from "/twitter.jpg";
import twLogo from "/t-logo.webp";
import Reddit from "/reddit.jpg";
import rdLogo from "/rd-logo.png";

function Home() {
  return (
    <main id="home">
      <div>
        <img src={logo} alt="SeagroveTCG" />
      </div>
      <MediaBlock
        side="left"
        title="Subscribe to my YouTube"
        url="https://www.youtube.com/channel/UCY5WRq8pWre4FkJrVrVvWCQ"
        img={yt}
        alt="seagroveTCG YouTube Channel"
      >
        <p>
          SeagroveTCG YouTube channel is full of evergreen videos on coaching,
          mindset, and improvement.
        </p>
        <p>
          I also stream on YouTube, and always respond to messages while
          streaming. I hope to see you there!
        </p>
        <div>
          <img className="logo" src={ytLogo} alt="YouTube logo" />
        </div>
      </MediaBlock>
      <MediaBlock
        side="right"
        title="Follow me on Twitter!"
        url="https://twitter.com/SeagroveTCG"
        img={Twitter}
        alt="Twitter"
      >
        <p>
          I made a new Twitter since getting back into competitive playing.
          Follow me to keep up with the latest updates on the site and my
          journey to the World Championship!
        </p>
        <div>
          <img className="logo" src={twLogo} alt="Twitter logo" />
        </div>
      </MediaBlock>
      <MediaBlock
        side="left"
        title="Check out my 'Git Gud' series on Reddit."
        url="https://www.reddit.com/r/pkmntcg/comments/5kb7q1/git_gud_1_intro_and_prize_control/"
        img={Reddit}
        alt="Reddit"
      >
        <p>
          I released a series of articles/videos to help players improve. This
          was written early on in my career, so I am sure it is far from
          perfect.
        </p>
        <p>
          Soon, I hope to have articles on this site, and I will definitely be
          revisiting this series. Thanks for your support!
        </p>
        <div>
          <img className="logo" src={rdLogo} alt="Reddit logo" />
        </div>
      </MediaBlock>
    </main>
  );
}

export default Home;
