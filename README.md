# FaceRecognitionApp
<a href="https://smart-brain-gaetan.herokuapp.com">App available here</a> (loading time is long due to my free plan on heroku...)
<br>
<p>A simple face recognition app, final project from <a href='https://www.udemy.com/the-complete-web-developer-zero-to-mastery/'>Andrei Neagoie's Udemy web developement course</a></p>
<br/>
<br/>
<p align='center'>
  <img src='https://raw.githubusercontent.com/enkienki/FaceRecognitionApp/master/faceRecoSignin.png' alt='' width='300px' />
  <img src='https://raw.githubusercontent.com/enkienki/FaceRecognitionApp/master/faceRecoHome.png' alt='' width='300px' />
</p>
<br/>
<br/>
<h2>SCENARIO</h2>
The user is first directed on the SIGNIN component and has a link to the REGISTER component in case he's not registered yet.<br/>
The HOMEPAGE display a LOGO, a welcome sentence which also show the amount of time the user has send a picture to the app.<br/>
Below that here's the SEARCH component where the user can paste a link to a picture that is then displayed under the SEARCH component. 
If any faces are triggered by the <a href='https://www.clarifai.com/'>CLARIFAI API</a> which the app is using to detect them, 
it return coordinates that are used to display a square blue box around faces.
