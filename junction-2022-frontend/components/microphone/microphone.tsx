import { Button, Icon } from "@chakra-ui/react";
import { BiHourglass, BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

enum ButtonState {
  START,
  STOP,
  BUSY
}

function Foo({ state }) {
  switch (state) {
    case ButtonState.START:
      return <Icon as={BiMicrophone} fontSize='1.5em' />
    case ButtonState.STOP:
      return <Icon as={BiMicrophoneOff} fontSize='1.5em' />
    case ButtonState.BUSY:
      return <Icon as={BiHourglass} fontSize='1.5em' />
  }
}

export default function Microphone(props) {
  return (
    <Button
      width='50%'

      {...props}
      isLoading={props.buttonState === ButtonState.BUSY}
      size='md'
      onClick={props.onClick}
      height='3em'
    >
      <Foo state={props.buttonState}></Foo>
    </Button>
  )
}
