# Problem
Loneliness, unclear ideas about own future, the crisis of life, stress at work or school - all these can be reasons for either real clinical issues (such as depression) or simply reasons for melancholic thoughts from time to time.

The human brain easily forgets hard or good times, even when it would be good to have a holistic understanding of well-being.  Many people seek means to remember and self-reflect.

Our backstory - the personas - concerns two young adults. Anne 23yrs and Otto 25yrs. Both of them are single, and neither have clinical-level mental issues but both are hooked to the Sentimentor. For Otto, the speech-to-text got initially the attention. And he finds it useful too. For Anne, having a diary was already a familiar concept. She likes the idea that the system gives her feedback.

# Solution
Journaling and diaries are popular for a reason.

In fact, writing down past events is a proven way of combating depression and anxiety.

With The Sentimentor you maintain a journal by dictating the past day to your phone. The system will then turn the speech into text and run this through a machine-learning model. This sentiment analysis turns the diary entry into a summarized mood score.

This speech-interpreting diary will support some use cases where people find it difficult to express their thoughts in writing. The ML given mood score can turn out captivating.
# Impact
The Sentimentor makes it easy for a person to dictate their diary entry straight into their phone. It will automatically produce a summarized mood score based on sentiment analysis.

The visualization of the history of the mood score history allows to identify "rough patches" and good periods. One can intervene with the former and learn about the latter.

For Hogrefe - as a industial company that grounds everything scientifically - “The Sentimentor” would not of course be a real product - It’s a fun hack :)

This type of product however could take the world forward. This app introduces a variety of intriguing technological directions that can be taken into industrial and scientific contexts.
# Technologies
- Real time server-side speech to text
- Sentiment analysis using trained machine learning model
- Serverless technology (AWS Lambdas) to deploy the speech-to-text engine
- Localforage, a "syntactic sugar" -library in the frontend to use the IndexedDB (app's personal data is securely stored to the mobile browser and not passed to the servers)
- For illustrations and UI GFX: https://openai.com/dall-e-2/
# Data privacy
- No data is kept on the backend services
- User diary entries are stored on personal device only
- ssl on all channels
# Future plans
- A therapist dashboard where they can see the graphs of patients and get in touch with the patient in case the mood graph looks alarming
- A peer group support indicator to understand how peers are
- Sentiment analysis has the potential to become a major development area useful in supporting psychological diagnosis.