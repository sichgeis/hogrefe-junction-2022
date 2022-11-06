import { Button, Center, Flex, Icon } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiBookHeart, BiReset } from "react-icons/bi";
import DictatedText from "../components/dictatedtext/dictatedtext";
import { JournalContext } from "../components/journalprovider/journalprovider";
import Microphone from "../components/microphone/microphone";
import MoodScore from "../components/moodscore/moodscore";

enum TranscriberState {
  STOPPED,
  BUSY,
  RUNNING
}

enum SentimenterState {
  INITIAL,
  ANALYZING,
  ENTERING
}

enum ButtonState {
  START,
  STOP,
  BUSY
}

const DG_URL = "wss://api.deepgram.com/v1/listen?punctuate=true";
const DG_KEY = "f5219c2675a53c8f8b996720ff405a8025632f63";

function SentimentorButton(props) {
  return <Button
    {...props}
    disabled={props.state === SentimenterState.INITIAL}
    isLoading={props.state === SentimenterState.ANALYZING}
  >Sentimentor!</Button>
}

export default function HomePage() {

  const [dictatedText, setDictatedText] = useState('')
  const [transcript, setTranscript] = useState('')

  const [moodScore, setMoodScore] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [sentimenterState, setSentimenterState] = useState(SentimenterState.INITIAL)
  const [transcriberState, setTranscriberState] = useState(TranscriberState.STOPPED)

  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [socket, setSocket] = useState(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    bindMicrophone()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.onopen = startStreaming;
      socket.onmessage = handleResponse;
    }
  }, [socket])

  useEffect(() => {
    if (transcript.length > 0) {
      setDictatedText(`${dictatedText} ${transcript}`)
    }
  }, [transcript])

  const bindMicrophone = async () => {

    const audio: MediaStream = await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .catch((error) => alert(error)) as MediaStream; // Olli: Help Tuomas, why do we need to cast

    const mediaRecorder = new MediaRecorder(audio, {
      mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : 'video/mp4'
    });

    setMediaRecorder(mediaRecorder)
  }

  async function runSentimentAnalysis(insertMoodScore: (score: number, title: string, entry: string, timestamp: Date) => void) {
    setSentimenterState(SentimenterState.ANALYZING)
    const response = await axios.post<number>('https://y6ma0p9s09.execute-api.eu-central-1.amazonaws.com/dev/dairy/entry', { text: dictatedText })
    setMoodScore(response.data)
    insertMoodScore(response.data, 'title', dictatedText, new Date())
    setSentimenterState(SentimenterState.INITIAL)
  }

  function sendEvent(event) {
    if (event.data.size > 0 && socket.readyState == 1) {
      socket.send(event.data)
    }
  }

  function startStreaming() {
    mediaRecorder.addEventListener("dataavailable", sendEvent);
    mediaRecorder.start(250)

    setTranscriberState(TranscriberState.RUNNING)
  }

  function handleResponse(message) {
    const received = JSON.parse(message.data)
    if (received.channel) {
      const transcript = received.channel.alternatives[0].transcript;
      if (transcript) {
        setTranscript(transcript)
      }
    }
  }

  async function beginDictation() {
    setTranscriberState(TranscriberState.BUSY)
    setIsRecording(true)
    const newSocket = new WebSocket(DG_URL, ["token", DG_KEY]);
    setSocket(newSocket)
  }

  function stopDictation() {
    setIsRecording(false)
    socket.send(JSON.stringify({ type: "CloseStream" }))
    mediaRecorder.stop()
    mediaRecorder.removeEventListener("dataavailable", sendEvent)
    setSocket(null)
    setTranscriberState(TranscriberState.STOPPED)
    setSentimenterState(SentimenterState.ENTERING)
  }

  function textChanged(e) {
    setDictatedText(e.target.value)
    setSentimenterState(e.target.value === '' ? SentimenterState.INITIAL : SentimenterState.ENTERING)
  }

  function resetText() {
    setDictatedText('')
  }

  function MicrophoneContainer({ state }) {
    switch (state) {
      case TranscriberState.STOPPED:
        return <Microphone
          marginTop='5px'
          buttonState={ButtonState.START}
          onClick={beginDictation}
          colorScheme='orange'
        />
      case TranscriberState.RUNNING:
        return <Microphone
          marginTop='5px'
          buttonState={ButtonState.STOP}
          onClick={stopDictation}
          colorScheme='orange'
        />
      case TranscriberState.BUSY:
        return <Microphone
          marginTop='5px'
          buttonState={ButtonState.BUSY}
          onClick={() => { }}
          colorScheme='orange'
        />
      default:
        return <Microphone
          marginTop='5px'
          buttonState={ButtonState.BUSY}
          onClick={() => { }}
          colorScheme='orange'
        />
    }
  }

  return (
    <JournalContext.Consumer>
      {({ moodScores, insertMoodScore }) => (
        <Center height='60vh'>
          <Flex style={{ marginTop: '25vh' }} direction='column' width='80%' height='100%' justifyContent='space-between'>
            <MoodScore
              score={moodScore}
              height='4em'
              width='5em'
              borderRadius='5px' />
            <DictatedText
              marginTop='5px'
              value={dictatedText} onChange={textChanged} height='60%' />

            <Flex direction='row' gap='5px'>

              <MicrophoneContainer state={transcriberState}></MicrophoneContainer>
              <SentimentorButton
                width='50%'
                marginTop='5px'
                state={sentimenterState}
                colorScheme={sentimenterState === SentimenterState.INITIAL ? 'gray' : 'orange'}
                size='md'
                onClick={() => runSentimentAnalysis(insertMoodScore)}
                height='3em'
              >
                {isRecording.toString()} Sentimentor!
              </SentimentorButton>

            </Flex>
            <Flex direction='row' gap='5px'>

              <Button
                marginTop='5px'
                width='50%'
                colorScheme='gray'
                onClick={() => resetText()}
                height='3em'
              >
                <Icon as={BiReset} fontSize='1.5em' />
              </Button>
              <Link
                href="/timeline">
                <Button
                  width='50%'
                  marginTop='5px'
                  colorScheme={sentimenterState === SentimenterState.INITIAL ? 'gray' : 'gray'}
                  height='3em'
                >
                  <Icon as={BiBookHeart} fontSize='1.5em' padding='0.1em' />
                </Button>
              </Link>
            </Flex>

          </Flex>
        </Center>
      )
      }
    </JournalContext.Consumer >
  );
}
