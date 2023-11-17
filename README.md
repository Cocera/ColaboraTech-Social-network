#Backend Project ColaboraTech

# Project Requirements - REST API

The project requires the development of a REST API that meets specific functionalities and technical criteria. The API is expected to address the following needs:

## Key Functionalities:

1. **User Registration and Authentication:**
   - Implementation of user registration using Bcrypt for security.
   - Provision of a login system with token generation and middleware usage.

2. **CRUD Operations:**
   - Capability to Create, Read, Update, and Delete data (CRUD).

3. **Interaction with Posts:**
   - Ability to give/remove "likes" to posts.
   - Displaying posts along with their authors and associated comments.
   - Searching for posts by name or ID.
   - Validation of fields when creating a post and pagination (10 per page).

## Technical Requirements:

1. **Code Management and Repository:**
   - Use of branches in Git, maintaining a structure with two branches at the end: master or main and develop.
   - Presentation of a comprehensive README with detailed information.

2. **Specific Technologies:**
   - Utilization of MongoDB with Mongoose and Express for API development.

3. **Version Control and Project Evaluation:**
   - Public repository on GitHub, valuing the presence of branches and commits with high readability for project progress analysis.

## Specific Endpoints:

1. **Posts:**
   - Creation, update, and deletion of posts (authentication required).
   - Displaying posts with their authors and associated comments.
   - Searching by name or ID, field validation when creating a post, and pagination.

2. **Comments:**
   - Creation of comments on specific posts.
   - Implementation of middleware for authorship verification in comments.

3. **Users:**
   - Secure user registration with field validation.
   - Login using Bcrypt and JWT.
   - Retrieval of information for the connected user and logout option.

## Extras (Optional):

- Implementation of middleware to verify authorship in comments and posts.
- Addition of images to posts, comments, or user profiles.
- Development of a follower system with the option to follow/unfollow.
- Email confirmation for registration.
- Additional validations in login.
- Generation of endpoint documentation.
- CRUD operations for comments and "likes".

In summary, a comprehensive API is required that fulfills multiple functionalities, ensures security, adopts specific technologies, and allows the inclusion of additional features to enhance the user experience.


 <h3 align="center">ColaboraTech</h3>

<!-- PROJECT WORKFLOW GIF -->

  <p align="center">
    <br />
    <a href="https://github.com/Cocera/ColaboraTech-Social-network"><strong>Explore the documents »</strong></a>
    <br />
    <a href="https://github.com/Cocera/ColaboraTech-Social-network/issues">Report a Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
        <li><a href="#preview">Preview</a></li>
        <li><a href="#objectives">Objectives</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#overview">Overview</a></li>
         <li><a href="#built-with">Built With</a></li>
      </ul>   
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- PREVIEW -->

## Project workflow


<img style="display: block; 
           margin-left: auto;
           margin-right: auto;" 
      src='#'
      alt="alt"/>

<!-- ABOUT THE OBJECTIVES -->

## Objectives

### Create a e-commerce API fulfilling the following requirements:

 <ul>
    <li>User registration using <a href="https://www.npmjs.com/package/bcrypt">Bcrypt.</a></li>
    <li>User login + token + middleware.</a></li>
    <li>Admin role verification and permissions middleware.</a></li>
    <li>CRUD endpoints.</a></li>
    <li>Implement validations in user and product creation to eliminate possibility of null data fields</a></li>
    <li></a></li>
    <li>Ability to like/unlike posts.</a></li>
  </ul>

<!-- ABOUT THE PROJECT -->

## About The Project

 ColaboraTech is a social network exclusively for the tech sector that empowers junior talent, connecting young people with experts in technology areas such as UX-UI, Development, Data Science and Cybersecurity. It focuses on collaboration between emerging and established professionals, fostering the creation of projects through dynamic teams and open participation. It recognizes the value of each member by allowing feedback and support for projects under development, cultivating an enriching environment for all.


<p align="right">(<a href="##Backend-Project-ColaboraTech">back to top</a>)</p>


### Built With

* [![Node][Node.JS]][Node.JS-url]
* [![Express][Express.js]][Express.js-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Sequelize][Sequelize]][Sequelize-url]
* [![Mongoose][Mongoose]][Mongoose-url]
* [![JWT][JWT]][JWT-url]
* [![Postman][Postman]][Postman-url]

<p align="right">(<a href="##Backend-Project-ColaboraTech">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install express mongoose sequelize bcryptjs jsonwebtoken dotenv swagger-ui-express
  ```

### Installation

Below is an example of how you can instruct your audience on installing and setting up your app.

1. Clone the repo
   ```sh
   git clone https://github.com/Cocera/ColaboraTech-Social-network
   ```
2. Install NPM packages
   ```sh
   npm install express mongoose sequelize bcryptjs jsonwebtoken dotenv swagger-ui-express
   ```
3. Ready to start!
    ```sh
    npm start
    ```

<p align="right">(<a href="##Backend-Project-ColaboraTech">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourName`)
3. Commit your Changes (`git commit -m 'Add some YourName'`)
4. Push to the Branch (`git push origin feature/YourName`)
5. Open a Pull Request

<p align="right">(<a href="##Backend-Project-ColaboraTech">back to top</a>)</p>


<!-- CONTACT -->
---

## Licence & developed by:

  <p align="center">

- Frances Morales Velilla
<a href = "mailto:frances0688@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/frances-morales/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://github.com/frances0688" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>

- Álvaro Cócera Adail
<a href = "mailto:alcocera@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/alvaro-cocera-adail/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://github.com/Cocera" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>

- Francesc Alberola Piqueres
<a href = "mailto:f.alberola@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/francescalberola/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://github.com/cescalberola" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
</p>

<p align="right">(<a href="##Backend-Project-ColaboraTech">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/frances-morales
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Glossary/HTML5
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JS]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JS-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Bootstrap]: https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/es
[Swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[GitHub]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[Mongoose]: https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white
[Swagger-url]: https://swagger.io/
[Mongoose-url]: https://mongoosejs.com/
[Express.js-url]: https://expressjs.com/
[Node.JS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node.JS-url]: https://nodejs.org/en/
[SASS]: https://img.shields.io/badge/SASS-pink?style=for-the-badge&logo=SASS&logoColor=white
[SASS-url]: https://sass-lang.com/
[React]: https://img.shields.io/badge/React-219ebc?style=for-the-badge&logo=React&typoColor=fedcba&logoColor=white
[React-url]: https://es.reactjs.org/
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://www.postman.com/