import './App.css';
import { useState } from "react";
import uitoolkit from "@zoom/videosdk-ui-toolkit";
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'

function App() {

  let sessionContainer
  let authEndpoint = 'https://zoom-video-sdk-f4fj.vercel.app/'
  let config = {
      videoSDKJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiZGhienpUMjhWRUJWaGJLNWJnV2tQMFNkaEhtUmJOWmxFWjFmIiwicm9sZV90eXBlIjoxLCJ0cGMiOiJWaWRlbyBTREsiLCJ2ZXJzaW9uIjoxLCJpYXQiOjE3MjI1MTgxNzgsImV4cCI6MTcyMjUyNTM3OCwidXNlcl9pZGVudGl0eSI6Im11aGFtbWFkbm9tYW5zaG91a2F0MTIzIiwic2Vzc2lvbl9rZXkiOiJ2aWRlb3NkazEyMyJ9.BA7GCNjgi3Ly9rMceuntivpmn65Kkb5aPJdkx7i-a00',
      sessionName: 'test',
      userName: 'React',
      sessionPasscode: '123',
      features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
  };
  let role = 1

  function getVideoSDKJWT() {
    sessionContainer = document.getElementById('sessionContainer')

    document.getElementById('join-flow').style.display = 'none'

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionName:  config.sessionName,
        role: role,
      })
    }).then((response) => {
        return response.json()
    }).then((data) => {
      // console.log(data)
      if(data.signature) {
        console.log(data.signature)
        config.videoSDKJWT = data.signature
        joinSession()
      } else {
        console.log(data)
      }
    }).catch((error) => {
        console.log(error)
    })
  }

  function joinSession() {
    console.log(config)
    console.log(sessionContainer)
    uitoolkit.joinSession(sessionContainer, config)

    uitoolkit.onSessionClosed(sessionClosed)
  }

  var sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)

    document.getElementById('join-flow').style.display = 'block'
  })

  return (
    <div className="App">
      <main>
        <div id="join-flow">
          <h1>Zoom Video SDK Sample React</h1>
          <p>User interface offered by the Video SDK UI Toolkit</p>

          <button onClick={getVideoSDKJWT}>Join Session</button>
        </div>

        <div id='sessionContainer'></div>
      </main>
    </div>
  );
}

export default App;
