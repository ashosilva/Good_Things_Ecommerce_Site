import React from 'react'
import { SocialIcon } from "react-social-icons"
import '../About.css'
import aba from '../components/AboutImges/aba.jpg'
import jac from '../components/AboutImges/jac.jpg'
import jen from '../components/AboutImges/jen.jpg'


const About = () => {
    return (
      <div>
        <div class="about-section">
          <h1>About Us Page</h1>
          <p>Some text about who we are and what we do.</p>
        </div>
      
        <div class="row p-2">  
          <div class="column">
            <div class="card">

              <div className="flex justify-center p-2" >
                <img src={jen} alt="Aba" style={{ height: 200, width:200}} className = "rounded-full" ></img>
              </div>
              
              <div class="container">
                <h2>Jenny Plishchina</h2>
                <p class="title">Facilitator</p>
                <p>Bio goes here.</p>
                <p className="text-yellow-700">Contacts:</p>
                <div>
                  <SocialIcon
                      url="https://www.linkedin.com/in/jenny-plishchina/"
                      className="ml-1 mr-1 hover:opacity-80"
                      target="_blank"
                      fgColor="#fff"
                      style={{ height: 50, width: 50 }}
                  />
                  <SocialIcon
                      url="https://github.com/jplishchina"
                      className="ml-1 mr-1 hover:opacity-80 "
                      target="_blank"
                      fgColor="#fff"
                      style={{ height: 50, width: 50 }}
                  />
                </div>
              </div>

            </div>
          </div>
              
          <div class="column">
            <div class="card">

              <div className="flex justify-center p-2" >
                <img src={jac} alt="Aba" style={{ height: 200, width:200}} className = "rounded-full" ></img>
              </div>

              <div class="container">
                <h2>Jacob Chen</h2>
                <p class="title">Interviewer</p>
                <p>Bio goes here.</p>
                <p className="text-yellow-700">Contacts:</p>
                <div>
                <SocialIcon
                    url="https://www.linkedin.com/in/jacobpchen/"
                    className="ml-1 mr-1 hover:opacity-80"
                    target="_blank"
                    fgColor="#fff"
                    style={{ height: 50, width: 50 }}
                />
                <SocialIcon
                    url="https://github.com/jacobpchen"
                    className="ml-1 mr-1 hover:opacity-80 "
                    target="_blank"
                    fgColor="#fff"
                    style={{ height: 50, width: 50 }}
                />
                </div>
              </div>

            </div>
          </div>
              
          <div class="column">
            <div class="card">

              <div className="flex justify-center p-2" >
                <img src={aba} alt="Aba" style={{ height: 200, width:200}} className = "rounded-full" ></img>
              </div>
              <div class="container">
                <h2>Abayomi Shosilva</h2>
                <p class="title">Business Expert</p>
                <p>Some text that describes me.</p>
                <p className="text-yellow-700">Contacts:</p>
                <div>
                <SocialIcon
                    url="https://www.linkedin.com/in/abayomi-shosilva/"
                    className="ml-1 mr-1 hover:opacity-80"
                    target="_blank"
                    fgColor="#fff"
                    style={{ height: 50, width: 50 }}
                />
                <SocialIcon
                    url="https://github.com/ashosilva"
                    className="ml-1 mr-1 hover:opacity-80 "
                    target="_blank"
                    fgColor="#fff"
                    style={{ height: 50, width: 50 }}
                />
                </div>
              </div>

            </div>
          </div>   
        </div>

      </div>
    )
}

export default About
