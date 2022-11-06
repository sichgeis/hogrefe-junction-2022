import { Center, CenterProps } from "@chakra-ui/react";

interface MoodScoreProps extends CenterProps {
  score: number
}

function interpolateColor(score: number, lowScoreGreen: string, highScoreGreen: string) {
  const lowScoreComponent: number = parseInt(lowScoreGreen, 16);
  const highScoreComponent: number = parseInt(highScoreGreen, 16);
  const differenceBetweenLowAndHigh: number = highScoreComponent - lowScoreComponent;
  const halfDifference: number = differenceBetweenLowAndHigh / 2;
  const pivotValue: number = lowScoreComponent + halfDifference;
  const addition: number = score * halfDifference;
  const component: number = Math.round(pivotValue + addition);
  return component.toString(16);
}

function inverseInterpolateColor(score: number, lowScoreRed: string, highScoreRed: string) {
  const lowScoreComponent: number = parseInt(lowScoreRed, 16);
  const highScoreComponent: number = parseInt(highScoreRed, 16);
  const differenceBetweenLowAndHigh: number = lowScoreComponent - highScoreComponent;
  const halfDifference: number = differenceBetweenLowAndHigh / 2;
  const pivotValue: number = highScoreComponent + halfDifference;
  const addition: number = (score * -1) * halfDifference;
  const component: number = Math.round(pivotValue + addition);
  return component.toString(16);
}

export default function MoodScore(props: MoodScoreProps) {
  // Low score color: #e91643
  // Higher score color: #16e9bc
  const redComponent = inverseInterpolateColor(props.score, 'e9', '16');
  const greenComponent = interpolateColor(props.score, '16', 'e9');
  const blueComponent = interpolateColor(props.score, '43', 'bc');
  const color = `#${redComponent}${greenComponent}${blueComponent}`;
  return (
    <Center backgroundColor={color} borderRadius='md' width='100%' {...props}>
      <p>{Math.round(props.score * 100)}</p>
    </Center>
  );
}