import { JournalContext } from "../components/journalprovider/journalprovider";
import Timeline from "../components/timeline/timeline";

export default function TimelinePage() {
  return (
    <JournalContext.Consumer>
      {({ moodScores }) => (<Timeline steps={moodScores} />)}
    </JournalContext.Consumer>
  );
}