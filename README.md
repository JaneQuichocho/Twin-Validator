# team3-challenge9

## team members
- ellani johnson
 - Stephanie Lim
 - Jane Quichocho
#### A short description of our project. 
What will our app do? 
- Our app will use the Microsoft Azure Face API (https://azure.microsoft.com/en-us/services/cognitive-services/face/) to compare you and your another person's photos to determine the likelihood of you getting into a bar as a minor, using the other person's ID (assuming s/he is over 21).
- Because Microsoft Azure's API already predicts the photo's age, our team will factor this in to determine the probability that the person will get into the bar. We will use an algorithm to take into account the age a person looks in their photo when determining the probability of them getting into the bar. If they look 21 or over, the probability of them getting into the bar increases based off of how much older than 21 they look. If they look younger than 21, the probability decreases based off of how much younger than 21 they look. 

Equation: (age - 21) * 0.05 + faceSimilarityProbability = totalProbability
0 <= totalProbability <= 100

Example: Say your age that the Microsoft Azure API detected was 18 and the faceSimilarityProbability is 70%.
(18 - 21) * 0.05 + 0.7 = 55% probability the user will get into the bar.

Who would use our app?
- Somewhat risk averse underage alcoholics who want to calculate the probability of them getting into a bar.

What are its main features?
- Calculates the similarity correlation between two faces
- If the similarity correlation is above 70%, we will deem this as acceptable enough to get into a bar; otherwise, the user should not consider using the other person's ID to get in their desired bar.

##### The list of libraries, frameworks, APIs we will use:

Microsoft Azure API, Bootstrap, React
