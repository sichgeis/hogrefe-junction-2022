# Junctions 2022 🚀

## Retired prototype: private local configuration

This hackathon project is no longer deployed. Its application structure,
dependency versions, public challenge narrative and branding are retained.

- Recreate Python environments from the retained requirements files using
  `python3 -m venv .venv`; generated environment files do not belong in Git.
- Copy `web-app/.env.example` to ignored `web-app/.env.local`. The sentiment
  request uses `NEXT_PUBLIC_SENTIMENT_URL`, defaulting to the local Serverless
  Offline endpoint `http://localhost:3000/dev/dairy/entry`. Run the web app on
  another local port, for example `npm run dev -- -p 3001`, when both run on
  the same machine. Configure your own service URL before any reuse elsewhere.
- The historical speech examples retain empty `DG_KEY` placeholders. Speech
  transcription needs new credential integration before it can work again;
  this cleanup does not implement that integration. Use server-issued temporary
  tokens following [Deepgram's authentication guidance](https://developers.deepgram.com/guides/fundamentals/token-based-authentication),
  rather than another permanent key in browser source or a `NEXT_PUBLIC_` key.
  Typed journal input, sentiment requests and local journal storage are retained.
- Serverless deployment uses your own AWS/account configuration. The original
  owner's dashboard organization and cloud endpoints have been removed.

The exposed Deepgram credential must be revoked by its provider-account owner
if it has not already been revoked. Retiring this repository does not revoke it.
No credential was tested, used or revoked by this cleanup.

All reachable history was rewritten in October 2026 to remove the provider key,
personal work email, local environment paths, deployment endpoints and planning
board link. Use a fresh clone; an old clone can restore the removed history.
Cached old commits on GitHub may require separate server-side removal.

Project planning notes are kept outside this public archive.

For the hackathon Junction 2022 we are tackeling the challenge "Keep calm and don't panic". The idea is to build a digital personal diary that does automated sentiment analysis.

## Challenge

* Prevent and aid mental health and wellbeing struggles of young adults.
* Many of us know someone who is struggling with their mental health or wellbeing, or even struggling to understand themselves, and it is time to get rid of the stigma that comes with those challenges – they are hard enough as it is.
* We want you to create an innovative solution to help young adults with their mental health and wellbeing.
* It should be something original, that you can't find a dozen solutions to with a simple Google search.
* Your project should take the specific needs of the users into consideration, be convenient to use, and provide insights that could help prevent mental health problems or aid with ongoing struggles.
* It can be purely for individual use, include collaboration tools with peers, or it can involve healthcare professionals in some way.
* Because we would be dealing with personal information we want the security and privacy to be top notch!
* And using juicy technologies such as Rust, serverless, AI or AR is optional, but appreciated!

## Idea

**Personal diary with sentiment analysis and optional speech to text.**

* Personal dairy
* Web app that can record speech
* Web app translates spoken words to text
* Sentiment analysis of text (positive, negative, …)
* App visualizes the mood in a calendar or timeline

Optionally:

* Professional can have a dashboard of these mood graphs to see the big picture.
* Potential name: “Mood barometer”

### MVP

1. Webapp with text-input-area.
2. You input some sentences.
3. There is a button to click.
4. On button click the text is sent to the backend for sentiment analysis.
5. The sentiment analysis score is then displayed.
6. There is a back button to repeat the analysis and reset the web app.

### Roles

* Sales and Pitching
  * Pitch idea and product
* Market Research and User Studies
  * Getting facts from the world that validate our product / hypothesis
* Design, user interface and UX
* Frontend development
* Service development (sentiment analysis / speech to text)

### Implementation Streams

Possible to split into chunks for implementation

* Concept and Storytelling (Powerpoint)
* Click prototype
* Frontend
* Sentiment Analysis
* Speech to Text
* ...
