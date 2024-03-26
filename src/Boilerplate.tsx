import React from "react";
import "./Boilerplate.css";

/**
 * feel free to remove this.
 */
export const Boilerplate = (): JSX.Element => {
  return (
    <div className="Boilerplate">
      <header className="App-header">
        <h1>Full Stack Web Engineer | Case Study</h1>
      </header>
      <article>
        <p>Hi there 👋</p>
        <p>
          Thanks for taking the time to interview with us so far, we're glad
          you're interested in joining the team!
        </p>
        <p>
          We believe case studies like this are a better way to demonstrate your
          skills - and frankly a better use of your time - than countless
          interview rounds. However, the goal here is not just for us to get a
          better idea of your work, but also for you to understand more about
          how we work and what we value. That's why we've tried to make this
          similar to what a real task at Perdoo would look like.
        </p>
        <aside>
          💡 <strong>Please note:</strong> This case study is purely to give you
          a better understanding of the Web Engineer role at Perdoo and to help
          us better assess your suitability for said position. We don’t intend
          to use your work for commercial purposes in any way.
        </aside>
        <img
          alt="Rick and Morty image"
          src="rickAndMorty.png"
          width={480}
          height={360}
        />
        <h2>The task</h2>
        <p>
          Your task is to build an API explorer for the Rick & Morty API! It
          should be a simple web app that <strong>lists all entries</strong> for
          the 3 models (Characters, Episodes, Location), and{" "}
          <strong>has detail views</strong> for each of them showing all their
          attributes and relationships.
        </p>
        <p>
          You don’t need to support the creation, editing or deleting of
          objects, but design your code in a way that will make this easy to add
          in the future. The mockup below is just rough guidance for one of the
          view, you can design the UI however you want as long as it’s usable
          (I’d recommend just using your favourite UI library - don't spend too
          much time here). The app should:
        </p>
        <ul>
          <li>Show loading indicators for requests</li>
          <li>Support pagination</li>
          <li>Contain tests for key components and functionality</li>
        </ul>
        <h2>API</h2>
        <p>
          The API uses GraphQL and is hosted{" "}
          <a href="https://rickandmortyapi.com/graphql">here</a>. You'll find a
          playground and documentation there.
        </p>
        <h2>Frontend</h2>
        <p>
          Please use React and a Graphql client of your choice (we use Apollo)
          to build your client (this is what we use at Perdoo). The use of
          Typescript is optional. Everything else is up to you!
        </p>
        <label>Sample list view:</label>
        <img alt="Sample list view" src="sampleTable.png" width={480} />
        <h2>Timeframe</h2>
        <p>
          We want to respect your time, so please aim to spend no more than 3-4
          hours on this. We really mean that and will of course take the time
          limit into consideration when reviewing your work!
        </p>
        <h2>Submission</h2>
        <p>
          Please send your solution over to Larissa within 5 days of receiving
          the task if you can, or else send us a quick email to let us know
          roughly when to expect a response. Submit your solution either as a
          Github repository or as a compressed e-mail attachment.
        </p>
        <p>We’re excited to see what you come up with! :)</p>
      </article>
    </div>
  );
};
