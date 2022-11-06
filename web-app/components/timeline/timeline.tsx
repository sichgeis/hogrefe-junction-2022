import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Flex } from '@chakra-ui/react';
import Link from "next/link";
import Thought from "../thought/thought";

const ago = require('s-ago');

export default function Timeline(props) {
    return (
        <Flex flexDir="column" width="100%" paddingTop='30%'>
            <Link href="/">
                <Button
                    marginLeft='5em'
                    marginRight='5em'
                    marginBottom='1em'
                    colorScheme='orange'
                >Back</Button>
            </Link>
            <Accordion backgroundColor='white'>
                {props.steps.map((s, i) => (
                    <AccordionItem key={i}>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    {s.timestamp ? ago(s.timestamp) : 'in the past'}
                                </Box>
                                <Thought score={s.score} />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {s.entry}
                        </AccordionPanel>
                    </AccordionItem >
                ))}
            </Accordion >
        </Flex>
    );
}