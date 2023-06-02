import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Center,
    ChakraProvider,
    Divider,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack
} from "@chakra-ui/react";
import {githubLight} from '@uiw/codemirror-theme-github';
import {python} from "@codemirror/lang-python";
import CodeMirror from '@uiw/react-codemirror';

import {LanguageSupport} from '@codemirror/language';
import {markdown} from "@codemirror/lang-markdown";
import {javascript} from "@codemirror/lang-javascript";
import {cpp} from "@codemirror/lang-cpp";
import {html} from "@codemirror/lang-html";
import {json} from "@codemirror/lang-json";
import {java} from "@codemirror/lang-java";
import {debounce} from "ts-debounce";

const EXTENSIONS: { [key: string]: LanguageSupport } = {
    markdown: markdown(),
    python: python(),
    javascript: javascript(),
    typescript: javascript(),
    cpp: cpp(),
    'c++': cpp(),
    html: html(),
    json: json(),
    java: java(),
};

function App() {
    const [language, setLanguage] = useState("python");
    const [text, setText] = useState("print(\"Hello world!\")");

    const updateBackend = (newText: string) => {
        console.log(`Updated backend with: ${newText}`);
    };
    const updateTextDebounced = useRef(debounce((newText: string) => updateBackend(newText), 1000 * 2));
    useEffect(() => {
        updateTextDebounced.current(text);
    }, [text]);

    return (
        <ChakraProvider>
            <Center h={"100vh"}>
                <VStack boxShadow={'md'} p={4} borderStyle={"solid"} borderWidth={1} rounded={"lg"}>
                    <HStack w={"100%"} justify={"space-between"}>
                        <Heading>Code Editor</Heading>
                        <Menu>
                            <MenuButton as={Button}>
                                {language}
                            </MenuButton>
                            <MenuList>
                                {Object.entries(EXTENSIONS).map(([language, _]) => (
                                    <MenuItem key={language} onClick={() => setLanguage(language)}>{language}</MenuItem>
                                ))}

                            </MenuList>
                        </Menu>
                    </HStack>

                    <Divider/>
                    <CodeMirror
                        value={text}
                        onChange={(newValue) => setText(newValue)}
                        theme={githubLight}
                        extensions={[EXTENSIONS[language]]}
                        basicSetup={{autocompletion: true}}
                        minWidth={'500px'}
                        minHeight={'500px'}
                    />
                </VStack>
            </Center>
        </ChakraProvider>

    );
}

export default App;
